sap.ui.define([
	"victoria/controller/BaseController",
	"victoria/models/models",
	"sap/ui/model/Filter",
	'sap/ui/model/FilterOperator',
	"sap/ui/model/odata/type/DateTimeOffset"
], function(BaseController,
	models,
	Filter,
	FilterOperator,
	DateTimeOffset ) {
	"use strict";

	return BaseController.extend("victoria.controller.View1", {
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
			// debugger;
			this.getView().getModel("appView").setProperty("/NewEntry", true);
			this.getView().getModel("appView").setProperty("/headerVisible",true);
			if(!this.getView().getModel("local").getProperty("/CurrentUser")){
				window.top.location.href = "/";
			}
			debugger;
            var todaysDate1 = new Date()
			todaysDate1.setHours(0, 0, 0, 0)
			var todaysDate2 = new Date()
			todaysDate2.setHours(23, 59, 59, 59)
			console.log(todaysDate1);
			console.log(todaysDate2);
			todaysDate1=this.ODataHelper.onTimeZone(todaysDate1);
			todaysDate2=this.ODataHelper.onTimeZone(todaysDate2);
			var oFilterTodayDate = new Filter("Date", FilterOperator.BT, todaysDate1 , todaysDate2);
			var oDeleted = new Filter("Deleted", FilterOperator.EQ, false);
			var oList = this.getView().byId('idEntryTable');
            oList.getBinding('items').filter([oFilterTodayDate,oDeleted]);
		},
		onEntryUpdate:function(oEvent){
			// debugger;
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
		openFilterPopup : function(){
			this.getDialog().open();
		},
		getDialog: function () {
            if (!this.oLocDialog) {
                this.oLocDialog = sap.ui.xmlfragment(this.getView().getId(),"victoria.Fragments.filterpopup" ,this);
                this.getView().addDependent(this.oLocDialog);
            }
            return this.oLocDialog;
        },
		onCancel : function () {
			this.getDialog().close();
		},
		onFireGo : function () {
			// debugger;
			var oDeleted = new Filter("Deleted", FilterOperator.EQ, false);
			var aFilter = [];
			aFilter.push(oDeleted);
            var sQuery5 = this.getView().byId('datePicker').getFrom();
            var sQuery6 = this.getView().byId('datePicker').getTo();
            if (sQuery5 && sQuery6) {
                var oDate1 = this.ODataHelper.onTimeZone(sQuery5);
                var oDate2 = this.ODataHelper.onTimeZone(sQuery6);
                var oFilter5 = new Filter("Date", FilterOperator.BT, oDate1, oDate2);
                aFilter.push(oFilter5);
            }
			var oList = this.getView().byId('idEntryTable');
            oList.getBinding('items').filter(aFilter);
			this.getDialog().close();
		},
		
		onPrint:function(oEvent){
			debugger;
			var oRowData = oEvent.getSource().getParent().getBindingContext().getObject();
			this.getView().getModel('local').setProperty('/printData', oRowData);
			this.getPrintDailog().open();
		// 	
		},
		onRowDelete:function(oEvent){
			debugger;
			var oRowData = oEvent.getSource().getParent().getBindingContext().getObject();
			oRowData.Deleted=true;
			var that = this;
			var token = this.getView().getModel("local").getProperty("/AuthorizationToken");
			$.ajax("/api/Entrys/"+oRowData.id+"?access_token="+token, {
				type: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				},
				data: JSON.stringify(oRowData),
				success: function (data, status, xhr) {
					debugger;
				
						sap.m.MessageToast.show("Deleted Successfully");
					
				
					var oTable = that.getView().byId('idEntryTable').getBinding('items');
					oTable.refresh();
				},
				error: function (jqXhr, textStatus, errorMessage) {
					debugger;
				}
				
			});
		// 	
		},
		getPrintDailog : function(){
			if (!this.oPrintDialog) {
                this.oPrintDialog = sap.ui.xmlfragment(this.getView().getId(),"victoria.Fragments.Printpopup" ,this);
                this.getView().addDependent(this.oPrintDialog);
            }
            return this.oPrintDialog;
		},
		onPrintCancel:function(){
			this.getPrintDailog().close();
		},
		onPrintOk : function(){
			var oData=this.getView().getModel('local').getProperty('/printData');
			// var form=`<p><strong>Ref No.&nbsp; &nbsp; &nbsp; &nbsp; : ${oData.RefNo}</strong></p>
			// <p><strong>Date&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : ${oData.Date}</strong></p>
			// <p><strong>Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : ${oData.Name}</strong></p>
			// <p><strong>Mobile&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: ${oData.MobileNo}</strong></p>
			// <p><strong>Logo&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : ${oData.Logo}</strong></p>
			// <p><strong>Delivery By : ${oData.DeliveryBy}</strong></p>
			// <p><strong>Item&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : ${oData.Item}</strong></p>
			// <p><strong>Weight&nbsp; &nbsp; &nbsp; &nbsp; : ${oData.Weight}</strong></p>
			// <p><strong>Wgt&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: ${oData.NWgt}</strong></p>
			// <p><strong>Total Pcs&nbsp; &nbsp; &nbsp;: ${oData.TotalPcs}</strong></p>`;
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
			
			.s1{font-size:17px;font-family:Carlito_5;font-weight:bold;color:#000;}
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
			this.getPrintDailog().close();
		},
		onItemPress:function(oEvent){
			// debugger;
			var oData=oEvent.getParameter('listItem').getBindingContext().getObject();
			this.getView().getModel('local').setProperty("/newRecords", oData);
			// debugger;
			this.oRouter.navTo("Entry");
		},
	

	});

});
