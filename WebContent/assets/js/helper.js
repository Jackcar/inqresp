/**
 * @namespace app
 */

/**
 * @namespace app.assets
 * @memberof app
 */

/**
 * @namespace app.assets.helper
 * @memberof app.assets
 */
jQuery.sap.declare("helper");

helper = {
	DAYLIMIT : 365,
	
	/**
	 * Get date from string.
	 * Format example: "02/18/2016 03:15:00"
	 * 
	 * @function stringToDate
	 * @param {String} dateString - must be in format example "02/18/2016 03:15:00"
	 * @memberof app.assets.helper
	 */
	stringToDate : function(dateString) {
		var dateSec = dateString.split(" ")[0];
		var timeSec = dateString.split(" ")[1];
		
		var hour = timeSec.split(":")[0],
	    minute = timeSec.split(":")[1],
	    second = timeSec.split(":")[2],
	    day = dateSec.split("/")[1],
	    month =  dateSec.split("/")[0],
	    year =  dateSec.split("/")[2];
		return new Date ( year, month, day, hour, minute, second );
	},

	/**
	 * Returns formatted date in form of "yyyy-M-d" (ie. "2016-2-18")
	 * 
	 * @function getFormattedDate
	 * @memberof app.assets.helper
	 */
	getFormattedDate : function(date) {
		var mm = "" + (date.getMonth() + 1);
		if(mm.length < 2) {
			mm = "0" + mm;
		}
		var year = date.getFullYear().toString();
		return year + "-" + mm + "-" + date.getDate();
	},
	
	/**
	 * Return date given a string formatted "yyyy-M-d" (ie. "2016-2-18")
	 * 
	 * @function getFormattedDate
	 * @memberof app.assets.helper
	 */
	formattedStringToDate : function(dateString) {
		var given = dateString.split("-");
		return new Date(given[0],given[1]-1,given[2]);
	},
	
	/**
	 * Returns the range in days of formatted String date
	 * 
	 * @function getFormattedDate
	 * @memberof app.assets.helper
	 */
	getRangeOfFormattedStringDate : function(dateStringA, dateStringB) {
		var dateA_ms = this.formattedStringToDate(dateStringA).getTime();
		var dateB_ms = this.formattedStringToDate(dateStringB).getTime();
		
		var ONE_DAY = 1000 * 60 * 60 * 24;
	    var difference_ms = dateB_ms - dateA_ms;
	    
		return Math.round(difference_ms/ONE_DAY);
	},
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive) USED
	 * FOR TESTING. REMOVE WHEN DONE
	 * @function getRandomInt
	 * @memberof app.assets.helper
	 */
	getRandomInt : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	/**
	 * Get last three digits from given number
	 * 
	 * @function getLast3Digits
	 * @memberof app.assets.helper
	 */
	getLast3Digits : function(money) {
		var results = "";
		if( money ) {
			if( money >= 1000 ) {
				var deviderIndex = money.length - 3;
				results = this.getLast3Digits( money.substring(0, deviderIndex) ) + "," + money.substring(deviderIndex, money.length);
			} else {
				results = money;
			}
		}
		return results;
	},
	
	/**
	 * Format dollar amount to ###,###
	 * 
	 * @function getFormattedMoneyAmmount
	 * @memberof app.assets.helper
	 */
	getFormattedNumber : function(money) {
		var dollars = money;
		var cents = "";
		if(money) {
			if( money.includes(".") ) {
				dollars = money.split(".")[0];
				cents = "." + money.split(".")[1];
				if( cents && cents.length == 2 ) {
					cents += "0";
				}
			} else {
				dollars = money;
			}
			
			dollars = this.getLast3Digits(dollars) + cents;
		}
		return dollars;
	}
};
