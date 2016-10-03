//let's generate a hard to crack, easy to remember password.
//words ripped from https://github.com/dariusk/corpora

var nouns = require('./words/corpora/data/words/nouns.json');
var adjs = require('./words/corpora/data/words/adjs.json');
var adverbs = require('./words/corpora/data/words/adverbs.json');
var verbs = require('./words/corpora/data/words/transitive_verbs.json');

function getRandom(array){ //function to get a random value from an array.
	var random_index = Math.floor(Math.random()*array.length); // make sure the index is not bigger than the array.
	return array[random_index];
}

function addNumber(digits, base){ //just add a random number consisting of n digits.
	var numbers = "1234567890";
	for(x=0; x<digits; x++) {
		var y = Math.floor(Math.random()*10)
		base += numbers.charAt(y);
	}
	return base;
}

exports.getPassword = function(maxlength){
	maxlength = maxlength || 25 //if no maxlength is specified, it will default to 25.
	
	var minlength = 13;
	if (maxlength < minlength){
		maxlength = minlength; //short passwords are for losers
	}
	
	var p = "" //the actual password
	while(p.length < minlength || p.length > maxlength){
		var random_noun = getRandom(nouns["nouns"]);
		// var random_adj = getRandom(adjs["adjs"]);
		var random_adverb = getRandom(adverbs["adverbs"]);
		var random_perfect = getRandom(verbs["verbs"])["past"];
		
		if (maxlength < 16) {
			var p = random_perfect+random_noun; //if the password is relatively short, we drop the adverb.
		}
		else {
			var p = random_adverb+random_perfect+random_noun;
		}
	}
	var p = p.replace("-", ""); //drop useless dashes
	
	console.log("Generated a",p.length+"-character password:",p);
	return p;
	
}

