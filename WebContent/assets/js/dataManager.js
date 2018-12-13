/**
 * @namespace app
 */

/**
 * @namespace app.assets
 * @memberof app
 */

/**
 * @namespace app.assets.dataManager
 * @memberof app.assets
 */
jQuery.sap.declare("dataManager");

dataManager = {
	SERVICEURL : "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet?$filter=(Channel eq 'Z001') and (StatOrderno eq '30' or StatOrderno eq '40' or StatOrderno eq '50')&$expand=CaseToCaseNotes,CaseToCaseAttachment&$format=json",
	PUTURL : "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'GUIDVAR')",
	SENDURL : "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseEmailSet(guid'GUIDVAR')",
	DEFAULTRANGE : 30,
	SIMULATEFIORI : false,
	NOTIFICATIONS : {},
	ChannelList : null,
	CategoryList : null,
	StatusList : null,
	PriorityList : null,
	ReasonList : null,
	token : null,

	/**
	 * Get note type
	 * 
	 * @function getNoteType
	 * @memberof app.components.main.main
	 */
	getNoteType : function() {
		return [ {
			"key" : "C",
			"text" : "Customer"
		}, {
			"key" : "I",
			"text" : "Internal"
		} ];
	},

	/**
	 * Get date range for search dropdown box
	 * 
	 * @function getDateRange
	 * @memberof app.components.main.main
	 */
	getDateRange : function() {
		return [ {
			"key" : "30",
			"text" : "Last 30 days"
		}, {
			"key" : "60",
			"text" : "Last 60 days"
		}, {
			"key" : "90",
			"text" : "Last 90 days"
		}, {
			"key" : "Custom",
			"text" : "Custom"
		} ];
	},

	/**
	 * Get category list for dropdown box
	 * 
	 * @function getCategoryList
	 * @memberof app.components.main.main
	 */
	getCategoryList : function(onSuccess, onFailed) {
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet?$expand=CategoryToSubCategory&$format=json";
		var _this = this;
		if (!this.CategoryList) {
			var success = function(resultSet) {
				if (resultSet) {
					var result = [];
					var subCat = [];
					for (var i = 0; i < resultSet.length; i++) {
						subCat = [];
						for (var n = 0; n < resultSet[i].CategoryToSubCategory.results.length; n++) {
							subCat
									.push({
										"CatDesc" : resultSet[i].CategoryToSubCategory.results[n].CatDesc,
										"CatId" : resultSet[i].CategoryToSubCategory.results[n].CatId
									});
						}
						result.push({
							"CatId" : resultSet[i].CatId,
							"CatDesc" : resultSet[i].CatDesc,
							"subCat" : subCat
						});
					}
					_this.CategoryList = result;
					onSuccess(_this.CategoryList);
				} else {
					onSuccess({});
				}
			};

			var failed = function(error) {
				console.log("Failed on dataManager.getCategoryList");
				onFailed(error)
			};

			if (this.SIMULATEFIORI) {
				_this.CategoryList = [
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC2E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC2E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAC2E46",
							"CatDesc" : "Power Outages",
							"CatId" : "ZIRA_CAT_OUTAGE",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC4E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC4E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DAMAGE",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAC4E46",
											"CatDesc" : "Damages/Losses",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAC2E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC6E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC6E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DAM_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAC6E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAC2E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC8E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAC8E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_NEG",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAC8E46",
											"CatDesc" : "Negative Feedback",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAC2E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACAE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACAE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_POS",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CACAE46",
											"CatDesc" : "Positive Feedback",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAC2E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACCE46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACCE46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CACCE46",
							"CatDesc" : "Executive Offices",
							"CatId" : "ZIRA_CAT_EXEC",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACEE46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CACEE46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_EX_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CACEE46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CACCE46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD0E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD0E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAD0E46",
							"CatDesc" : "Procurement",
							"CatId" : "ZIRA_CAT_PROC",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD2E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD2E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_PR_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAD2E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAD0E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD4E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD4E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_VENDOR",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAD4E46",
											"CatDesc" : "Vendors / Suppliers",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAD0E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD6E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD6E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_TEND",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAD6E46",
											"CatDesc" : "Tendering Contracts",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAD0E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD8E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAD8E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAD8E46",
							"CatDesc" : "Social Media",
							"CatId" : "ZIRA_CAT_SOCIAL",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADAE46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADAE46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_SM_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CADAE46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAD8E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADCE46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADCE46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CADCE46",
							"CatDesc" : "Spam",
							"CatId" : "ZIRA_CAT_SPAM",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADEE46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CADEE46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_SPM_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CADEE46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CADCE46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE0E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE0E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAE0E46",
							"CatDesc" : "AMI Inquiry",
							"CatId" : "ZIRA_CAT_AMI",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE2E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE2E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAE2E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE0E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE4E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE4E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAE4E46",
							"CatDesc" : "Automatic Payment",
							"CatId" : "ZIRA_CAT_AUTOPAY",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE6E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE6E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_AP_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAE6E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE4E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE8E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAE8E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46",
							"CatDesc" : "Account Maintenance & Billing",
							"CatId" : "ZIRA_CAT_AMB",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAEAE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAEAE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_AB",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAEAE46",
											"CatDesc" : "Account Balance",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAECE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAECE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_AC",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAECE46",
											"CatDesc" : "Account changes",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAEEE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAEEE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_COLL",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAEEE46",
											"CatDesc" : "Collections",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF0E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF0E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_PET",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAF0E46",
											"CatDesc" : "Pet Notes",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF2E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF2E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_CIS",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAF2E46",
											"CatDesc" : "Change in Service",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF4E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF4E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_EPP",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAF4E46",
											"CatDesc" : "Equalized Payment Plan",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF6E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF6E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_EST",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAF6E46",
											"CatDesc" : "Estate",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF8E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAF8E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_AM_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAF8E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFAE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFAE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_LLD",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAFAE46",
											"CatDesc" : "Landlord Agreements",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFCE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFCE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_MR",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAFCE46",
											"CatDesc" : "Meter Read Submissions",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFEE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CAFEE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_PPP",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CAFEE46",
											"CatDesc" : "Pre-Authorized Payment Plan",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CAE8E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB00E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB00E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB00E46",
							"CatDesc" : "Call Before you Dig",
							"CatId" : "ZIRA_CAT_CALL",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB02E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB02E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_CALL",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB02E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB00E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB04E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB04E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB04E46",
							"CatDesc" : "Carbon Capture and Storage/Clean Coal",
							"CatId" : "ZIRA_CAT_CCSC",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB06E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB06E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_CC_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB06E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB04E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB08E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB08E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46",
							"CatDesc" : "Careers and Human Resources",
							"CatId" : "ZIRA_CAT_CHR",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0AE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0AE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_CAREER",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB0AE46",
											"CatDesc" : "Career Fair",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DIV",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB0CE46",
											"CatDesc" : "Diversity",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB0EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_FOREMP",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB0EE46",
											"CatDesc" : "Former Employee Inquires",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB10E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB10E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_HR_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB10E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB12E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB12E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_JOB",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB12E46",
											"CatDesc" : "Job Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB14E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB14E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SCH",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB14E46",
											"CatDesc" : "Scholarships",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB08E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB16E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB16E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB16E46",
							"CatDesc" : "Customer Programs",
							"CatId" : "ZIRA_CAT_CUSTPROG",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1AE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1AE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_CEE",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB1AE46",
											"CatDesc" : "Conservation and Efficiency Education",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB16E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DSM",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB1CE46",
											"CatDesc" : "Specific DSM Programs",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB16E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB1EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_MOBAPP",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB1EE46",
											"CatDesc" : "SaskPower Mobile App",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB16E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB20E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB20E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_CUST_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB20E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB16E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB18E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB18E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB18E46",
							"CatDesc" : "Customer Complaints",
							"CatId" : "ZIRA_CAT_CUSTCOMP",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB22E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB22E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_COMP_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB22E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB18E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB24E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB24E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46",
							"CatDesc" : "Distribution",
							"CatId" : "ZIRA_CAT_DIST",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB26E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB26E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_STR",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB26E46",
											"CatDesc" : "Streetlights",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB28E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB28E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_HLM",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB28E46",
											"CatDesc" : "High Load Moves",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2AE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2AE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_TREE",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB2AE46",
											"CatDesc" : "Tree Trimming",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DIST",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB2CE46",
											"CatDesc" : "District Manager",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB2EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_PPS",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB2EE46",
											"CatDesc" : "Power Pole Salvage",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB24E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB30E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB30E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB30E46",
							"CatDesc" : "Environment and Safety",
							"CatId" : "ZIRA_CAT_ENVIRO",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB32E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB32E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_ENV_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB32E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB30E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB34E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB34E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SCHOOL",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB34E46",
											"CatDesc" : "School Presentations",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB30E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB36E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB36E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SHAND",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB36E46",
											"CatDesc" : "Shand Greenhouse",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB30E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB38E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB38E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB38E46",
							"CatDesc" : "Fleet Services",
							"CatId" : "ZIRA_CAT_FLEET",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3AE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3AE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_DRIVER",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB3AE46",
											"CatDesc" : "Driver Complaints",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB38E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_FL_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB3CE46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB38E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3EE46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB3EE46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB3EE46",
							"CatDesc" : "General Inquiry",
							"CatId" : "ZIRA_CAT_GEN",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB40E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB40E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_GEN_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB40E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB3EE46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB42E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB42E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB42E46",
							"CatDesc" : "Inspections & Permits",
							"CatId" : "ZIRA_CAT_INSP",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [ {
									"__metadata" : {
										"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB44E46')",
										"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB44E46')",
										"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
									},
									"CatId" : "SUBCAT_INS_GEN",
									"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB44E46",
									"CatDesc" : "General Inquiries",
									"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB42E46"
								} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB46E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB46E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46",
							"CatDesc" : "Media and Communications",
							"CatId" : "ZIRA_CAT_MEDIA",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB48E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB48E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_AD",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB48E46",
											"CatDesc" : "Advertising & Brand",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4AE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4AE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_AB_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB4AE46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_POWER",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB4CE46",
											"CatDesc" : "Power To Grow",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB4EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SPONS",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB4EE46",
											"CatDesc" : "Sponsorships/Donations",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB50E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB50E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_TRADE",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB50E46",
											"CatDesc" : "Tradeshows",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB52E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB52E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_WEB",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB52E46",
											"CatDesc" : "Websites",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB46E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB54E46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB54E46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB54E46",
							"CatDesc" : "My Account",
							"CatId" : "ZIRA_CAT_MA",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB56E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB56E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_MA_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB56E46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB54E46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB58E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB58E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_TECH",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB58E46",
											"CatDesc" : "Technical Issues",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB54E46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5AE46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5AE46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46",
							"CatDesc" : "New Connections & Construction",
							"CatId" : "ZIRA_CAT_NCC",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_PA",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB5CE46",
											"CatDesc" : "Prince Albert/General Inquires",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB5EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_REG",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB5EE46",
											"CatDesc" : "Regina",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB60E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB60E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SKTOON",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB60E46",
											"CatDesc" : "Saskatoon",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB62E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB62E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SC_MJ",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB62E46",
											"CatDesc" : "Swift Current/ Moose Jaw",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB64E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB64E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_WB",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB64E46",
											"CatDesc" : "Weyburn",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB66E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB66E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_YORK",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB66E46",
											"CatDesc" : "Yorkton",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB68E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB68E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_BUSS",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB68E46",
											"CatDesc" : "Business Manager",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB5AE46"
										} ]
							}
						},
						{
							"__metadata" : {
								"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6AE46')",
								"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6AE46')",
								"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseCategory"
							},
							"CatGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46",
							"CatDesc" : "Power Generation",
							"CatId" : "ZIRA_CAT_POW_GEN",
							"AspGuid" : "36810772-0D02-1EE7-A5FA-29508CAC0E46",
							"CategoryToSubCategory" : {
								"results" : [
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6CE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6CE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_ALT",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB6CE46",
											"CatDesc" : "Alternative Power Sources (Solar, Waste, Wind)",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6EE46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB6EE46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_POW_GEN",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB6EE46",
											"CatDesc" : "General Inquiries",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB70E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB70E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_FAC",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB70E46",
											"CatDesc" : "Power Generation Facilities",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB72E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB72E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_TRAD",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB72E46",
											"CatDesc" : "Traditional Power Sources (Coal, Hydro, Gas)",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46"
										},
										{
											"__metadata" : {
												"id" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB74E46')",
												"uri" : "http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSubCategorySet(guid'36810772-0D02-1EE7-A5FA-29508CB74E46')",
												"type" : "ZCRM_INQUIRYRESPONSE_SRV.CaseSubCategory"
											},
											"CatId" : "SUBCAT_SELF",
											"NodeGuid" : "36810772-0D02-1EE7-A5FA-29508CB74E46",
											"CatDesc" : "Self Generation",
											"PareGuid" : "36810772-0D02-1EE7-A5FA-29508CB6AE46"
										} ]
							}
						} ];
				setTimeout(function() {
					success(_this.CategoryList)
				}, helper.getRandomInt(1, 2) * 1000);
			} else {
				this.getNotifications(url, success, failed);
			}
		} else {
			onSuccess(this.CategoryList);
		}
	},

	/**
	 * Get status list for dropdown box
	 * 
	 * @function getStatusList
	 * @memberof app.components.main.main
	 */
	getStatusList : function(onSuccess, onFailed) {
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseStatusSet?$format=json";
		var _this = this;
		if (!this.StatusList) {
			var success = function(resultSet) {
				var result = [];
				if (resultSet) {
					for (var i = 0; i < resultSet.length; i++) {
						result.push({
							"StatOrderno" : resultSet[i].StatOrderno,
							"StatOrdnoDescr" : resultSet[i].StatOrdnoDescr
						});
					}
				}
				_this.StatusList = result;
				onSuccess(_this.StatusList);
			};

			var failed = function(error) {
				console.log("Failed on dataManager.getStatusList");
				onFailed(error)
			};

			if (this.SIMULATEFIORI) {
				_this.StatusList = [ {
					"StatOrderno" : "20",
					"StatOrdnoDescr" : "Received"
				}, {
					"StatOrderno" : "30",
					"StatOrdnoDescr" : "In Progress"
				}, {
					"StatOrderno" : "40",
					"StatOrdnoDescr" : "In Progress-Forwarded"
				}, {
					"StatOrderno" : "50",
					"StatOrdnoDescr" : "In Progress-Escalated"
				}, {
					"StatOrderno" : "60",
					"StatOrdnoDescr" : "Completed"
				}, {
					"StatOrderno" : "70",
					"StatOrdnoDescr" : "Cancel"
				}, {
					"StatOrderno" : "80",
					"StatOrdnoDescr" : "Split"
				} ];
				setTimeout(function() {
					onSuccess(_this.StatusList)
				}, helper.getRandomInt(1, 2) * 1000);
			} else {
				this.getNotifications(url, success, failed);
			}
		} else {
			onSuccess(this.StatusList);
		}
	},

	/**
	 * Get priority list for dropdown box
	 * 
	 * @function getPriorityList
	 * @memberof app.components.main.main
	 */
	getPriorityList : function(onSuccess, onFailed) {
		var _this = this;
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CasePrioritySet?$format=json";
		if (!this.PriorityList) {
			var success = function(resultSet) {
				if (resultSet) {
					var result = [];
					for (var i = 0; i < resultSet.length; i++) {
						result.push({
							"Priority" : resultSet[i].Priority,
							"Description" : resultSet[i].Description
						});
					}
				}
				_this.PriorityList = result;
				onSuccess(_this.PriorityList);
			};

			var failed = function(error) {
				console.log("Failed on dataManager.getStatusList");
				onFailed(error);
			};

			if (this.SIMULATEFIORI) {
				this.PriorityList = [ {
					"Priority" : "1",
					"Description" : "Medium"
				}, {
					"Priority" : "2",
					"Description" : "Very High"
				}, {
					"Priority" : "3",
					"Description" : "High"
				}, {
					"Priority" : "4",
					"Description" : "Low"
				}, {
					"Priority" : "5",
					"Description" : "Emergency"
				} ];
				setTimeout(function() {
					onSuccess(_this.PriorityList)
				}, helper.getRandomInt(1, 2) * 1000);
			} else {
				this.getNotifications(url, success, failed);
			}
		} else {
			onSuccess(this.PriorityList);
		}
	},
	
	/**
	 * Get reason list for dropdown box
	 * 
	 * @function getReasonList
	 * @memberof app.components.main.main
	 */
	getReasonList : function(onSuccess, onFailed) {
		var _this = this;
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseReasonsSet?$format=json";
		if (!this.ReasonList) {
			var success = function(resultSet) {
				if (resultSet) {
					var result = [{ "ReasonCode" : "", "Description" : "" }];
					for (var i = 0; i < resultSet.length; i++) {
						result.push({
							"ReasonCode" : resultSet[i].ReasonCode,
							"Description" : resultSet[i].Description
						});
					}
				}
				_this.ReasonList = result;
				onSuccess(_this.ReasonList);
			};

			var failed = function(error) {
				console.log("Failed on dataManager.getReasonList");
				onFailed(error);
			};

			if (this.SIMULATEFIORI) {
				this.ReasonList = [ {"ReasonCode" : "","Description" : ""},
					{"ReasonCode" : "APPR","Description" : "PPP-Approval"}, 
					{"ReasonCode" : "FUPC","Description" : "Follow Up Phone Call"}, 
					{"ReasonCode" : "INAD","Description" : "Invalid Address"}, 
					{"ReasonCode" : "NRR","Description" : "No Response Required"}, 
					{"ReasonCode" : "REJ","Description" : "PPP-Rejection"}, 
					{"ReasonCode" : "SPAM","Description" : "Spam"} ];
				setTimeout(function() {
					onSuccess(_this.ReasonList)
				}, helper.getRandomInt(1, 2) * 1000);
			} else {
				this.getNotifications(url, success, failed);
			}
		} else {
			onSuccess(this.ReasonList);
		}
	},
	
	/**
	 * Update token
	 * 
	 * @function updateToken
	 * @memberof app.components.main.main
	 */
	updateToken : function(onSuccess, onFailed) {
		var _this = this;
		//var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/$metadata";
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseReasonsSet?$format=json";

		if (this.SIMULATEFIORI) {
			onSuccess();
		} else {
			this.getNotifications(url, onSuccess, onFailed);
		}
	},
	
	/**
	 * Get user list from first and last name
	 * 
	 * @param {JSON} model - {first:string, last:string}
	 * @param {CallBack} onSuccess - call after search is complete
	 * @param {CallBack} onFailed - call if search fails
	 * @function getUserList
	 * @memberof app.components.main.main
	 */
	getUserList : function(model, onSuccess, onFailed) {
		var _this = this;
		var url = "/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseUsersSet?$filter=";
		if( model.first || model.last ) {
			if( model.first ) {
				var firstName = JSON.stringify(model.first);
				url = url + "NameFirst eq '" + firstName.substring(1,firstName.length - 1) + "'";
				
				if( model.last ) {
					url = url + " and ";
				}
			}
			
			if( model.last ) {
				var lastName = JSON.stringify(model.last);
				url = url + "NameLast eq '" + lastName.substring(1,lastName.length - 1) + "'";
			}
			url = url + "&$format=json";
		} else {
			onFailed();
		}

		var failed = function(error) {
			console.log("Failed on dataManager.getUserList");
			onFailed(error)
		};

		if (this.SIMULATEFIORI) {
			var result = {"d":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseUsersSet('MREADER')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseUsersSet('MREADER')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseUsers"},"Bname":"MREADER","BpNumber":"EM90003478","NameFirst":"Mike","NameLast":"Reader","NameText":"Mike Reader"}]}};
			setTimeout(function() {
				onSuccess(result.d.results)
			}, helper.getRandomInt(1, 2) * 1000);
		} else {
			this.getNotifications(url, onSuccess, failed);
		}
	},

	/**
	 * Search for notifications
	 * 
	 * @function searchNotifications
	 * @param {String} plant - Plant number if any
	 * @param {String} fromDate - from date
	 * @param {String} toDate - to date
	 * @param {CallBack} onSuccess - call after search is complete
	 * @param {CallBack} onFailed - call if search fails
	 * @memberof app.assets.dataManager
	 */
	searchNotifications : function(fromDate, toDate, onSuccess, onFailed) {
		var url = this.SERVICEURL;
		this.NOTIFICATIONS = {};
		if (this.SIMULATEFIORI) {
			setTimeout(function() {
				onSuccess(dataManager.getNotifications())
			}, helper.getRandomInt(1, 2) * 1000);
		} else {
			this.getNotifications(url, onSuccess, onFailed, fromDate.replace(/-/g, ""), toDate.replace(/-/g, ""));
		}
	},

	/**
	 * Get notifications
	 * 
	 * @param {String}
	 *            url - Plant number if any
	 * @param {callBack}
	 *            onSuccess
	 * @param {callBack}
	 *            onFailed
	 * @param {String}
	 *            fromDate
	 * @param {String}
	 *            toDate
	 * @memberof app.assets.dataManager
	 */
	getNotifications : function(url, onSuccess, onFailed, fromDate, toDate) {
		if (this.SIMULATEFIORI) {
			var resultJSON = {"d":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-2CB3994F5D5E')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-2CB3994F5D5E')","type":"ZCRM_INQUIRYRESPONSE_SRV.Case"},"Region":"","Channel":"Z001","CaseGuid":"36810772-0D02-1ED7-AECE-2CB3994F5D5E","Category":"ZIRA_CAT_GEN","RegionDesc":"","CreateTime":"20171026111702","SubCategory":"SUBCAT_GEN_GEN","ChannelDesc":"Sp.com - Contact Us","CustomerName":"Mike Reader","EsbId":"C20171026900","OtherRegion":"","NoteTitle":"","NoteType":"","CustomerEmail":"mreader@saskpower.com","NoteText":"","CustomerPhone":"3065551234","PriorityDesc":"Medium","StatOrderno":"30","StatOrdnoDescr":"In Progress","ExtKey":"995","Processor":"MREADER","CaseTitle":"MR - Test from SOAP UI","Priority":"1","CaseToCaseAttachment":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE2CB39951BD5E')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE2CB39951BD5E')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-2CB3994F5D5E","Component":"Contact Us Test","AttachmentGuid":"368107720D021ED7AECE2CB39951BD5E","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/Contact Us Test?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE2CB39951BD5E&compId=Contact Us Test&accessMode=r&authId=CN%3DXCA&expiration=20171026194822&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0NlowIwYJKoZIhvcNAQkEMRYEFAdC0xe3nBgOqYibCConFZ%2BEadObMAkGByqGSM44BAMELjAsAhRDlHQtl%2BZ0QOpnxEZck4n2hn0hBwIUa8TsVbRYLsgI2%2BfZiuAoQKqM5Zo%3D"}]},"CaseToCaseNotes":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-2CB3994F5D5E',NoteLineNumber=1)","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-2CB3994F5D5E',NoteLineNumber=1)","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseNotes"},"CaseGuid":"36810772-0D02-1ED7-AECE-2CB3994F5D5E","NoteLineNumber":1,"NoteHeader":"Customer Message              ZPIIRA              10/26/2017  11:17:02","NoteContent":"MR - Test from SOAP UI<br>End to end testing of contact us web form for Demo<br>"}]}},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-2D67FDB71D5E')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-2D67FDB71D5E')","type":"ZCRM_INQUIRYRESPONSE_SRV.Case"},"Region":"","Channel":"Z001","CaseGuid":"36810772-0D02-1ED7-AECE-2D67FDB71D5E","Category":"ZIRA_CAT_GEN","RegionDesc":"","CreateTime":"20171026111712","SubCategory":"SUBCAT_GEN_GEN","ChannelDesc":"Sp.com - Contact Us","CustomerName":"Mike Reader","EsbId":"C20171026902","OtherRegion":"","NoteTitle":"","NoteType":"","CustomerEmail":"mreader@saskpower.com","NoteText":"","CustomerPhone":"3065551234","PriorityDesc":"Medium","StatOrderno":"30","StatOrdnoDescr":"In Progress","ExtKey":"997","Processor":"MREADER","CaseTitle":"MR - Test from SOAP UI","Priority":"1","CaseToCaseAttachment":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE2D67FDB97D5E')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE2D67FDB97D5E')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-2D67FDB71D5E","Component":"Contact Us Test","AttachmentGuid":"368107720D021ED7AECE2D67FDB97D5E","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/Contact Us Test?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE2D67FDB97D5E&compId=Contact Us Test&accessMode=r&authId=CN%3DXCA&expiration=20171026194823&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0N1owIwYJKoZIhvcNAQkEMRYEFArvGjtygPCXOPgioRiSFmOBka1NMAkGByqGSM44BAMELjAsAhQ6OO0UgnmqVgRKS%2FCOITPi%2BNrCggIUeHwnfFhLyzxbf5Jb0SNhaVr2e4Y%3D"}]},"CaseToCaseNotes":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-2D67FDB71D5E',NoteLineNumber=1)","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-2D67FDB71D5E',NoteLineNumber=1)","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseNotes"},"CaseGuid":"36810772-0D02-1ED7-AECE-2D67FDB71D5E","NoteLineNumber":1,"NoteHeader":"Customer Message              ZPIIRA              10/26/2017  11:17:11","NoteContent":"MR - Test from SOAP UI<br>End to end testing of contact us web form for Demo<br>"}]}},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-35059D861D62')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-35059D861D62')","type":"ZCRM_INQUIRYRESPONSE_SRV.Case"},"Region":"","Channel":"Z001","CaseGuid":"36810772-0D02-1ED7-AECE-35059D861D62","Category":"ZIRA_CAT_GEN","RegionDesc":"","CreateTime":"20171026111854","SubCategory":"SUBCAT_GEN_GEN","ChannelDesc":"Sp.com - Contact Us","CustomerName":"Mike Reader","EsbId":"C20171026903","OtherRegion":"","NoteTitle":"","NoteType":"","CustomerEmail":"mreader@saskpower.com","NoteText":"","CustomerPhone":"3065551234","PriorityDesc":"Medium","StatOrderno":"30","StatOrdnoDescr":"In Progress","ExtKey":"998","Processor":"MREADER","CaseTitle":"MR - Test from SOAP UI","Priority":"1","CaseToCaseAttachment":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE35059D887D62')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='Contact%20Us%20Test',AttachmentGuid='368107720D021ED7AECE35059D887D62')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-35059D861D62","Component":"Contact Us Test","AttachmentGuid":"368107720D021ED7AECE35059D887D62","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/Contact Us Test?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE35059D887D62&compId=Contact Us Test&accessMode=r&authId=CN%3DXCA&expiration=20171026194823&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0N1owIwYJKoZIhvcNAQkEMRYEFJ6w0jFkEcuN2bt3LpGI75GOHxoYMAkGByqGSM44BAMELjAsAhR1cb7JoxNLjwU1a2VDWBqYpF5BrwIUPuFbRtPusVIXQlsRofhltt70h3w%3D"}]},"CaseToCaseNotes":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-35059D861D62',NoteLineNumber=1)","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-35059D861D62',NoteLineNumber=1)","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseNotes"},"CaseGuid":"36810772-0D02-1ED7-AECE-35059D861D62","NoteLineNumber":1,"NoteHeader":"Customer Message              ZPIIRA              10/26/2017  11:18:53","NoteContent":"MR - Test from SOAP UI<br>End to end testing of contact us web form for Demo<br>"}]}},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-6B6154949DC3')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseSet(guid'36810772-0D02-1ED7-AECE-6B6154949DC3')","type":"ZCRM_INQUIRYRESPONSE_SRV.Case"},"Region":"15","Channel":"Z008","CaseGuid":"36810772-0D02-1ED7-AECE-6B6154949DC3","Category":"ZIRA_CAT_MBD","RegionDesc":"Regina - Downtown","CreateTime":"20171026113103","SubCategory":"SUBCAT_MBD_GEN","ChannelDesc":"Meter Box Damage","CustomerName":"Mike Reader","EsbId":"C20171026950","OtherRegion":"","NoteTitle":"","NoteType":"","CustomerEmail":"mreader@saskpower.com","NoteText":"","CustomerPhone":"3065551234","PriorityDesc":"Medium","StatOrderno":"30","StatOrdnoDescr":"In Progress","ExtKey":"1000","Processor":"MREADER","CaseTitle":"MR - Report Meter Box Damage Test","Priority":"1","CaseToCaseAttachment":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20tif',AttachmentGuid='368107720D021ED7AECE6B770B82BDC3')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20tif',AttachmentGuid='368107720D021ED7AECE6B770B82BDC3')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-6B6154949DC3","Component":"MBD Test tif","AttachmentGuid":"368107720D021ED7AECE6B770B82BDC3","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/MBD Test tif?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE6B770B82BDC3&compId=MBD Test tif&accessMode=r&authId=CN%3DXCA&expiration=20171026194823&secKey=MIH5BgkqhkiG9w0BBwKggeswgegCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGByDCBxQIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0N1owIwYJKoZIhvcNAQkEMRYEFPjGQixoYn%2BiaKzLVZDO%2FALSCu0CMAkGByqGSM44BAMELzAtAhUAjM1Q58Df6HXTFhLrS%2FH07ByaE5kCFFP%2BtasS4KAowq8pHJL8Ah3RvI2g"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20gif',AttachmentGuid='368107720D021ED7AECE6B770B831DC3')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20gif',AttachmentGuid='368107720D021ED7AECE6B770B831DC3')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-6B6154949DC3","Component":"MBD Test gif","AttachmentGuid":"368107720D021ED7AECE6B770B831DC3","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/MBD Test gif?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE6B770B831DC3&compId=MBD Test gif&accessMode=r&authId=CN%3DXCA&expiration=20171026194823&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0N1owIwYJKoZIhvcNAQkEMRYEFFnaRq%2BvqGvHfTcJGyErfrvBXMnDMAkGByqGSM44BAMELjAsAhRTr5WpEyVCdLC77J208YIDVIQDYAIUVEc%2BKcUOaH2J7qdhvh24f%2BMWf4s%3D"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20png',AttachmentGuid='368107720D021ED7AECE6B770B837DC3')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseAttachmentSet(Component='MBD%20Test%20png',AttachmentGuid='368107720D021ED7AECE6B770B837DC3')","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseAttachment"},"CaseGuid":"36810772-0D02-1ED7-AECE-6B6154949DC3","Component":"MBD Test png","AttachmentGuid":"368107720D021ED7AECE6B770B837DC3","Class":"CRM_P_CASE","DocumentUrl":"http://SAPXCA.SASKPOWER.SK.CA:8000/sap/bc/contentserver/100/MBD Test png?get&pVersion=0046&contRep=CRMCASE&docId=368107720D021ED7AECE6B770B837DC3&compId=MBD Test png&accessMode=r&authId=CN%3DXCA&expiration=20171026194823&secKey=MIH5BgkqhkiG9w0BBwKggeswgegCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGByDCBxQIBATAaMA4xDDAKBgNVBAMTA1hDQQIICiAXBCYCOAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE3MTAyNjE3NDc0N1owIwYJKoZIhvcNAQkEMRYEFDA0K41q7CQn7kvRM5XIoGFfc3sMMAkGByqGSM44BAMELzAtAhQBwxMLxhfeTqsW71nsZPVV9vXAFgIVAJePMFvgVI67Vu8qA4LEe9ydIv07"}]},"CaseToCaseNotes":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-6B6154949DC3',NoteLineNumber=1)","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZCRM_INQUIRYRESPONSE_SRV/CaseNotesSet(CaseGuid=guid'36810772-0D02-1ED7-AECE-6B6154949DC3',NoteLineNumber=1)","type":"ZCRM_INQUIRYRESPONSE_SRV.CaseNotes"},"CaseGuid":"36810772-0D02-1ED7-AECE-6B6154949DC3","NoteLineNumber":1,"NoteHeader":"Customer Message              ZPIIRA              10/26/2017  11:31:03","NoteContent":"Report Meter Box Damage<br>MBD Test message - MR2<br>"}]}}]}};
			return resultJSON.d.results;
		} else {
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.open("GET", url, true);
			console.log(url);
			var d = new Date();
			if (!toDate) {
				toDate = this.getFormattedDate(d);
			}
			xmlhttp.setRequestHeader("dateto", toDate + "235959");
			
			if (!fromDate) {
				d = new Date(d.setDate(d.getDate() - this.DEFAULTRANGE));
				fromDate = this.getFormattedDate(d);
			}
			xmlhttp.setRequestHeader("datefrom", fromDate + "000000");
			xmlhttp.setRequestHeader("X-CSRF-Token", "Fetch");

			// ****************** envelope *******************
			var body = '<?xml version="1.0" encoding="UTF-8"?>'
					+ '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">'
					+ '<content type="application/xml">'
					+ '<m:properties><d:DeviceType>iPad</d:DeviceType></m:properties></content></entry>';
			// ****************** envelope *******************

			var _this = this;
			var success = function(resultObject) {
				_this.token = xmlhttp.getResponseHeader("x-csrf-token");
				try {
					var resultJSON = JSON.parse(this.responseText);
					if (resultJSON.d && resultJSON.d.results) {
						onSuccess(resultJSON.d.results);
					} else {
						onSuccess({});
					}
				} catch(e) {
					onSuccess({});
				}
			};

			var failed = function(error) {
				console.log("Failed on dataManager.getNotifications: " + url);
				onFailed(error)
			};

			xmlhttp.addEventListener("load", success, false);
			xmlhttp.addEventListener("error", failed, false);
			xmlhttp.send(body);
		}
	},

	/**
	 * Get notifications
	 * 
	 * @param {callBack}
	 *            onSuccess
	 * @param {callBack}
	 *            onFailed
	 * @param {JSON}
	 *            formModel
	 * @memberof app.assets.dataManager
	 */
	setNotifications : function(onSuccess, onFailed, formModel, reason, mode ) {
		var _this = this;
		var done = function() {
			console.log("Set for: " + formModel.CaseGuid);
			var xmlhttp = new XMLHttpRequest();
			
			var url = _this.PUTURL.replace("GUIDVAR", formModel.CaseGuid);
			if (_this.SIMULATEFIORI) {
				url = "http://saphgx.saskpower.sk.ca:8040" + url;
			}
			
			console.log(url);
			xmlhttp.open("PUT", url, true);
			
			xmlhttp.setRequestHeader("Accept",
			"application/xml,application/atom+xml");
			xmlhttp.setRequestHeader("Content-Type",
			"application/json;charset=UTF-8");
			xmlhttp.setRequestHeader("X-CSRF-Token", _this.token);
			
			var onLoad = function postCallback() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					onSuccess();
				} else {
					var returnResponse = xmlhttp.response || (xmlhttp.status + " : " + xmlhttp.statusText);
					if (xmlhttp.status == 204) {
						onSuccess();
					} else {
						onFailed(returnResponse);															
					}
				} 
			}
			
			bodyJSON = _this.formModelToNotificationJSON(formModel, reason, mode);
			xmlhttp.addEventListener("load", onLoad, false);
			xmlhttp.addEventListener("error", onFailed, false);
			var body = JSON.stringify(bodyJSON);
			console.log(bodyJSON);
			xmlhttp.send(body);
		};
		
		// Use this to get new token
		this.updateToken(done,onFailed);
	},
	
	/**
	 * Get notifications
	 * 
	 * @param {callBack}
	 *            onSuccess
	 * @param {callBack}
	 *            onFailed
	 * @param {JSON}
	 *            formModel
	 * @memberof app.assets.dataManager
	 */
	sendEmail : function(onSuccess, onFailed, formModel, json) {
		console.log("Send for: " + formModel.CaseGuid);
		var xmlhttp = new XMLHttpRequest();

		var url = this.SENDURL.replace("GUIDVAR", formModel.CaseGuid);
		if (this.SIMULATEFIORI) {
			url = "http://saphgx.saskpower.sk.ca:8040" + url;
		}

		console.log(url);
		xmlhttp.open("PUT", url, true);
		xmlhttp.setRequestHeader("Accept", "application/xml,application/atom+xml");
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.setRequestHeader("X-CSRF-Token", this.token);

		var onLoad = function postCallback() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				onSuccess();
			} else {
				var returnResponse = xmlhttp.response || (xmlhttp.status + " : " + xmlhttp.statusText);
				if (xmlhttp.status == 204) {
					onSuccess();
				} else {
					onFailed(returnResponse);															
				}
			} 
		}

		var sendJSON = {
				"d":{
					"CaseGuid" : formModel.CaseGuid,
					"EmailBody" : "<HTML>body</HTML>".replace("body", json.body),
					"EmailSubject" : json.subject,
					"EmailTo" : formModel.CustomerEmail
					  }
					}

		xmlhttp.addEventListener("load", onLoad, false);
		xmlhttp.addEventListener("error", onFailed, false);
		var body = JSON.stringify(sendJSON);
		console.log(sendJSON);
		xmlhttp.send(body);
	},

	/**
	 * Format model to appropriate get format
	 * 
	 * @param {JSON}
	 *            formModel
	 * @memberof app.assets.dataManager
	 */
	formModelToNotificationJSON : function(formModel, reason, mode) {
		var result = {
			"CaseGuid" : formModel.CaseGuid
		};
		var unchangedModel = formModel.unchanged;
		
		if(!mode || (mode && mode == 1)) {
			if (formModel.Processor
					&& formModel.Processor != formModel.unchanged.Processor) {
				result.Processor = formModel.Processor;
			}
			
			if (formModel.StatOrderno
					&& formModel.StatOrderno != formModel.unchanged.StatOrderno) {
				result.StatOrderno = formModel.StatOrderno;
			}
			
			if (formModel.Priority
					&& formModel.Priority != formModel.unchanged.Priority) {
				result.Priority = formModel.Priority;
			}
			
			if(reason) {
				result.ReasonCode = reason;
			}
		}
		
		if(!mode || (mode && mode == 2)) {
			if (formModel.Category
					&& formModel.Category != formModel.unchanged.Category) {
				result.Category = formModel.Category;
			}
			
			if (formModel.SubCategory
					&& formModel.SubCategory != formModel.unchanged.SubCategory) {
				result.SubCategory = formModel.SubCategory;
				result.Category = formModel.Category;
			}			
		}
		
		if(!mode || (mode && mode == 3)) {
			if (formModel.newNotes) {
				if (formModel.newNotes.note.NoteTitle) {
					result.NoteTitle = formModel.newNotes.note.NoteTitle;
				}
				
				if (formModel.newNotes.note.NoteText) {
					result.NoteText = formModel.newNotes.note.NoteText;
				}
				
				if (formModel.newNotes.note.NoteType) {
					result.NoteType = formModel.newNotes.note.NoteType;
				}
			}			
		}

		return {
			"d" : result
		};
	},

	/**
	 * Set test to "No results were found" if no results are in set else set to
	 * "All Items(<# of search results>)"
	 * 
	 * @function getResultText
	 * @memberof app.components.main.main
	 */
	getResultText : function(resultSet) {
		var result = "Cases (0)";
		if (resultSet) {
			result = result.replace("0", resultSet.length);
		}
		return result;
	},

	/**
	 * Returns formatted date in form of "yyyyMMdd" (ie. "20160201")
	 * 
	 * @param {date}
	 *            d
	 * @function getFormattedDate
	 * @memberof app.components.main.main
	 */
	getFormattedDate : function(d) {
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var day = d.getDate();
		if (day < 10) {
			day = "0" + day;
		}

		return "" + year + "" + month + "" + day;
	},

	/**
	 * Set tool tip for notification
	 * 
	 * @param {NotificationArray}
	 *            resultSet
	 * @function setToolTip
	 * @memberof app.components.main.main
	 */
	setToolTip : function(resultSet) {
		var data;
		for (var i = 0; i < resultSet.length; i++) {
			resultSet[i].tooltip = "" + resultSet[i].CaseTitle + " - "
					+ resultSet[i].ExtKey;
			for (var n = 0; n < resultSet[i].CaseToCaseNotes.results.length; n++) {
				this.updateNotes(resultSet[i].CaseToCaseNotes.results[n]);
			}

			for (var m = 0; m < resultSet[i].CaseToCaseAttachment.results.length; m++) {
				resultSet[i].CaseToCaseAttachment.results[m].anchor = "<a target='_blank' href='URL'>LINKSHORT</a>"
						.replace(
								"URL",
								resultSet[i].CaseToCaseAttachment.results[m].DocumentUrl);
				resultSet[i].CaseToCaseAttachment.results[m].anchor = resultSet[i].CaseToCaseAttachment.results[m].anchor
						.replace(
								"LINKSHORT",
								resultSet[i].CaseToCaseAttachment.results[m].Component);
			}
		}
		return resultSet;
	},

	/**
	 * Update note with NoteContentUpdated and customerClass, given NoteContent
	 * and NoteHeader
	 * 
	 * @function updateNotes
	 * @param {note} -
	 *            resultSet[i].CaseToCaseNotes.results[n]
	 * @memberof app.components.main.main
	 */
	updateNotes : function(note) {
		note.NoteContentUpdated = note.NoteContent.replace(/<br>/g, "\n");
		note.customerClass = note.NoteHeader.indexOf("Customer ") > -1 ? "customerNote"
				: "internalNote";
	},

	/**
	 * Get notification id from tool tip. Assumption: tool tip was generated
	 * from dataManager so the format is static
	 * 
	 * @function toolTipToNotificationID
	 * @memberof app.components.main.main
	 */
	toolTipToNotificationID : function(toolTip) {
		if (!toolTip) {
			return "";
		}
		var data = toolTip.split(" ");
		return data[data.length - 1];
	}
};