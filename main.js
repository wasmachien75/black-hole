var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var util = require('util');
var photo = require('./photo');
var config = require('./data/config.json');
var express = require('express');
var server = require('./server');
var home = require('./home.js');
var password = require('./password.js')

var app = server.app;
app.listen(8080);

app.post('/send', function(req, res){
	var username = encodeURIComponent(config["gmail"].username);
	var password = config["gmail"].password;
	var email = config["gmail"].email

	var transporter = nodemailer.createTransport('smtps://' + username + ":" + password + '@smtp.gmail.com');

	var mailOptions = {
		from: '"Website Contact" <contact@contact.com',
		to: email,
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

app.post('/location', function(req, res){
	fs.writeFile('public/data/location.json', JSON.stringify(req.body), function(err){
		if(err) throw err;
		console.log(req.body),
		console.log("Saved location to file.");
	})
})

app.get('/password', function(req, res){
	var html = password.getPassword(req);
	// try{
	// 	var maxlength = req.query.maxlength;
  //   var random_dgt = req.query.random_dgt;
  //   console.log(random_dgt);
	// }
	// catch(err) {
	// 	var maxlength = 0;
	// 	console.log(err);
	// }
	// var password = require('./password');
	// var html = "<div id='password'>" + password.getPassword(maxlength, random_dgt) + "</div><p><a href='password_gen'>Retry</a>"
	res.render('index.pug', {content: html});
	res.end();
})

app.get('/home', function(req, res){
	var content_html = home.output();
	res.render('index.pug', {content: content_html});
	res.end();
})

app.get('/:page', function(req, res){
	var page = req.params.page;
	console.log("Page '"+page+ "' requested.");
	if (page == 'photos'){
		var fiveHundred = config["500px"];
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
	else if(page == 'favicon.ico'){
	}
	else{
		console.log("Looking for 'public/"+page+".html'");
		fs.readFile('public/'+page+'.html', function(err, data){
			if(err) throw err;
			res.render('index.pug', {content: data});
			res.end();
		});
		console.log("Served '" + page + ".html'.");
	}
});
