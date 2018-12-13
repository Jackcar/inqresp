sap.ui.localResources("app");
var app = new sap.m.App({
	initialPage : "mainPage"
});

var page = sap.ui.view({
	id : "mainPage",
	viewName : "app.components.main.main",
	type : sap.ui.core.mvc.ViewType.XML
});
app.addPage(page);

$(window).on('load', function() {
	var dialogBox = sap.ui.xmlfragment('app.shared.busydialog.loadingDialog');
	dialogBox.open();
	var catP = new Promise( function (resolve, reject) {
		dataManager.getCategoryList(resolve, reject);
	});
	
	var statusP = new Promise( function (resolve, reject) {
		dataManager.getStatusList(resolve, reject);
	});
	
	var priP = new Promise( function (resolve, reject) {
		dataManager.getPriorityList(resolve, reject);
	});
	
	Promise.all([catP, statusP, priP]).then( function() {
		dialogBox.close();
		app.placeAt("content");
	});
});