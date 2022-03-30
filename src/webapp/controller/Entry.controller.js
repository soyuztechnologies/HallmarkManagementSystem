sap.ui.define([
	"victoria/controller/BaseController",
	"victoria/models/models",
	'sap/m/MessageToast'
], function (Controller, Models, MessageToast) {
	"use strict";

	return Controller.extend("victoria.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf victoria.view.View1
		 */
		onInit: function () {
			//var oModel = Models.createFruitModel();
			//sap.ui.getCore().setModel(oModel);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			this.oRouter.getRoute("Entry").attachPatternMatched(this._matchedHandler, this);
			// this.getOwnerComponent().getModel("appView").setProperty("/headerVisible",true);
		},

		_matchedHandler: function (oEvent) {
			// debugger;
			this.getView().getModel("appView").setProperty("/headerVisible", true)
			this.getView().getModel("appView").setProperty("/NewEntry", false)
			this.getView().getModel('local').setProperty("/Visible", false);
			if (!this.getView().getModel("local").getProperty("/CurrentUser")) {
				window.top.location.href = "/";
			}
			var that = this;
			if (!this.getView().getModel('local').getProperty("/newRecords")) {
				$.get('/EntityMax').done(function (data) {
					// debugger;
					var refNum = data
					var oSplitData = {
						"RefNo": refNum,
						"Date": new Date(),
						"Name": "",
						"MobileNo": "",
						"Logo": "",
						"DeliveryBy": "",
						"Item": "",
						"Weight": 0,
						"NWgt": "gm",
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
			}

		},
		onMobNuChange: function (oEvent) {
			// debugger;
			var mobilenum = oEvent.getSource().getProperty('value').length;
			if (mobilenum !== 10) {
				MessageToast.show('Mobile number must have 10 digits')
			}
		},
		onTotalChange: function (oEvent) {
			debugger;
			var marketRate = oEvent.getParameter('value');
			this.getView().getModel('local').setProperty("/newRecords/TotalPcs", marketRate);
			this.totalCalCulater();
		},
		omRateChange: function (oEvent) {
			debugger;
			var marketRate = oEvent.getParameter('value');
			this.getView().getModel('local').setProperty("/newRecords/OMRate", marketRate);
			this.getView().getModel('local').setProperty("/newRecords/MarketRate", 0);
			this.totalCalCulater();
		},
		mrkRtChange: function (oEvent) {
			debugger;
			var marketRate = oEvent.getParameter('value');
			this.getView().getModel('local').setProperty("/newRecords/OMRate", 0)
			this.getView().getModel('local').setProperty("/newRecords/MarketRate", marketRate);
			this.totalCalCulater();
		},
		totalCalCulater: function () {
			var totalPcs = parseInt(this.getView().getModel('local').getProperty("/newRecords/TotalPcs"));
			var OMRate = parseInt(this.getView().getModel('local').getProperty("/newRecords/OMRate"));
			var marketRate = parseInt(this.getView().getModel('local').getProperty("/newRecords/MarketRate"));
			var total = 0;
			if (marketRate > 0) {
				total = totalPcs * marketRate;
			}
			else if (OMRate > 0) {
				total = totalPcs * OMRate;
			}
			this.getView().getModel('local').setProperty("/newRecords/Total", total);
		},
		onUpdateForm: function () {
			debugger;
			var oData = this.getView().getModel('local').getProperty('/newRecords');
			// $.post('/api/Entrys',oData).done(function(){
			// 	debugger;
			// 	MessageToast.show("saved successfully");
			// });
			var that = this;
			var token = this.getView().getModel("local").getProperty("/AuthorizationToken");
			var method="POST"
			if(oData.id){
				method = "PATCH"
				delete oData.__metadata;

			}
			$.ajax("/api/Entrys?access_token="+token, {
				type: method,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
				data: JSON.stringify(oData),
				success: function (data, status, xhr) {
					debugger;
					if(method==="POST"){
						sap.m.MessageToast.show("Data Added Successfully");
					}
					else{
						sap.m.MessageToast.show("Data Updated Successfully")
					}
					
					that.oRouter.navTo("View1");
					var oTable = that.getView().byId('idEntryTable').getBinding('items');
					oTable.refresh();
				},
				error: function (jqXhr, textStatus, errorMessage) {
					debugger;
				}
				
			});
			
		},
		onSelectCheckBox: function (oEvent){
			debugger;
               var getSelected = oEvent.getSource().getSelected();
			   if(getSelected == true){
				this.getView().getModel('local').setProperty("/Visible", true);
			   }else{
				this.getView().getModel('local').setProperty("/Visible", false);
			   }
		}
	});

});
