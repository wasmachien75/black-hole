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

function addNumber(digits, base){ //just add a random number consisting of n digits. Base is the starting string. Returns modified string.
	var numbers = "1234567890";
	for(x=0; x<digits; x++) {
		var y = Math.floor(Math.random()*10)
		base += numbers.charAt(y);
	}
	return base;
}

function createPassword(maxlength, random_dgt){
  var minlength = 13;
  if (maxlength < minlength){
    maxlength = minlength; //short passwords are for losers
  }

  var p = "" //the actual password
  while(p.length < minlength || p.length > maxlength){
    var random_noun = getRandom(nouns["nouns"]);
    var random_adj = getRandom(adjs["adjs"]);
    var random_adverb = getRandom(adverbs["adverbs"]);
    var random_perfect = getRandom(verbs["verbs"])["past"];

    if (maxlength < 16) {
      var p = random_perfect+random_noun; //if the password is relatively short, we drop the adverb.
    }
    else {
      var p = random_adverb+random_perfect+random_noun;
    }
  }

  p = p.replace("-", ""); //drop useless dashes
  if (random_dgt === "on") {
    p = addNumber(2, p);
  }
  console.log("Generated a",p.length+"-character password:",p);
  return p;
}

function generateHTML(password) {
  return "password or username generation for the digitally oppressed\
          <div id='password'>\
            <p id='password-p'>" + password + "</span>\
    	      <form action='password' method='get'>\
    		      <label for='length'>Max size:</label>\
    		      <input type='number' name='maxlength'><p>\
    		      <label for='random_dgt'>Add random digits?</label>\
    		      <input type='checkbox' name='random_dgt' value='on'><p>\
    		      <input type='submit'/>\
    	      </form>\
          </div>";
}

exports.getPassword = function(req){
  if(req.query.maxlength != null) {
    console.log("maxlength is set");
    var maxlength = req.query.maxlength || 25; //if no maxlength is specified, it will default to 25.
    var random_dgt = req.query.random_dgt;
    password = createPassword(maxlength, random_dgt);
  }
  else {
    console.log("maxlength is not set");
    password = "";
  }
  return generateHTML(password);


}
