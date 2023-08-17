sap.ui.define(["victoria/controller/BaseController","victoria/models/models","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/odata/type/DateTimeOffset"],function(t,e,n,i,s){"use strict";return t.extend("victoria.controller.View1",{onInit:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);if(sap.ui.Device.system.phone){this.getOwnerComponent().getModel("local").setProperty("/IsPhone",true)}this.oRouter.getRoute("View1").attachPatternMatched(this._matchedHandler,this)},_matchedHandler:function(t){this.getView().getModel("appView").setProperty("/NewEntry",true);this.getView().getModel("appView").setProperty("/headerVisible",true);if(!this.getView().getModel("local").getProperty("/CurrentUser")){window.top.location.href="/"}var e=new Date;e.setHours(0,0,0,0);var s=new Date;s.setHours(23,59,59,59);e=this.ODataHelper.onTimeZone(e);s=this.ODataHelper.onTimeZone(s);var o=new n("Date",i.BT,e,s);var a=new n("Deleted",i.EQ,false);var p=this.getView().byId("idEntryTable");p.getBinding("items").filter([o,a]);this.getView().getModel("local").setProperty("/Visible",false)},onEntryUpdate:function(t){var e=t.getParameter("total");var n=0;var i=t.getSource().getItems();for(let t=0;t<i.length;t++){const e=i[t];n=n+parseInt(e.getCells()[10].getText())}this.getView().getModel("local").setProperty("/TotalRowCount",n)},openFilterPopup:function(){this.getDialog().open()},getDialog:function(){if(!this.oLocDialog){this.oLocDialog=sap.ui.xmlfragment(this.getView().getId(),"victoria.fragments.filterpopup",this);this.getView().addDependent(this.oLocDialog)}return this.oLocDialog},onCancel:function(){this.getDialog().close()},onFireGo:function(){var t=new n("Deleted",i.EQ,false);var e=[];e.push(t);var s=this.getView().byId("datePicker").getFrom();var o=this.getView().byId("datePicker").getTo();if(s&&o){var a=this.ODataHelper.onTimeZone(s);var p=this.ODataHelper.onTimeZone(o);var r=new n("Date",i.BT,a,p);e.push(r)}var l=this.getView().byId("idEntryTable");l.getBinding("items").filter(e);this.getDialog().close()},onPrint:function(t){var e=t.getSource().getParent().getBindingContext().getObject();this.getView().getModel("local").setProperty("/printData",e);this.getPrintDailog().open()},onRowDelete:function(t){var e=t.getSource().getParent().getBindingContext().getObject();e.Deleted=true;var n=this;var i=this.getView().getModel("local").getProperty("/AuthorizationToken");$.ajax("/api/Entrys/"+e.id+"?access_token="+i,{type:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+i},data:JSON.stringify(e),success:function(t,e,i){sap.m.MessageToast.show("Deleted Successfully");var s=n.getView().byId("idEntryTable").getBinding("items");s.refresh()},error:function(t,e,n){}})},getPrintDailog:function(){if(!this.oPrintDialog){this.oPrintDialog=sap.ui.xmlfragment(this.getView().getId(),"victoria.Fragments.Printpopup",this);this.getView().addDependent(this.oPrintDialog)}return this.oPrintDialog},onPrintCancel:function(){this.getPrintDailog().close()},onPrintOk:function(){var t=this.getView().getModel("local").getProperty("/printData");var e=t.Date,n=[e.getDate(),e.getMonth()+1,e.getFullYear()].join("/")+" "+[e.getHours(),e.getMinutes()].join(":");var i=`<!DOCTYPE html>\n\t\t\t<html lang="en">\n\t\t\t<head>\n\t\t\t<meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n\t\t\t<meta charset="utf-8" />\n\t\t\t</head>\n\t\t\t\n\t\t\t<body style="margin: 0;">\n\t\t\t\n\t\t\t<div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 909px; height: 1286px;">\n\t\t\t\n\t\t\t\x3c!-- Begin shared CSS values --\x3e\n\t\t\t<style class="shared-css" type="text/css" >\n\t\t\t.t {\n\t\t\t\ttransform-origin: bottom left;\n\t\t\t\tz-index: 2;\n\t\t\t\tposition: absolute;\n\t\t\t\twhite-space: pre;\n\t\t\t\toverflow: visible;\n\t\t\t\tline-height: 1.5;\n\t\t\t}\n\t\t\t.text-container {\n\t\t\t\twhite-space: pre;\n\t\t\t}\n\t\t\t@supports (-webkit-touch-callout: none) {\n\t\t\t\t.text-container {\n\t\t\t\t\twhite-space: normal;\n\t\t\t\t}\n\t\t\t}\n\t\t\t</style>\n\t\t\t\x3c!-- End shared CSS values --\x3e\n\t\t\t\n\t\t\t\n\t\t\t\x3c!-- Begin inline CSS --\x3e\n\t\t\t<style type="text/css" >\n\t\t\t\n\t\t\t#t1_1{left:110px;bottom:1152px;letter-spacing:-0.09px;}\n\t\t\t#t2_1{left:220px;bottom:1152px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#t3_1{left:110px;bottom:1118px;letter-spacing:-0.11px;}\n\t\t\t#t4_1{left:220px;bottom:1118px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#t5_1{left:110px;bottom:1083px;letter-spacing:-0.1px;}\n\t\t\t#t6_1{left:220px;bottom:1083px;letter-spacing:-0.1px;word-spacing:0.01px;}\n\t\t\t#t7_1{left:110px;bottom:1049px;letter-spacing:-0.1px;}\n\t\t\t#t8_1{left:220px;bottom:1049px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#t9_1{left:110px;bottom:1015px;letter-spacing:-0.09px;}\n\t\t\t#ta_1{left:220px;bottom:1015px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#tb_1{left:110px;bottom:980px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#tc_1{left:220px;bottom:980px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#td_1{left:110px;bottom:946px;letter-spacing:-0.1px;}\n\t\t\t#te_1{left:220px;bottom:946px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#tf_1{left:110px;bottom:911px;letter-spacing:-0.08px;}\n\t\t\t#tg_1{left:220px;bottom:911px;letter-spacing:-0.09px;word-spacing:0.01px;}\n\t\t\t#th_1{left:110px;bottom:877px;letter-spacing:-0.1px;word-spacing:0.01px;}\n\t\t\t#ti_1{left:220px;bottom:877px;letter-spacing:-0.1px;word-spacing:0.01px;}\n\t\t\t#tj_1{left:110px;bottom:843px;letter-spacing:-0.06px;word-spacing:-0.16px;}\n\t\t\t#tk_1{left:220px;bottom:843px;letter-spacing:-0.08px;}\n\t\t\t\n\t\t\t.s1{font-size:17px;font-family:sans-serif;font-weight:bold;color:#000;}\n\t\t\t</style>\n\t\t\t\x3c!-- End inline CSS --\x3e\n\t\t\t\n\t\t\t\x3c!-- Begin embedded font definitions --\x3e\n\t\t\t<style id="fonts1" type="text/css" >\n\t\t\t\n\t\t\t@font-face {\n\t\t\t\tfont-family: Carlito_5;\n\t\t\t\tsrc: url("fonts/Carlito_5.woff") format("woff");\n\t\t\t}\n\t\t\t\n\t\t\t</style>\n\t\t\t\x3c!-- End embedded font definitions --\x3e\n\t\t\t\n\t\t\t\x3c!-- Begin page background --\x3e\n\t\t\t<div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>\n\t\t\t<div id="pg1" style="-webkit-user-select: none;"><object width="909" height="1286" data="1/1.svg" type="image/svg+xml" id="pdf1" style="width:909px; height:1286px; -moz-transform:scale(1); z-index: 0;"></object></div>\n\t\t\t\x3c!-- End page background --\x3e\n\t\t\t\n\t\t\t\n\t\t\t\x3c!-- Begin text definitions (Positioned/styled in CSS) --\x3e\n\t\t\t<div class="text-container"><span id="t1_1" class="t s1">Ref No. </span><span id="t2_1" class="t s1">: ${t.RefNo} </span>\n\t\t\t<span id="t3_1" class="t s1">Date </span><span id="t4_1" class="t s1">: ${n} </span>\n\t\t\t<span id="t5_1" class="t s1">Name </span><span id="t6_1" class="t s1">: ${t.Name} </span>\n\t\t\t<span id="t7_1" class="t s1">Mobile </span><span id="t8_1" class="t s1">: ${t.MobileNo} </span>\n\t\t\t<span id="t9_1" class="t s1">Logo </span><span id="ta_1" class="t s1">: ${t.Logo} </span>\n\t\t\t<span id="tb_1" class="t s1">Delivery By </span><span id="tc_1" class="t s1">: ${t.DeliveryBy} </span>\n\t\t\t<span id="td_1" class="t s1">Item </span><span id="te_1" class="t s1">: ${t.Item} </span>\n\t\t\t<span id="tf_1" class="t s1">Weight </span><span id="tg_1" class="t s1">: ${t.Weight} </span>\n\t\t\t<span id="th_1" class="t s1">N. Wgt </span><span id="ti_1" class="t s1">: ${t.NWgt} </span>\n\t\t\t<span id="tj_1" class="t s1">Total Pcs </span><span id="tk_1" class="t s1">: ${t.TotalPcs} </span></div>\n\t\t\t\x3c!-- End text definitions --\x3e\n\t\t\t\n\t\t\t\n\t\t\t</div>\n\t\t\t</body>\n\t\t\t</html>\n\t\t\t`;var s=Math.floor(Math.random()*1e4);var o=window.open("","PrintWindow"+s,"width=288,height=288");o.document.write(i);o.document.close();o.focus();setTimeout(function(){o.print()},1e3);o.stop();this.getPrintDailog().close()},onItemPress:function(t){var e=t.getParameter("listItem").getBindingContext().getObject();this.getView().getModel("local").setProperty("/newRecords",e);if(e.Party===true){this.getView().getModel("local").setProperty("/Visible",true)}else{this.getView().getModel("local").setProperty("/Visible",false)}this.oRouter.navTo("Entry")}})});