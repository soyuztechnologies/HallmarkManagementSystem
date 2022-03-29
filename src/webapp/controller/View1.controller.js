sap.ui.define([
	"victoria/controller/BaseController",
	"victoria/models/models"
], function(Controller, Models) {
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
			if (sap.ui.Device.system.phone) {
				this.getOwnerComponent().getModel("local").setProperty("/IsPhone", true);
			}
			this.oRouter.getRoute("View1").attachPatternMatched(this._matchedHandler, this);
			// this.getOwnerComponent().getModel("appView").setProperty("/headerVisible",true);
		},
		_matchedHandler:function(oEvent){
			debugger;
			this.getView().getModel("appView").setProperty("/headerVisible",true)
			if(!this.getView().getModel("local").getProperty("/CurrentUser")){
				window.top.location.href = "/";
			}
		},
		onEntryUpdate:function(oEvent){
			debugger;
			var totalCount=oEvent.getParameter("total");
			var sum=0;
			var oItems=oEvent.getSource().getItems();
			for (let index = 0; index < oItems.length; index++) {
				const element = oItems[index];
				sum=sum+parseInt(element.getCells()[10].getText());
			}
			this.getView().getModel("local").setProperty("/TotalRowCount",sum);
			// [0].getCells()[10].getText()
		},
		onPrint:function(oEvent){
			debugger; 	
			var oData=oEvent.getSource().getBindingContext().getObject();
			var form=`<!DOCTYPE html>
			<html lang="en">
			<head>
			<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
			<meta charset="utf-8" />
			</head>
			
			<body style="margin: 0;">
			
			<div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 909px; height: 1286px;">
			
			<!-- Begin shared CSS values -->
			<style class="shared-css" type="text/css" >
			.t {
				transform-origin: bottom left;
				z-index: 2;
				position: absolute;
				white-space: pre;
				overflow: visible;
				line-height: 1.5;
			}
			.text-container {
				white-space: pre;
			}
			@supports (-webkit-touch-callout: none) {
				.text-container {
					white-space: normal;
				}
			}
			</style>
			<!-- End shared CSS values -->
			
			
			<!-- Begin inline CSS -->
			<style type="text/css" >
			
			#t1_1{left:110px;bottom:1152px;letter-spacing:-0.09px;}
			#t2_1{left:220px;bottom:1152px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#t3_1{left:110px;bottom:1118px;letter-spacing:-0.11px;}
			#t4_1{left:220px;bottom:1118px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#t5_1{left:110px;bottom:1083px;letter-spacing:-0.1px;}
			#t6_1{left:220px;bottom:1083px;letter-spacing:-0.1px;word-spacing:0.01px;}
			#t7_1{left:110px;bottom:1049px;letter-spacing:-0.1px;}
			#t8_1{left:220px;bottom:1049px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#t9_1{left:110px;bottom:1015px;letter-spacing:-0.09px;}
			#ta_1{left:220px;bottom:1015px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#tb_1{left:110px;bottom:980px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#tc_1{left:220px;bottom:980px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#td_1{left:110px;bottom:946px;letter-spacing:-0.1px;}
			#te_1{left:220px;bottom:946px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#tf_1{left:110px;bottom:911px;letter-spacing:-0.08px;}
			#tg_1{left:220px;bottom:911px;letter-spacing:-0.09px;word-spacing:0.01px;}
			#th_1{left:110px;bottom:877px;letter-spacing:-0.1px;word-spacing:0.01px;}
			#ti_1{left:220px;bottom:877px;letter-spacing:-0.1px;word-spacing:0.01px;}
			#tj_1{left:110px;bottom:843px;letter-spacing:-0.06px;word-spacing:-0.16px;}
			#tk_1{left:220px;bottom:843px;letter-spacing:-0.08px;}
			
			.s1{font-size:17px;font-family:Carlito_5;color:#000;}
			</style>
			<!-- End inline CSS -->
			
			<!-- Begin embedded font definitions -->
			<style id="fonts1" type="text/css" >
			
			@font-face {
				font-family: Carlito_5;
				src: url("fonts/Carlito_5.woff") format("woff");
			}
			
			</style>
			<!-- End embedded font definitions -->
			
			<!-- Begin page background -->
			<div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>
			<div id="pg1" style="-webkit-user-select: none;"><object width="909" height="1286" data="1/1.svg" type="image/svg+xml" id="pdf1" style="width:909px; height:1286px; -moz-transform:scale(1); z-index: 0;"></object></div>
			<!-- End page background -->
			
			
			<!-- Begin text definitions (Positioned/styled in CSS) -->
			<div class="text-container"><span id="t1_1" class="t s1">Ref No. </span><span id="t2_1" class="t s1">: ${oData.RefNo} </span>
			<span id="t3_1" class="t s1">Date </span><span id="t4_1" class="t s1">: ${oData.Date} </span>
			<span id="t5_1" class="t s1">Name </span><span id="t6_1" class="t s1">: ${oData.Name} </span>
			<span id="t7_1" class="t s1">Mobile </span><span id="t8_1" class="t s1">: ${oData.MobileNo} </span>
			<span id="t9_1" class="t s1">Logo </span><span id="ta_1" class="t s1">: ${oData.Logo} </span>
			<span id="tb_1" class="t s1">Delivery By </span><span id="tc_1" class="t s1">: ${oData.DeliveryBy} </span>
			<span id="td_1" class="t s1">Item </span><span id="te_1" class="t s1">: ${oData.Item} </span>
			<span id="tf_1" class="t s1">Weight </span><span id="tg_1" class="t s1">: ${oData.Weight} </span>
			<span id="th_1" class="t s1">N. Wgt </span><span id="ti_1" class="t s1">: ${oData.NWgt} </span>
			<span id="tj_1" class="t s1">Total Pcs </span><span id="tk_1" class="t s1">: ${oData.TotalPcs} </span></div>
			<!-- End text definitions -->
			
			
			</div>
			</body>
			</html>
			`;
		// 	var form=`<form>
		// 	<label>Ref No.:</label>
		// 	<label>${oData.RefNo}</label><br>
		// 	<label>Date:</label>
		// 	<label>${oData.Date}</label><br>
		// 	<label>Name:</label>
		// 	<label>${oData.Name}</label><br>
		// 	<label>Mobile:</label>
		// 	<label>${oData.MobileNo}</label><br>
		// 	<label>Logo:</label>
		// 	<label>${oData.Logo}</label><br>
		// 	<label>Delivery By:</label>
		// 	<label>${oData.DeliveryBy}</label><br>
		// 	<label>Item:</label>
		// 	<label>${oData.RefNo}</label><br>
		// 	<label>Weight:</label>
		// 	<label>${oData.Weight}</label><br>
		// 	<label>N. Wgt:</label>
		// 	<label>${oData.NWgt}</label><br>
		// 	<label>Total Pcs:</label>
		// 	<label>${oData.TotalPcs}</label><br>
		//   </form>`;
		  var random = Math.floor(Math.random() * 10000);
				var myWindow = window.open("", "PrintWindow" + random, "width=288,height=288");
				myWindow.document.write(form);
				// for (var i = 0; i < arrayRemoveFromPrint.length; i++) {
				// 	var coll = myWindow.document.getElementsByClassName(arrayRemoveFromPrint[i]);
				// 	for (var j = 0; j < coll.length; j++) {
				// 		coll[j].style.display = "none";
				// 	}
				// }
				myWindow.document.close();
				myWindow.focus();
				setTimeout(function() {
					myWindow.print();
				}, 1000);

				myWindow.stop();
		},
		onItemPress:function(oEvent){
			debugger;
			var oData=oEvent.getParameter('listItem').getBindingContext().getObject();
			this.getView().getModel('local').setProperty("/newRecords", oData);
			debugger;
			this.oRouter.navTo("Entry");
		},
		onSuggest: function(oEvent){
			var suggestVal = oEvent.getParameter("suggestValue");
			//oEvent.getSource().suggest();
			// var oFilterName = new sap.ui.model.Filter(
			// 	"name",
			// 	sap.ui.model.FilterOperator.Contains,
			// 	suggestVal);
			// oEvent.getSource().getBinding("suggestionItems").filter(oFilterName);

		},
		onDelete: function(oEvent){
			var oList = oEvent.getSource();
			var oItemToBeDeleted = oEvent.getParameter("listItem");
			oList.removeItem(oItemToBeDeleted);
		},
		onSelectItem: function(oEvent){

			var oListItem = oEvent.getParameter("listItem");
			var sPath = oListItem.getBindingContextPath();
			var viewId = oListItem.getId().split("--")[oListItem.getId().split("--").length - 1];
			this.oRouter.navTo(viewId);
			// sap.m.SplitApp.hideMaster();
			var oList = oEvent.getSource();
			var oSplitApp = oList.getParent().getParent().getParent().getParent();
			// var oSplitApp=this.getOwnerComponent()._oSplitApp;
			// oSplitApp.hideMaster();
			// oSplitApp.showMaster();
			if (!sap.ui.Device.phone) {
			/* on phone there is no master-detail pair,
			 but a single navContainer => so navigate within this navContainer: */
			// var masterPage = this.getView().byId('idSplitApp');
			// oSplitApp.to(masterPage.getId());
			oSplitApp.hideMaster();
		} else {
			oSplitApp.showMaster();
		}
			// //Step 1: get the selected item from list and its path of element
			// //select row of the table


			// //Step 2: bind the selected element path with whole of next view
			// //binding the simple form with element selected using element binding
			// var oView2 = sap.ui.getCore().byId("idView2");
			// oView2.bindElement(sPath);

			// //step 3: navigate to next view
			// this.onNext();
			// //
		},
		onSearch: function(oEvent){
			//
			var searchStr = oEvent.getParameter("query");
			if(!searchStr){
				searchStr = oEvent.getParameter("newValue");
			}
			var oFilterName = new sap.ui.model.Filter(
				"name",
				sap.ui.model.FilterOperator.Contains,
				searchStr);
			var oFilterTyp = new sap.ui.model.Filter(
				"nature",
				sap.ui.model.FilterOperator.Contains,
				searchStr
			);
			var oFilter = new sap.ui.model.Filter({
				filters: [oFilterTyp, oFilterName],
				and: false
			});
			//Will this be an AND between these 2 filters or an OR operation?
			var aFilter = [oFilter];
			var oList = this.getView().byId("idFruitsList");
			oList.getBinding("items").filter(aFilter);

		},

		onNext: function(){

			//step 1: Get the object of the app control (parent for both view)
			var oApp = sap.ui.getCore().byId("idApp");
			//step 2: call the method .to and pass view id to which we wanna navigate
			oApp.to("idView2");

		},
		onOrange: function(){
			alert("welcome to orange");
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf victoria.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf victoria.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf victoria.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});
