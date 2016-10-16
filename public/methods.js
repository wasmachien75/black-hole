function timeToWords(milliseconds){ //put in time difference in milliseconds...get out string such as "25 minutes ago" or "2 days ago"
	var hours = Math.round(milliseconds / 1000 / 3600);
	var minutes = Math.round(milliseconds / 1000 / 3600 / 60);

	if (hours < 24) {
		if (hours < 1) { // if less than one hour -> get minutes
			if (minutes > 1) {
				return minutes.toString() + " minutes ago";
			}
			else {
			return "1 minute ago";
			}
		}
		else {	//if between 1 and 24 hours -> get hours
			if (hours > 1) {
				return hours.toString() + " hours ago"; // hours ago
			}
			else {
				return "1 hour ago";
			}
		}
	}

	else {
		var days = Math.round(hours / 24);		// if more than 24 hours -> get days
		if (days > 1) {
			return days.toString() + " days ago"
		}
		else {
			return "1 day ago"
		}
	}
}

function timeSinceMyBirth(){ //get days since my birth (March 8th 1990) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	var current_date = new Date();
	var birth_date = new Date(1990,02,08); //Month is zero-based for some reason!
	var days_since_birth = Math.round(parseInt(current_date - birth_date)/86400000)
	return days_since_birth;
}

var alt_style = false;

function switchCss(){
	var link_el = document.querySelector("link[rel='stylesheet']");
	if (alt_style === false) {
		link_el.href = "alt_style.css";
		alt_style = true;
	}
	else {
		link_el.href = "style.css";
		alt_style = false;
	}
}
