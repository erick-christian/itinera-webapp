/*
 * File: app/store/storeZone.js
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

Ext.define('catSector.store.storeZone', {
    extend: 'Ext.data.Store',

    requires: [
        'catSector.model.modZone',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'storeZone',
            model: 'catSector.model.modZone',
            proxy: {
                type: 'rest',
                url: '',
                reader: {
                    type: 'json',
                    rootProperty: 'Zones',
                    totalProperty: 'numZones.total'
                }
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
        var storeZone = Ext.getStore('storeZone');
        var proxySector = storeZone.getProxy();

        var objJsonData = new Object();
        objJsonData.page = storeZone.currentPage;
        objJsonData.start = (storeZone.currentPage - 1) * storeZone.pageSize;
        objJsonData.limit = storeZone.pageSize;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = 'apiZone';
        objJsonRequest.apiMethod = 'listZone';
        objJsonRequest.apiData = JSON.stringify(objJsonData);

        proxySector.api.read = '../../backend/public/dataBridge/' + objJsonRequest.apiController;
        proxySector.extraParams = objJsonRequest;

    }

});