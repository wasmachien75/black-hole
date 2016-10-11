var sentences = require('././data/home-words.json').sentences;


var x = function(){

	var index = Math.floor(Math.random() * sentences.length);
	console.log(typeof sentences);
	console.log(index)
	var p = "";
	for(var a = 6; a < 20; a++){
		 var brightness = (0.05*a).toString();
		 var a = a.toString();
		 p = p + "<span style='display: block; color: rgba(255,255,255,"+brightness+"); text-align: center; font-size: " + a + "px;'>" + sentences[index] + "</span>" ;
		 }
	for(var b = 20; b > 6; b--){
		var brightness = 0.05*b;
		 p = p + "<span style='display: block; color: rgba(255,255,255,"+brightness+"); text-align: center; font-size: " + b + "px;'>" + sentences[index] + "</span>" ;
		 }
	p += "<div id='foot'><a href='https://www.youtube.com/watch?v=CURPyCzoKfY' />Open the Light</a></div>"
	return p;
}

exports.output = x;
