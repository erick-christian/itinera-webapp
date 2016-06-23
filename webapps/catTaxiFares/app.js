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
Ext.Loader.setConfig({});


Ext.application({
    models: [
        'modTaxiFares',
        'modRageFares'
    ],
    stores: [
        'storeTaxiFares',
        'storeRageFares'
    ],
    views: [
        'formMaintenance',
        'winTaxiFares',
        'winRageFares'
    ],
    name: 'catTaxiFares',

    launch: function () {
        Ext.create('catTaxiFares.view.formMaintenance', {renderTo: Ext.getBody()});
        appLocal = this.getApplication();
        Ext.EventManager.onWindowResize(function (w, h) {
            appLocal.fixInterface(w, h);
        });

        appLocal.fixInterface();

        Ext.getStore('storeTaxiFares').load();

    },

    fixInterface: function (p_winWidth, p_winHeight) {
        Ext.getCmp('formMaintenance').doLayout();

        var heightGrid = Ext.getBody().getViewSize().height - 55;
        Ext.getCmp('gridTaxiFares').setHeight(heightGrid);
        Ext.getCmp('gridRangeFares').setHeight(heightGrid);

    }

});
