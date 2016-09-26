var nouns = require('./words/corpora/data/words/nouns.json');
var adjs = require('./words/corpora/data/words/adjs.json');

exports.getPassword = function(){
	var random = Math.floor(Math.random()*20);
	var s = nouns["nouns"][random];
	return s;
}

