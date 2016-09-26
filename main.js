var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var util = require('util');
var photo = require('./photo');
var words = require('./data/home-words.json');

var app = express();
console.log("***SERVER STARTED***")
console.log("")
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');

app.post('/send', function(req, res){
	var transporter = nodemailer.createTransport('smtps://willemvanlishout%40gmail.com:ohnpenjotyufpxsv@smtp.gmail.com');
	
	var mailOptions = {
		from: '"Website Contact" <contact@contact.com',
		to: 'willemvanlishout@gmail.com',
		subject: 'Message received',
		text: 'HI'
	};
	console.log(req.body.email);
	console.log(req.body.text);
	res.end("OK");
	// transporter.sendMail(mailOptions, function(error, info){
		// if(error){
			// return console.log(error);
		// }
		// console.log('Message sent: ' + info.response);
	// })
	// res.send("Mail sent!");
	// res.end();
})

app.get('/', function(req, res){
	res.redirect('/home');
})

app.get('/home', function(req, res){
	var s = words.sentences;
	var index = Math.ceil(Math.random() * s.length);
	var c = "";
	for(var a = 6; a < 20; a++){
		 var size = a.toString();
		 c = c + "<span style='display: block; text-align: center; font-size: " + a + "px;'>" + s[index] + "</span>" ;
		 }
	for(var b = 20; b > 6; b--){
		 c = c + "<span style='display: block; text-align: center; font-size: " + b + "px;'>" + s[index] + "</span>" ;
		 }
	c = c + "<div id='foot'><a href='https://www.youtube.com/watch?v=CURPyCzoKfY' />Open the Light</a></div>"

	res.render('index.pug', {content: c});
	res.end();
})

app.get('/:page', function(req, res){
	var page = req.params.page;
	if(page == "favicon.ico"){
		console.log("favicon requested")
	}
	console.log("Page '"+page+ "' requested.");
	if (page == 'photos'){
		var fiveHundred = require('./data/500px.json');
		var key = fiveHundred.consumerkey;
		var username = fiveHundred.username;
		var url = 'https://api.500px.com/v1/photos?feature=user&username='+username+'&sort=created_at&rpp=9&image_size=2&consumer_key='+key
		request(url, function(error, response, body){
		if (!error && response.statusCode == 200) {
			content = photo.getPics(body);
			res.render('index.pug', {content: content});
			res.end();
		}
		else{
			throw error;
		}
	});
	}
	else{
		console.log("Looking for 'public/"+page+".html'");
		fs.readFile('public/'+page+'.html', function(err, data){
			if(err) throw err;
			res.render('index.pug', {content: data});
			res.end();
		});
	}
	console.log("Served '" + page + ".html'.");
});

app.listen(80);
