//write all Calls to Node Server Here CRUD Implementation
//The method callCRUD will be used to communicate to the backend returns the JS promise
//You can use the jQuery ajax or some other framework dependency to make REST Call
sap.ui.define([
	"jquery.sap.global"
], function (jQuery) {
	"use strict";

	return {
		callOData: function (oModel, sUrl, sMethod, oParameters, oPayload, BaseController) {
			return new Promise(function (resolve, reject) {

				var currentDate = new Date();
				// var currentUser = BaseController.getView().getModel("local").getProperty("/CurrentUser");
				var currentUser = BaseController.getModel("local").getProperty("/CurrentUser");
				if (sMethod === "POST") {
					oPayload.CreatedBy = currentUser;
					oPayload.ChangedBy = currentUser;
					oPayload.CreatedOn = currentDate;
					oPayload.ChangedOn = currentDate;
				}
				else if (sMethod === "PUT") {
					oPayload.ChangedBy = currentUser;
					oPayload.ChangedOn = currentDate;
				}

				if (!(oModel && sUrl && sMethod)) {
					reject("Invalid parameters passed");
				}
				if (!oParameters) {
					oParameters = {};
				}
				oModel.setUseBatch(false);
				switch (sMethod.toUpperCase()) {
					case "GET":
						oModel.read(sUrl, {
							async: true,
							filters: oParameters.filters,
							sorters: oParameters.sorters,
							success: function (oData, oResponse) {
								// debugger;
								resolve(oData);
							},
							error: function (oError) {
								reject(oError);
							}
						});
						break;
					case "POST":
						oModel.create(sUrl, oPayload, {
							async: true,
							filters: oParameters.filters,
							sorters: oParameters.sorters,
							success: function (oData, oResponse) {
								resolve(oData);
							},
							error: function (oError) {
								reject(oError);
							}
						});
						break;
					case "PUT":
						oModel.update(sUrl, oPayload, {
							async: true,
							filters: oParameters.filters,
							sorters: oParameters.sorters,
							success: function (oData, oResponse) {
								debugger;
								resolve(oData);
							},
							error: function (oError) {
								debugger;
								reject(oError);
							}
						});
						break;
					case "DELETE":
						oModel.remove(sUrl, {
							async: true,
							filters: oParameters.filters,
							sorters: oParameters.sorters,
							success: function (oData, oResponse) {
								resolve(oData);
							},
							error: function (oError) {
								reject(oError);
							}
						});
						break;
					default:
						jQuery.sap.log.error("No case matched");
						break;
				}
			});
		},
		errorHandler: function (jqr, then) {
			then.getView().setBusy(false);
			// if (jqr === "abort") {
			// 	return;
			// }
			// var that = this;
			var type = typeof (jqr);
			switch (type) {
				case 'string':
					try {
						const text = JSON.parse(JSON.parse(jqr).text).error.message;
						if (text.value) {
							MessageBox.error(text.value);
						}
						else {
							MessageBox.error(text);
						}

					} catch (error) {
						if (jqr.includes('Session expired.') || jqr.includes('authenticated')) {
							sessionStorage.session_id = null;
							var oMessage = then.getModel("i18n").getProperty("SessionExpire");
							oMessage=oMessage?oMessage:"Session Expired.\nPlease login again.";
							MessageBox.error(oMessage, {
								actions: [MessageBox.Action.OK],
								onClose: function () {

									window.location.href = "/";
								}
							});
						}
						// else if (jqr.includes('User Not Found')) {
						// 	var oEmail = jqr.split(":")[1];
						// 	var oMessage = then.getModel("i18n").getProperty("notFoundUser");
						// 	// oMessage=oMessage.replace('"', '');
						// 	// var oEmail=then.getModel("appView").getProperty("/User");
						// 	oMessage = oMessage.replace("<login-email>", oEmail)
						// 	MessageBox.error(oMessage);
						// }
						else {
							MessageBox.error(jqr);
						}
					}

					break;
				case 'object':
					if (jqr.responseText) {
						MessageBox.error(jqr.responseText);
						break;
					}
					MessageBox.error(jqr.toString());
					break;
				default:
					MessageBox.error(jqr.toString());
					break;
			}
		},
	};
});
