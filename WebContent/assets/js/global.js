/**
 * @namespace app
 */

/**
 * @namespace app.assets
 * @memberof app
 */

/**
 * @namespace app.assets.global
 * @memberof app.assets
 */
jQuery.sap.declare("global");

global = {
	RELEASEDATE : "January 18, 2017",
	VERSION : "0.1.1",
	BUILD : "1",
	EMAIL : "enterprisemobility@saskpower.com",
	APPNAME : "Boiler Tube Failure",

	onAppInfo : function() {
		var msg = "Have questions? Email us at " + this.EMAIL + " \n \n Version: "
				+ this.VERSION + " \n \n Build: " + this.BUILD
				+ " \n \n Distribution Date: " + this.RELEASEDATE;
		sap.m.MessageBox.show(msg, sap.m.MessageBox.Icon.INFORMATION,
				this.APPNAME, [ sap.m.MessageBox.Action.OK ], function() {});
	}
};

if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}