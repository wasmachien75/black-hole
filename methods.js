function timeToWords(milliseconds){ //put in time difference in milliseconds...get out string such as "25 minutes ago" or "2 days ago"
	var hours = Math.round(milliseconds / 1000 / 3600);
	var minutes = Math.round(milliseconds / 1000 / 3600 / 60);
	
	if (hours < 24) {
		if (hours < 1) { // if less than one hour -> get minutes
			if (minutes > 1) {
				return minutes.toString() + " minutes ago.";
			}
			else {
			return minutes.toString() + " minute ago.";
			}
		}
		else {	//if between 1 and 24 hours -> get hours
			if (hours > 1) {
				return hours.toString() + " hours ago."; // hours ago
			}
			else {
				return hours.toString() + " hours ago."; // hours ago
			}
		}	
	}
	
	else {
		var days = Math.round(hours / 24);		// if more than 24 hours
		if (days > 1) {
			return days.toString() + " days ago."
		}
		else {
			return days.toString() + " day ago."
		}
	}
}

function timeSinceMyBirth(){ //get days since my birth (March 8th 1990) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date 
	var current_date = new Date();
	var birth_date = new Date(1990,03,08);
	return var days_since_birth = Math.round(parseInt(current_date - birth_date)/86400000);
}