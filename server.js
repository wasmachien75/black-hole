var express = require('express');
var bodyParser = require('body-parser');

var app = express();

console.log("***SERVER STARTED***")
console.log("")
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

exports.app = app;
