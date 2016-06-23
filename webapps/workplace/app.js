/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    views: [
        'winWorkplace'
    ],
    name: 'workplace',

    loadCompanyData: function () {
        var apiController = 'apiCompany';
        var apiMethod = 'showCompany';
        var objJsonData = new Object();
        objJsonData.CompanyID = 1;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = apiController;
        objJsonRequest.apiMethod = apiMethod;
        objJsonRequest.apiData = JSON.stringify(objJsonData);

        var functionSuccess = function () {
            var jsonData = trex.getInfoDataBridge(apiController);

            trex.writeElement('lblCompany', trex.getSessionData('company_name'));
            trex.writeElement('lblUserName', trex.getSessionData('user_name'));
            trex.writeElement('lblSystemName', trex.getSessionData('system_name'));
            trex.writeElement('lblProfile', trex.getSessionData('user_profile'));
            trex.writeElement('lblVersion', trex.getSessionData('system_version'));

        };

        var functionFailure = function () {
            var jsonData = trex.getInfoDataBridge(apiController);
        };

        trex.doDataBridge(objJsonRequest,
            functionSuccess,
            null,
            functionFailure,
            null);
    },

    launch: function() {
        Ext.create('workplace.view.winWorkplace', {renderTo: Ext.getBody()});
        var appIcon = '../../framework/terian/image/icono_itinera.ico';
        trex.changeAppIcon(appIcon);
        Ext.getDoc().dom.title = 'ItineraTMS - Workplace';
        appLocal = this.getApplication();
        appLocal.loadCompanyData();
        appLocal.renderInterface();
    },

    renderInterface: function () {
        Ext.getCmp('formWorkplace').doLayout();
        var heightWindow = Ext.getBody().getViewSize().height;
        var widthWindow = Ext.getBody().getViewSize().width;
        console.log('Dimensiones: ');
        console.log(heightWindow);
        console.log(widthWindow);
        Ext.getCmp('formWorkplace').setHeight(heightWindow);


        //Ext.getCmp('gridPedidoVenta').setHeight(alturaGrid);
    }

});
