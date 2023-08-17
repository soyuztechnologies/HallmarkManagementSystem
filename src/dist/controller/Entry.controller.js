sap.ui.define(["victoria/controller/BaseController","victoria/models/models","sap/m/MessageToast","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,a,r){"use strict";return e.extend("victoria.controller.View1",{onInit:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oRouter.getRoute("Entry").attachPatternMatched(this._matchedHandler,this)},_matchedHandler:function(e){this.getView().getModel("appView").setProperty("/headerVisible",true);this.getView().getModel("appView").setProperty("/NewEntry",false);if(!this.getView().getModel("local").getProperty("/CurrentUser")){window.top.location.href="/"}var t=this;if(!this.getView().getModel("local").getProperty("/newRecords")){$.get("/EntityMax").done(function(e){var o=e;var a={RefNo:o,Date:new Date,Name:"",MobileNo:"",Logo:"",DeliveryBy:"",Item:"",Weight:0,NWgt:"gm",TotalPcs:0,Address:"",City:"",PinCode:"",Email:"",ContactPerson:"",OMRate:0,MarketRate:0,Total:0};t.getView().getModel("local").setProperty("/newRecords",a)})}},onMobNuChange:function(e){var t=e.getSource().getProperty("value").length;if(t!==10){o.show("Mobile number must have 10 digits")}},onTotalChange:function(e){var t=e.getParameter("value");this.getView().getModel("local").setProperty("/newRecords/TotalPcs",t);this.totalCalCulater()},omRateChange:function(e){var t=e.getParameter("value");this.getView().getModel("local").setProperty("/newRecords/OMRate",t);this.getView().getModel("local").setProperty("/newRecords/MarketRate",0);this.totalCalCulater()},mrkRtChange:function(e){var t=e.getParameter("value");this.getView().getModel("local").setProperty("/newRecords/OMRate",0);this.getView().getModel("local").setProperty("/newRecords/MarketRate",t);this.totalCalCulater()},totalCalCulater:function(){var e=parseInt(this.getView().getModel("local").getProperty("/newRecords/TotalPcs"));var t=parseInt(this.getView().getModel("local").getProperty("/newRecords/OMRate"));var o=parseInt(this.getView().getModel("local").getProperty("/newRecords/MarketRate"));var a=0;if(o>0){a=e*o}else if(t>0){a=e*t}this.getView().getModel("local").setProperty("/newRecords/Total",a)},onUpdateForm:function(){var e=this.getView().getModel("local").getProperty("/newRecords");var t=this;var o=this.getView().getModel("local").getProperty("/AuthorizationToken");var a="POST";if(e.id){a="PATCH";delete e.__metadata;e.ChangedOn=new Date;e.ChangedBy=this.getView().getModel("local").getProperty("/CurrentUser")}else{e.CreatedOn=new Date;e.CreatedBy=this.getView().getModel("local").getProperty("/CurrentUser")}$.ajax("/api/Entrys?access_token="+o,{type:a,headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+o},data:JSON.stringify(e),success:function(e,o,r){if(a==="POST"){sap.m.MessageToast.show("Data Added Successfully")}else{sap.m.MessageToast.show("Data Updated Successfully")}t.oRouter.navTo("View1");var i=t.getView().byId("idEntryTable").getBinding("items");i.refresh()},error:function(e,t,o){}})},onSelectCheckBox:function(e){var t=e.getSource().getSelected();if(t==true){this.getView().getModel("local").setProperty("/Visible",true)}else{this.getView().getModel("local").setProperty("/Visible",false)}},handleValueHelp:function(){this.getView().getModel().refresh();this.getNameDailog().open()},getNameDailog:function(){if(!this.oNameDialog){this.oNameDialog=sap.ui.xmlfragment(this.getView().getId(),"victoria.fragments.Namepopup",this);this.getView().addDependent(this.oNameDialog)}return this.oNameDialog},onCancelNamepopup:function(){this.getNameDailog().close()},onOkNamepopup:function(e){debugger;var t=e.getSource().getBindingContext().getObject();var o=this.getView().getModel("local").getProperty("/newRecords");o.Logo=t.Logo;o.Name=t.Name;o.OMRate=t.OMRate;o.MarketRate=t.MarketRate;this.getView().getModel("local").setProperty("/newRecords",o);this.getNameDailog().close()},onSearch:function(e){var t=[];var o=e.getSource().getValue();if(o&&o.length>0){var i=new a("Name",r.Contains,o);var l=new a("Party",r.EQ,true);var s=new a("Deleted",r.EQ,false);t.push(i);t.push(l);t.push(s)}var n=this.getView().byId("idList");var g=n.getBinding("items");g.filter(t)},onItemSelected:function(e){var t=e.getParameters().selectedItem.getBindingContext().getObject();var o=this.getView().getModel("local").getProperty("/newRecords");o.Logo=t.Logo;o.Name=t.Name;o.OMRate=t.OMRate;o.MarketRate=t.MarketRate;this.getView().getModel("local").setProperty("/newRecords",o)}})});