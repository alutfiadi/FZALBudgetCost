sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/fl/FakeLrepConnector",
	"sap/ui/core/util/MockServer",
	"sap/m/Image",
	"sap/m/Text",
	"sap/m/FlexItemData",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, MessageBox, FakeLrepConnector, MockServer, Image, Text, FlexItemData, ODataModel) {
	"use strict";

	return Controller.extend("ZAL.ALBudgetCost.controller.View1", {

		onInit: function () {
			// enable 'mock' variant management
			FakeLrepConnector.enableFakeConnector("mockserver/component-test-changes.json");

			var oMockServer = new MockServer({
				rootUri: "sapuicompsmartchart/"
			});
			this._oMockServer = oMockServer;
			oMockServer.simulate("test-resources/sap/ui/comp/demokit/sample/smartchart/general/mockserver/metadata.xml", "test-resources/sap/ui/comp/demokit/sample/smartchart/general/mockserver/");
			oMockServer.start();

			// create and set ODATA Model
			this._oModel = new ODataModel("sapuicompsmartchart", true);
			this.getView().setModel(this._oModel);

			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			oSmartChart.attachInitialise(function(){
				oSmartChart.getChart().setVizProperties({categoryAxis:{layout:{maxHeight:0.8}}});
			});
		}
	});
});
