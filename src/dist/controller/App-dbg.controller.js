sap.ui.define([
	"victoria/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("victoria.controller.App", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf victoria.view.App
		 */
		onInit: function () {
			var oViewModel;
			oViewModel = new JSONModel({
				busy: true,
				delay: 0,
				layout: "OneColumn",
				previousLayout: "",
				actionButtonsInfo: {
					midColumn: {
						fullScreen: false
					}
				},
				logOut:false,
				headerVisible:false,
				NewEntry:true
			});
			this.setModel(oViewModel, "appView");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onHomePress:function(){
			this.oRouter.navTo("View1");
		},
		onNewEntry:function(){
			this.getView().getModel('local').setProperty("/newRecords", undefined);
			this.oRouter.navTo("Entry");
		},
	});
});
