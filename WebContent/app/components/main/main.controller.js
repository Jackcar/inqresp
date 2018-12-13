sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/mvc/Controller',
		'sap/ui/core/Fragment', 'sap/ui/model/json/JSONModel',
		'sap/m/MessageBox', ], function(jQuery, Controller, Fragment,
		JSONModel, MessageBox) {
	"use strict";
	return Controller.extend("app.components.main.main", {
		prevItemSelected : null,
		searchDialog : null,
		searchUserDialog : null,
		noteDialog: null,
		busyDialog : sap.ui.xmlfragment('app.shared.busydialog.busydialog'),
		savingDialog : sap.ui.xmlfragment('app.shared.busydialog.savingdialog'),
		sortDialog : null,
		FORMFIELDS : null,
		prevTab: null,
		
		EMPTYUSERSEARCH: JSON.stringify({first:"", last:""}),
		
		/**
		 * SAPUI5 Lifetime event
		 * Registers onBeforeShow and onAfterShow lifetime events
		 * GENERATED CODE
		 * @function onInit
		 * @memberof app.components.DamagedFacilities.DamagedFacilities
		 */
		onInit: function (evt) {
			var _this = this;		
			this.getView().addEventDelegate({
				/**
				 * SAPUI5 Lifetime event
				 * Actions that happen after the view is displayed
				 * @param {Object} evt - Event called after app page is shown
				 * @function onAfterShow
				 * @memberof app.components.main.main
				 */
				onAfterShow: function (evt) {
					_this.setFormModel();
				},
			});
		},
		
		/**
		 * Set form model if not already set
		 * @function getFormModel
		 * @memberof app.components.main.main
		 */
		setFormModel: function () {
			if( !this.getView().getModel() ) {
				var _this = this;
				new Promise( function (resolve, reject) {
					_this.getFormFields(resolve);
				}).then( function( fields ) {
					var model = _this.getFormModel();
					model.fields = fields;
					model.noteDialog = _this.getNoteModel();
					_this.getView().setModel( new sap.ui.model.json.JSONModel( model ) );
					_this.resetForm();
					_this.onSearch();
				});
			}
		},
		
		/**
		 * Get note model
		 * @function getNoteModel
		 * @memberof app.components.main.main
		 */
		getNoteModel: function () {
			var result = {
				title:"New Note",
				titleLabel: "Title",
				textLabel: "Note",
				typeLabel: "Type",
				type: dataManager.getNoteType(),
				note: { NoteTitle:"",  NoteText: "", NoteType : "C" }
			};
			return result;
		},
		
		/**
		 * Get form fields
		 * @function getFormModel
		 * @memberof app.components.main.main
		 */
		getFormFields: function (onSuccess) {
			var _this = this;
			if(!this.FORMFIELDS) {
				this.FORMFIELDS = {};
				
				var catP = new Promise( function (pass, failed) {
					new Promise( function (resolve, reject) {
						dataManager.getCategoryList(resolve, reject);
					}).then( function(catList) {
						_this.FORMFIELDS.Category = catList;
						_this.FORMFIELDS.SubCategory = catList[0].subCat;
						pass();
					}, function(error) { console.log(error); alert(error), failed(error) });
				});
				
				var statusP = new Promise( function (pass, failed) {
					new Promise( function (resolve, reject) {
						dataManager.getStatusList(resolve, reject);
					}).then( function(statList) {
						_this.FORMFIELDS.Status = statList;
						pass();
					}, function(error) { console.log(error); alert(error), failed(error) });
				});
				
				var priP = new Promise( function (pass, failed) {
					new Promise( function (resolve, reject) {
						dataManager.getPriorityList(resolve, reject);
					}).then( function(priList) {
						_this.FORMFIELDS.Priority = priList;
						pass();
					}, function(error) { console.log(error); alert(error), failed(error) });
				});
				
				var reasonP = new Promise( function (pass, failed) {
					new Promise( function (resolve, reject) {
						dataManager.getReasonList(resolve, reject);
					}).then( function(reasonList) {
						_this.FORMFIELDS.Reason = reasonList;
						pass();
					}, function(error) { console.log(error); alert(error), failed(error) });
				});
				
				Promise.all([catP, statusP, priP, reasonP]).then( function() {
					onSuccess(_this.FORMFIELDS);
				});
			} else {
				onSuccess(this.FORMFIELDS);
			}
		},
		
		/**
		 * Get form Data as JSON
		 * @function getFormData
		 * @memberof app.components.CapacityIncrease.CapacityIncrease
		 */
		getFormData: function () {
			return this.getView().getModel().oData;
		},
		
		/**
		 * Set form Data as JSON
		 * @param {JSON} someModel - A JSON representation of the form model
		 * @function setFormData
		 * @memberof app.components.main.main
		 */
		setFormData: function (someModel) {
			var _this = this;
			new Promise( function (resolve, reject) {
				_this.getFormFields(resolve);
			}).then( function( fields ) {
				someModel.fields = fields;	
				_this.getView().getModel().oData = someModel;
				_this.getView().getModel().updateBindings();
			});
		},

		/**
		 * Clears all fields on form page and set everything to default values
		 * @function resetForm
		 * @memberof app.components.main.main
		 */
		resetForm : function() {
			this.prevItemSelected = null;
			this.setFormData( this.getFormModel() );
		},

		/**
		 * Get model for form
		 * @function getFormModel
		 * @memberof app.components.main.main
		 */
		getFormModel : function() {
			var currDate = new Date();
			var fromDate = new Date();
			fromDate.setDate(fromDate.getDate()-dataManager.DEFAULTRANGE);
			var formModel = {
				"detail" : { "visible" : false, "notification" : {} },
				"searchFromDate" : helper.getFormattedDate(fromDate),
				"searchToDate" : helper.getFormattedDate(currDate),
				"notificationSet" : [],
				"range" : dataManager.getDateRange(),
				"selectedRange" : dataManager.DEFAULTRANGE,
				"showRange" : false,
				"notePanelExpanded" : true,
				"searchPanelExpanded" : true,
				"optionPanelExpanded" : false,
				"resultPanelExpanded" : false,
				"haveResults" : false,
				"showNoResultMessage" : true,
				"searchMSG" : "",
				"searchMSGWarning" : false,
				"searchMSGError" : false,
				"isPhone" : sap.ui.Device.system.phone,
				"reason" : this.emptyReason(),
				"email" : {
					"subject" : "",
					"body" : ""
				}
			};
			return formModel;
		},
		
		/**
		 * Get model for form
		 * @function backToDetail
		 * @memberof app.components.main.main
		 */
		backToDetail : function(masterPageId) {
			this.getSplitAppObj().toMaster(this.createId(masterPageId));
		},

		onPressGoToDetail : function(detailPageId) {
			this.getSplitAppObj().to(this.createId(detailPageId));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressGoToMaster : function(masterPageId) {
			this.getSplitAppObj().toMaster(this.createId(masterPageId));
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppMain");
			if (!result) {
				console.log("SplitApp object can't be found");
			}
			return result;
		},
		
		/**
		 * When list item is press update detail page with selection
		 * 
		 * @function onCategoryItemPress
		 * @memberof app.components.main.main
		 */
		onCategoryItemPress : function() {
			var category = this.getFormData().detail.notification.Category;
			for(var i = 0; i < this.getFormData().fields.Category.length; i++) {
				if( this.getFormData().fields.Category[i].CatId == category ) {
					this.FORMFIELDS.SubCategory = this.getFormData().fields.Category[i].subCat;
					if(this.getFormData().detail.notification.unchanged) {
						if(category == this.getFormData().detail.notification.unchanged.Category) {
							this.getFormData().detail.notification.SubCategory = this.getFormData().detail.notification.unchanged.SubCategory;
						} else {
							this.getFormData().detail.notification.SubCategory = this.FORMFIELDS.SubCategory[0].CatId;						
						}	
					}
					break;
				}
			}
			this.getView().getModel().updateBindings();
		},
		
		/**
		 * When list item is press update detail page with selection
		 * 
		 * @function onListItemPress
		 * @memberof app.components.main.main
		 */
		onListItemPress : function(oControlEvent) {
			this.getSplitAppObj().to(this.createId("detail"));
			var selectedItem = oControlEvent.getParameters().listItem;
			this.setSelectedItem( selectedItem );
		},
		
		/**
		 * When list item is press update detail page with selection
		 * 
		 * @function onListItemPress
		 * @memberof app.components.main.main
		 */
		setSelectedItem : function(listItem) {
			//console.log(listItem);
			var tooltip = listItem.getTooltip();
			var notificationNumber = dataManager.toolTipToNotificationID(tooltip);
			this.getView().byId("idIconTabBarMulti").setSelectedKey(0);
			var viewModel = this.getFormData();
			viewModel.detail.notification = JSON.parse(JSON.stringify(this.getNotification(notificationNumber)));
			viewModel.detail.notification.unchanged = JSON.parse(JSON.stringify(viewModel.detail.notification));
			viewModel.detail.notification.canAddNote = true;
			viewModel.detail.notification.newNotes = null;
			viewModel.reason = this.emptyReason();
			viewModel.email.subject = "Inquiry # " + viewModel.detail.notification.EsbId;
			this.setFormData( viewModel );
			
			if( this.prevItemSelected ) {
				this.prevItemSelected.toggleStyleClass("selectedMark", false);
			}
			listItem.toggleStyleClass("selectedMark", true);
			this.prevItemSelected = listItem;
			this.onCategoryItemPress();
		},
		
		/**
		 * Select first element in list
		 * 
		 * @function selectFirst
		 * @memberof app.components.main.main
		 */
		selectFirst : function(oControlEvent) {
			if( !sap.ui.Device.system.phone 
					&& oControlEvent.getSource().getItems() 
					&& oControlEvent.getSource().getItems().length > 0 ) {
				var firstItem = oControlEvent.getSource().getItems()[0];
				this.setSelectedItem(firstItem);			
			}
		},
		
		/**
		 * Search button trigger
		 * 
		 * @function onSearch
		 * @memberof app.components.main.main
		 */
		onSearch : function(caseID) {
			var viewModel = this.getFormData();
			var dateRange = helper.getRangeOfFormattedStringDate( viewModel.searchFromDate, viewModel.searchToDate );
			if( dateRange <= 0 ) {
				return;
			}
			
			if( this.prevItemSelected ) {
				this.prevItemSelected.toggleStyleClass("selectedMark", false);
				this.prevItemSelected = null;				
			}
			
			this.onDialogCancelButton();
			viewModel.resultText = "";
			viewModel.notificationSet = [];
			this.byId("detail").addStyleClass("blankPage");	
			viewModel.haveResults = false;
			this.setFormData( viewModel );
			var that = this;
			
			var t0 = performance.now();
			var success = function(resultSet) {
				if( resultSet && resultSet.length > 0 ) {
					viewModel.masterSet = resultSet;
					viewModel.haveResults = true;
					var t1 = performance.now();
					viewModel.notificationSet = dataManager.setToolTip(resultSet);
					viewModel.masternotificationSet = viewModel.notificationSet;
					viewModel.searchTime = (t1 - t0);
					viewModel.resultText = dataManager.getResultText( resultSet );
					viewModel.searchText = that.getSearchText();
					
					if( viewModel.masterSet && viewModel.masterSet.length > 0 ) {
						viewModel.detail.notification = JSON.parse(JSON.stringify(viewModel.masterSet[0]));
						that.onCategoryItemPress();
						viewModel.detail.visible = true;
					}
					that.byId("detail").removeStyleClass("blankPage");
					
					that.sort("CreateTime");
					
					var index = 0;
					if(caseID) {
						for(var i = 0; i < viewModel.notificationSet.length; i++) {
							if(viewModel.notificationSet[i].ExtKey == caseID) {
								index = i;
								break;
							}
						}
					}
					var item = that.getView().byId("resultList").getItems()[index];
					that.setSelectedItem( item );
				} else {
					that.byId("detail").addStyleClass("blankPage");	
					viewModel.haveResults = false;
				}
				viewModel.showNoResultMessage = !viewModel.haveResults;
				that.setFormData( viewModel );
				that.busyDialog.close();
			};
			
			var failed = function(error) {
				that.busyDialog.close();
				console.log(error);
				success({});
			};
			
			this.busyDialog.open();
			dataManager.searchNotifications( this.getFormattedDate(viewModel.searchFromDate), this.getFormattedDate(viewModel.searchToDate), success, failed );
		},
		
		/**
		 * Returns formatted date in form 2017-2-3 into 20170203
		 * 
		 * @param {string} d - 2017-2-3 into 2017-02-03
		 * @function getFormattedDate
		 * @memberof app.components.main.main
		 */
		getFormattedDate : function(d) {
			var data = d.split("-");
			var year = data[0];
			var month = data[1];
			var day = data[2];
			if (month.length < 2) {
				month = "0" + month;
			}
			if (day.length < 2) {
				day = "0" + day;
			}

			return "" + year + "" + month + "" + day;
		},
		
		/**
		 * Send email press
		 * 
		 * @function onSendPress
		 * @memberof app.components.main.main
		 */
		onSendPress : function() {
			var viewModel = this.getFormData();
			var _this = this;
			this.savingDialog.setTitle("Sending");
			this.savingDialog.open();
			var success = function(val) {
				_this.savingDialog.close();
				viewModel.email = {
						"subject" : "",
						"body" : ""
					};
				_this.getView().getModel().updateBindings();
				
				var msg = "Email Sent Successfully";
                sap.m.MessageBox.show(msg,
                    sap.m.MessageBox.Icon.SUCCESS,
                    "Send Successful", [sap.m.MessageBox.Action.OK],
                    function() {}
                );
			};
			var failed = function(err) {
				_this.savingDialog.close();
				var errorMessage = err.indexOf("<code>") > 0 ? err.split("<code>")[1].split("</code>")[0] : err;
				var msg = "Email Send Fail: \n\n" + errorMessage;
                sap.m.MessageBox.show(msg,
                    sap.m.MessageBox.Icon.ERROR,
                    "Send Fail", [sap.m.MessageBox.Action.OK],
                    function() {}
                );
			};
			dataManager.sendEmail( success, failed, viewModel.detail.notification, viewModel.email );
		},
		
		/**
		 * Save button trigger
		 * 
		 * @function onSavePress
		 * @memberof app.components.main.main
		 */
		onSavePressOld : function() {
			var viewModel = this.getFormData();
			
			if(viewModel.reason.boxClass == "active") {
				sap.m.MessageBox.show( "A reason must be selected when case record status is change to either \"Completed\" or \"Cancel\".",
						sap.m.MessageBox.Icon.ERROR,
						"Save Fail", [sap.m.MessageBox.Action.OK],
						function() {}
				);
			} else {
				this.savingDialog.setTitle("Submitting");
				this.savingDialog.open();
				var _this = this;
				var success = function(val) {
					_this.savingDialog.close();
					viewModel.detail.notification.newNotes = null;
					viewModel.detail.notification.canAddNote = true;
					viewModel.detail.notification.unchanged = JSON.parse(JSON.stringify(viewModel.detail.notification));
					_this.getView().getModel().updateBindings();
					
					var msg = "Data Saved Successully";
					sap.m.MessageBox.show(msg,
							sap.m.MessageBox.Icon.SUCCESS,
							"Save Successful", [sap.m.MessageBox.Action.OK],
							function() { _this.onSearch(); }
					);
				};
				var failed = function(err) {
					_this.savingDialog.close();
					var errorMessage = err.indexOf("<code>") > 0 ? err.split("<code>")[1].split("</code>")[0] : err;
					var msg = "Data Saved Fail: \n\n" + errorMessage;
					sap.m.MessageBox.show(msg,
							sap.m.MessageBox.Icon.ERROR,
							"Save Fail", [sap.m.MessageBox.Action.OK],
							function() {}
					);
				};
				dataManager.setNotifications( success, failed, viewModel.detail.notification, viewModel.reason.val );
			}
		},
		
		/**
		 * New note button trigger
		 * 
		 * @function onNewNotePress
		 * @memberof app.components.main.main
		 */
		onNewNotePress : function() {
			console.log("onNewNotePress..");
			var viewModel = this.getFormData();
			
			if(JSON.stringify(viewModel) != JSON.stringify(this.getNoteModel())) {
				var isNew = !Boolean(viewModel.detail.notification.newNotes);
				if(isNew) {
					viewModel.detail.notification.newNotes = this.noteDialog.getModel().oData;
				}
				var note = JSON.parse(JSON.stringify(viewModel.detail.notification.newNotes.note));
				this.noteDialogToNotes(note);
				
				if(!isNew) {
					var lastIndex = viewModel.detail.notification.CaseToCaseNotes.results.length - 1;
					viewModel.detail.notification.CaseToCaseNotes.results.splice(lastIndex,1);
				} 
				viewModel.detail.notification.CaseToCaseNotes.results.push(note);					
				viewModel.detail.notification.canAddNote = false;
			}
			this.onDialogCancelButton();
		},
		
		/**
		 * New note button trigger
		 * 
		 * @param { NoteTitle:"",  NoteText: "", NoteType : "" } note
		 * @function noteDialogToNotes
		 * @memberof app.components.main.main
		 */
		noteDialogToNotes : function(note) {
			note.NoteHeader =  (note.NoteType == "C" ? "Customer " : " Internal") + " NEW";
			note.NoteContent = note.NoteTitle + "<br>" + note.NoteText;
			note.isNote = true;
			dataManager.updateNotes(note);
		},
		
		/**
		 * Check if any changes occurred on the form
		 * 
		 * @function validateChange
		 * @memberof app.components.main.main
		 */
		validateChange : function() {
			var result;
			return result;
		},
		
		/**
		 * Clear form
		 * 
		 * @function clearForm
		 * @memberof app.components.main.main
		 */
		clearForm : function() {
			this.resetForm();
		},
		
		/**
		 * Display the search dialog
		 * 
		 * @function displaySearch
		 * @memberof app.components.main.main
		 */
		displaySearch : function() {
			if( !this.searchDialog ) {
				this.searchDialog = sap.ui.xmlfragment('app.components.search.search', this.getView().getController());				
			}
			this.searchDialog.setModel(this.getView().getModel());
			this.searchDialog.open();
		},
		
		/**
		 * Display the note dialog
		 * 
		 * @function displayNote
		 * @memberof app.components.main.main
		 */
		displayNote : function() {
			if( !this.noteDialog ) {
				this.noteDialog = sap.ui.xmlfragment('app.components.note.note', this.getView().getController());				
			}		
			var viewModel = this.getFormData();
			var model = viewModel.detail.notification.newNotes ? viewModel.detail.notification.newNotes : this.getNoteModel();		
			this.noteDialog.setModel(new sap.ui.model.json.JSONModel( model ));
			this.noteDialog.open();
		},
		
		/**
		 * Display the user search dialog
		 * 
		 * @function displayNote
		 * @memberof app.components.main.main
		 */
		displaySearchUser : function() {
			if( !this.searchUserDialog ) {
				this.searchUserDialog = sap.ui.xmlfragment('app.components.search.searchUser', this.getView().getController());				
			}
			var model = JSON.parse(this.EMPTYUSERSEARCH);
			this.searchUserDialog.setModel( new sap.ui.model.json.JSONModel( model ));
			this.searchUserDialog.open();
		},
		
		/**
		 * Display the sort dialog
		 * 
		 * @function displaySort
		 * @memberof app.components.main.main
		 */
		displaySort : function() {
			if( !this.sortDialog ) {
				this.sortDialog = sap.ui.xmlfragment('app.components.sort.sort', this.getView().getController());				
			}
			this.sortDialog.setModel(this.getView().getModel());
			this.sortDialog.open();
		},
		
		/**
		 * Close dialog on cancel in dialog
		 * 
		 * @function onDialogCancelButton
		 * @memberof app.components.main.main
		 */
		onDialogCancelButton : function() {
			if( this.searchDialog ) {
				this.searchDialog.close();								
			}
			
			if( this.noteDialog ) {
				this.noteDialog.close();								
			}
			
			if( this.sortDialog ) {
				this.sortDialog.close();								
			}
			
			if( this.searchUserDialog ) {
				this.searchUserDialog.close();								
			}
			
			if(this.getFormData()) {
				this.getView().getModel().oData.noteDialog = this.getNoteModel();
				this.getView().getModel().updateBindings();
			}
		},
		
		/**
		 * De-select all radio button range
		 * 
		 * @function doDeselectRange
		 * @memberof app.components.main.main
		 */
		onUserSearch : function() {
			var _this = this;
			var model = this.searchUserDialog.getModel().oData;
			this.busyDialog.open();
			if(model.first || model.last) {
				new Promise( function (resolve, reject) {
					dataManager.getUserList(model, resolve, reject);
				}).then( function( fields ) {
					_this.busyDialog.close();
					if(fields) {
						if(fields.length == 0) {
							sap.m.MessageBox.show("Please verify search input.",
									sap.m.MessageBox.Icon.INFORMATION,
									"No Results Found", [sap.m.MessageBox.Action.OK],
									function() {}
							);
						} else {
							_this.searchUserDialog.getModel().oData.resultSet = fields;
							_this.searchUserDialog.getModel().updateBindings();						
						}
					}
				}, function( err ) {
					_this.busyDialog.close();
					var errorMessage = err.split("<code>")[1].split("</code>")[0];
					var msg = "User Search Fail: \n\n" + errorMessage;
					sap.m.MessageBox.show(msg,
							sap.m.MessageBox.Icon.ERROR,
							"Search Fail", [sap.m.MessageBox.Action.OK],
							function() {}
					);
				});
			} else {
				this.busyDialog.close();
				sap.m.MessageBox.show("Please narrow search criteria",
						sap.m.MessageBox.Icon.INFORMATION,
						"Too Much Results", [sap.m.MessageBox.Action.OK],
						function() {}
				);
			}
		},
		
		/**
         * Click event when a form object from the user search list is selected
         * Set processor
         * @function onUserListPress
         * @param {Event} evt - Context of the list item that was pressed
         * @memberof app.components.main.main
         */
		onUserListPress : function(evt) {
			var resultSet = this.searchUserDialog.getModel().oData.resultSet;
			var index = evt.getSource().getBindingContext().sPath.split("/")[2];
			var val = resultSet[index].Bname;
			this.getFormData().detail.notification.Processor = val;
			this.searchUserDialog.getModel().updateBindings();
            
            this.onDialogCancelButton();
		},
		
		/**
		 * Sort result set by selected criteria
		 * 
		 * @function doSort
		 * @memberof app.components.main.main
		 */
		doSort : function(oControlEvent) {
			this.sort(oControlEvent.getSource().getText());
		},
		
		/**
		 * Sort result set by selected criteria
		 * 
		 * @function doSort
		 * @memberof app.components.main.main
		 */
		sort : function(sortOn) {	
			this.onDialogCancelButton();
			var viewModel = this.getFormData();
			var notificationArray = viewModel.notificationSet;
			if( notificationArray && notificationArray.length > 0 ){
				var compareFunction = function(a,b){ 
					return a.CreateTime - b.CreateTime; 
					};
				switch ( sortOn ) {
					case "Case ID":
						compareFunction = function(a,b){ 
							return helper.stringToDate( b.startDate ).getTime() - helper.stringToDate( a.startDate ).getTime(); 
						};
						break;
					case "Channel":
						compareFunction = function(a,b){
							var valA = a.title.match(/\S+/g)[1];
							var valB = b.title.match(/\S+/g)[1];
							valA = valA.replace( ",", "" ).replace( ",", "" ).replace( ",", "" );
							valB = valB.replace( ",", "" ).replace( ",", "" ).replace( ",", "" );
							
							return valB - valA;
						};
						break;
					case "Status":
						compareFunction = function(a,b){
							var valA = a.title.match(/\S+/g)[3];
							var valB = b.title.match(/\S+/g)[3];
							valA = valA.replace( ",", "" ).replace( ",", "" ).replace( ",", "" );
							valB = valB.replace( ",", "" ).replace( ",", "" ).replace( ",", "" );
							
							return valB - valA; 
						};
						break;
					case "Priority":
						compareFunction = function(a,b){
							var valA = a.duration.replace( ":", "" ).replace( ":", "" );
							var valB = b.duration.replace( ":", "" ).replace( ":", "" );
							return valB - valA; 
						};
						break;
				}
				viewModel.notificationSet = notificationArray.sort( compareFunction );
				this.setFormData( viewModel );
			}
		},
		
		test: function() {
			//alert("test");
		},
		
		/**
		 * De-select all radio button range
		 * 
		 * @function doDeselectRange
		 * @memberof app.components.main.main
		 */
		onRangeChange : function() {
			var viewModel = this.getFormData();
			viewModel.showRange = viewModel.selectedRange == "Custom";
			if( !viewModel.showRange ) {
				var currDate = new Date();
				var fromDate = new Date();
				fromDate.setDate(fromDate.getDate()-viewModel.selectedRange);
				viewModel.searchFromDate = helper.getFormattedDate(fromDate);
				viewModel.searchToDate = helper.getFormattedDate(currDate);
			}
			this.setFormData( viewModel );
			this.onDateChange();
		},
		
		/**
		 * Deselect all radio button range
		 * 
		 * @function doDeselectRange
		 * @memberof app.components.main.main
		 */
		onDateChange : function(oEvent) {			
			var viewModel = this.getFormData();
			var dateRange = helper.getRangeOfFormattedStringDate( viewModel.searchFromDate, viewModel.searchToDate );
			viewModel.searchMSG = "";
			viewModel.searchMSGWarning = false;
			viewModel.searchMSGError = false;
			
			if( dateRange <= 0 ) {
				viewModel.searchMSG = "* Start date after end date";
				viewModel.searchMSGError = true;
			} else if( dateRange > helper.DAYLIMIT ) {
				viewModel.searchMSG = "* Range exceeds 365 days";
				viewModel.searchMSGWarning = true;
			}			
			this.setFormData( viewModel );
		},
		
		/**
		 * Get Notification from caseID
		 * 
		 * @param {string} caseID
		 * @function getResultText
		 * @memberof app.components.main.main
		 */
		getNotification : function(caseID) {
			var notificationList = this.getFormData().notificationSet;
			var result = null;
			for(var i = 0; i < notificationList.length; i++) {
				if(notificationList[i].ExtKey == caseID ) {
					result = notificationList[i];
				}
			}
			return result;
		},
		
		/**
		 * Set test to "No results were found" if no results are in set
		 * else set to # result(s)
		 * 
		 * @function getResultText
		 * @memberof app.components.main.main
		 */
		getSearchText : function(resultSet) {
			var viewModel = this.getFormData();	
			var result = "";
			if( viewModel.selectedRange == "Custom") {
				result = viewModel.searchFromDate + " to " + viewModel.searchToDate + result;
			} else {
				result = "Last " + viewModel.selectedRange + " day(s)";				
			}
			return result;
		},
		
		/**
		 * Trigger when status select box item is selected
		 * 
		 * @function statusUpdate
		 * @memberof app.components.main.main
		 */
		statusUpdate : function(oControlEvent) {
			var unchangedStat = this.getFormData().detail.notification.unchanged.StatOrderno;
			var selectedItem = oControlEvent.getParameters("selectedItem").selectedItem.mProperties;
			this.getFormData().reason.enable = selectedItem.key != unchangedStat;
			if(selectedItem.key != unchangedStat && (selectedItem.key == "60" || selectedItem.key == "70")) {
				this.getFormData().reason.boxClass = "active";					
			} else {
				this.getFormData().reason = this.emptyReason();
			}
			this.getView().getModel().updateBindings();
		},
		
		/**
		 * Trigger when reason is selected
		 * 
		 * @function reasonUpdate
		 * @memberof app.components.main.main
		 */
		reasonUpdate : function(oControlEvent) {
			if(this.getFormData().reason.boxClass == "active") {
				var selectedItem = oControlEvent.getParameters("selectedItem").selectedItem.mProperties;
				if(selectedItem.key) {
					this.getFormData().reason.boxClass = "notActive";
				} else {
					this.getFormData().reason.boxClass = "active";
				}
				this.getView().getModel().updateBindings();				
			}
		},
		
		/**
		 * Reset Status of 
		 * 
		 * @function statusUpdate
		 * @memberof app.components.main.main
		 */
		emptyReason : function(oControlEvent) {
			return { "val" : "", "enable" : false, "boxClass" : "notActive" };
		},
		
		/**
		 * Open link on different tab
		 * 
		 * @function openLinkInDifferentTab
		 * @memberof app.components.main.main
		 */
		openLinkInDifferentTab : function(resultSet) {
			var win = window.open(this.getFormData().detail.notification.CaseUrl, '_blank');
			if (win) { 	//Browser has allowed it to be opened
			    win.focus();
			} else { 	//Browser has blocked it
				alert('Please allow popups for this website');
			}	
		},
		
//		onSelectChanged: function(oEvent) { 
//            var key = oEvent.getParameters().key;
//            if(this.prevTab != key) {
//            	this.prevTab = key;
//            	if( key == "__filter3" ) {
//            		this.openLinkInDifferentTab();
//            	}
//            }
//        },
		
		/**
		 * Test button trigger
		 * @function test
		 * @memberof app.components.main.main
		 */
		onSavePress: function (evt) {
			var viewModel = this.getFormData();
			var formModel = viewModel.detail.notification;
			var unchangedModel = formModel.unchanged;
			
			if(viewModel.reason.boxClass == "active") {
				sap.m.MessageBox.show( "A reason must be selected when case record status is change to either \"Completed\" or \"Cancel\".",
						sap.m.MessageBox.Icon.ERROR,
						"Save Fail", [sap.m.MessageBox.Action.OK],
						function() {}
				);
			} else if(!formModel.Processor) {
				sap.m.MessageBox.show( "A processor must be assigned, please select a valid processor.",
						sap.m.MessageBox.Icon.ERROR,
						"Processor Error", [sap.m.MessageBox.Action.OK],
						function() {}
				);
			} else {
				this.savingDialog.setTitle("Submitting");
				this.savingDialog.open();
				var _this = this;
				var success = function(val) {
					_this.savingDialog.close();
					viewModel.detail.notification.newNotes = null;
					viewModel.detail.notification.canAddNote = true;
					viewModel.detail.notification.unchanged = JSON.parse(JSON.stringify(viewModel.detail.notification));
					_this.getView().getModel().updateBindings();
					
					var msg = "Data Saved Successully";
					sap.m.MessageBox.show(msg,
							sap.m.MessageBox.Icon.SUCCESS,
							"Save Successful", [sap.m.MessageBox.Action.OK],
							function() { _this.onSearch(); }
					);
				};
				var failed = function(err) {
					_this.savingDialog.close();
					var errorMessage = err.indexOf("<code>") > 0 ? err.split("<message>")[1].split("</message>")[0] : err;
					var msg = "Data Saved Fail: \n\n" + errorMessage;
					sap.m.MessageBox.show(msg,
							sap.m.MessageBox.Icon.ERROR,
							"Save Fail", [sap.m.MessageBox.Action.OK],
							function() {}
					);
				};
				
				var haveOther = (formModel.Processor && formModel.Processor != formModel.unchanged.Processor) || (formModel.StatOrderno && formModel.StatOrderno != formModel.unchanged.StatOrderno) 
					|| (formModel.Priority && formModel.Priority != formModel.unchanged.Priority);
				var haveCat = (formModel.Category && formModel.Category != formModel.unchanged.Category) || (formModel.SubCategory && formModel.SubCategory != formModel.unchanged.SubCategory);
				var haveNotes = Boolean(viewModel.detail.notification.newNotes);
				
				if(!haveOther && !haveCat && !haveNotes) {
					_this.savingDialog.close();
					sap.m.MessageBox.show( "No change detected in case.",
							sap.m.MessageBox.Icon.ERROR,
							"Data was unchanged", [sap.m.MessageBox.Action.OK],
							function() {}
					);
				} else {
					var index = haveOther ? 1 : haveCat ? 2 : haveNotes ? 3 : null;
					var indexSuccess = function() {
						if(index < 2) {
							index = haveCat ? 2 : haveNotes ? 3 : null;							
						} else if(index < 3) {
							index = haveNotes ? 3 : null;	
						} else {
							index = null;
						}
						
						if(index != null ) {
							dataManager.setNotifications( indexSuccess, failed, viewModel.detail.notification, viewModel.reason.val, index );
						} else {
							success();
						}
					};

					dataManager.setNotifications( indexSuccess, failed, viewModel.detail.notification, viewModel.reason.val, index );
				}				
			}
		},

		/**
		 * Back to fiori
		 * 
		 * @function backToFiori
		 * @memberof app.components.main.main
		 */
		backToFiori : function() {
			window.parent.history.back();
		}
	});
});