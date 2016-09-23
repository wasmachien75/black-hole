var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var util = require('util');
var photo = require('./photo');


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

app.get('/:page', function(req, res){
	var page = req.params.page;
	if(page == "favicon.ico"){
		console.log("favicon requested")
	}
	console.log("Page '"+page+ "' requested.");
	if (page == 'photos'){
		var fiveHundred = require('./500px.json');
		console.log(fiveHundred);
		var key = fiveHundred.consumerkey;
		var username = fiveHundred.username;
		var url = 'https://api.500px.com/v1/photos?feature=user&username='+username+'&sort=created_at&rpp=9&image_size=2&consumer_key='+key
		console.log(url)
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
