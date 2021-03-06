/*
 * File: app/store/storePayments.js
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

Ext.define('proPayments.store.storePayments', {
    extend: 'Ext.data.Store',

    requires: [
        'proPayments.model.modPayments',
        'Ext.data.proxy.Rest'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'storePayments',
            model: 'proPayments.model.modPayments',
            proxy: {
                type: 'rest',
                url: ''
            },
            listeners: {
                beforeload: {
                    fn: me.onStoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onStoreBeforeLoad: function (store, operation, eOpts) {
        var storePayments = Ext.getStore('storePayments');
        var proxyPayments = storePayments.getProxy();

        var objJsonData = new Object();
        objJsonData.page = storePayments.currentPage;
        objJsonData.start = (storePayments.currentPage - 1) * storePayments.pageSize;
        objJsonData.limit = storePayments.pageSize;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = 'apiPayments';
        objJsonRequest.apiMethod = 'listPayments';
        objJsonRequest.apiData = JSON.stringify(objJsonData);

        proxyPayments.api.read = '../../backend/public/dataBridge/' + objJsonRequest.apiController;
        proxyPayments.extraParams = objJsonRequest;

    }

});