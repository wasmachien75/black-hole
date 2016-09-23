var getPics = function(body){
			var x = JSON.parse(body);
			var content = "";
			for(var y = 0; y < x.photos.length; y++){
				content = content + '<a target ="_blank" href="https://500px.com' + x.photos[y].url + '"><img src="'+x.photos[y].image_url+'" /></a>';
				if(((y+1)%3) == 0){
					content = content + '<br>';
				}
			}
			return content;
		}
		
module.exports.getPics = getPics;