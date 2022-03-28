sap.ui.define([
	"victoria/controller/BaseController",
	"victoria/models/models",
	'sap/m/MessageToast'
], function(Controller, Models , MessageToast) {
	"use strict";

	return Controller.extend("victoria.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf victoria.view.View1
		 */
		onInit: function() {
			//var oModel = Models.createFruitModel();
			//sap.ui.getCore().setModel(oModel);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		
			this.oRouter.getRoute("Entry").attachPatternMatched(this._matchedHandler, this);
			// this.getOwnerComponent().getModel("appView").setProperty("/headerVisible",true);
		},
		
		_matchedHandler:function(oEvent){
			// debugger;
			this.getView().getModel("appView").setProperty("/headerVisible",true)
			if(!this.getView().getModel("local").getProperty("/CurrentUser")){
				window.top.location.href = "/";
			}
			var that = this;
			$.get('/EntityMax').done(function(data){
				// debugger;
				var refNum = data
				var oSplitData = {
					"RefNo": refNum ,
					"Date": new Date(),
					"Name": "",
					"MobileNo": "",
					"Logo": "",
					"DeliveryBy": "",
					"Item": "",
					"Weight": 0,
					"NWgt": "",
					"TotalPcs": 0,
					"Address": "",
					"City": "",
					"PinCode": "",
					"Email": "",
					"ContactPerson": "",
					"OMRate": 0,
					"MarketRate": 0,
					"Total": 0,
				};
				that.getView().getModel('local').setProperty("/newRecords", oSplitData);
			});
		},
		onMobNuChange:function(oEvent){
			// debugger;
			var mobilenum = oEvent.getSource().getProperty('value').length;
			if (mobilenum !== 10){
				MessageToast.show('Mobile number must have 10 digits')
			}
		},
		omRateChange:function(oEvent){
			debugger;
			var marketRate = parseInt(this.getView().byId('idMarkRt').getProperty('value'));
			if(marketRate !== 0 ){
				omRate = 0 ;
			}
			else{
				var omRate = oEvent.getSource().getProperty('value');
			}
			this.getView().getModel('local').setProperty("/newRecords/OMRate", omRate)
		},
		mrkRtChange : function(oEvent){
			debugger;
			var omRt = parseInt(this.getView().byId('idOmRt').getProperty('value'));
			
			if(omRt == 0){
				var mrkrate = oEvent.getSource().getProperty('value');
			}else{
				var mrkrate = 0;
			}
			this.getView().getModel('local').setProperty("/newRecords/MarketRate", mrkrate);
		}
	});

});
