sap.ui.define([
	"victoria/controller/BaseController"
], function(Controller) {
	"use strict";

	return Controller.extend("victoria.controller.MainApp", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf victoria.view.App
		 */
		//	onInit: function() {
		//
		//	},
		idleLogout: function() {
			var t;
			var that = this;
			window.onbeforeunload = function() {
				that.logOutApp("X");
			}

			window.onload = resetTimer;
			window.onmousemove = resetTimer;
			window.onmousedown = resetTimer; // catches touchscreen presses as well
			window.ontouchstart = resetTimer; // catches touchscreen swipes as well
			window.onclick = resetTimer; // catches touchpad clicks as well
			window.onkeypress = resetTimer;
			window.addEventListener('scroll', resetTimer, true); // improved; see comments

			function yourFunction() {
				// your function for too long inactivity goes here
				// e.g. window.location.href = 'logout.php';
				sap.m.MessageBox.alert("Page expired, please login again!");
				window.top.location.href = "/";
			}

			function resetTimer() {
				clearTimeout(t);
				t = setTimeout(yourFunction, 3600000); // time is in milliseconds
			}
		},
		onLogout: function() {
			this.logOutApp();
		},
		onInit: function() {

			//var oModel = Models.createFruitModel();
			//sap.ui.getCore().setModel(oModel);
			// this.resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			// this.idleLogout();
			this.oRouter =  this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("MainApp").attachPatternMatched(this._matchedHandler, this);

		},
		_matchedHandler:function(){
			// debugger;
			this.getView().getModel("appView").setProperty("/headerVisible",false);
		},
		onSubmit: function() {
			this.Login();
		},

		onLivePassword: function(oEvent) {
			console.log("Test")
		},

		Login: function(oEvent) {
			// this.navigation(data);
			// this.oRouter.navTo("View1");
			// return;
			var loginPayload = {
				"email": this.getView().byId("userid").getValue(),
				"password": this.getView().byId("pwd").getValue(),
			};
			var that = this;

			if (!loginPayload.email || !loginPayload.password) {
				sap.m.MessageBox.error("User/password cannot be empty");
				return; //--- Added - Swaroop
			}
			//


			$.post('/api/Users/login', loginPayload)
				.done(function(data, status) {
					debugger;
					that.getOwnerComponent().getModel("local").setProperty("/AuthorizationToken", data.id);
					that.getView().getModel().setHeaders({
						"Authorization": data.id
					});
					that.secureToken = data.id;
					that.getView().getModel("local").setProperty("/CurrentUser", data.userId);
					that.getView().getModel().setUseBatch(false);
					var that2 = that;
					var found = false;
					var AppUsers = [];				
					that.ODataHelper.callOData(that.getOwnerComponent().getModel(),
							"/AppUsers", "GET", {}, {}, that)
						.then(function(oData) {
							debugger;
							if (oData.results.length != 0) {
								for (var i = 0; i < oData.results.length; i++) {
									AppUsers[oData.results[i].TechnicalId] = oData.results[i];
									if (oData.results[i].TechnicalId === data.userId) {
										var role = oData.results[i].Role;
										that2.getView().getModel("local").setProperty("/Role", oData.results[i].Role);
										that2.getView().getModel("local").setProperty("/UserName", oData.results[i].UserName);
										found = true;
									} else {
										that2.getView().getModel("local").setProperty("/Authorization", "");

									}
								}
								that2.oRouter.navTo("View1");
							}
						})
						.catch(function(oError) {

						});
				})
				.fail(function(xhr, status, error) {
					sap.m.MessageBox.error("Login Failed, Please enter correct credentials");
				});
			
		},
	
		// 		onAfterRendering: function(){
		// 	this.UserInfoService = sap.ushell.Container.getService("UserInfo");
		// 	var that = this;
		// 	this.UserInfoService.getLanguageList().then(function(langJSON){
		// 		var oModel = new sap.ui.model.json.JSONModel();
		// 		oModel.setData(langJSON);
		// 		that.getView().setModel(oModel, "AvailableLanguages");
		//
		// 		var user = that.UserInfoService.getUser();
		// 		var userLanguage = user.getLanguage();
		//
		// 		var languageSelect = that.getView().byId("languageSelect");
		// 		languageSelect.setSelectedKey(userLanguage);
		// 	});
		// },

	

	});

});
