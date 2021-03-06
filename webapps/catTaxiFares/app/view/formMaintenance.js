/*
 * File: app/view/formMaintenance.js
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

Ext.define('catTaxiFares.view.formMaintenance', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formMaintenance',

    requires: [
        'catTaxiFares.view.formMaintenanceViewModel',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Fill',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Column',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'formmaintenance'
    },
    id: 'formMaintenance',
    itemId: 'formMaintenance',
    ui: 'green-panel',
    layout: 'column',
    bodyPadding: 10,
    manageHeight: false,
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            id: 'toolbarMaintenance',
            itemId: 'toolbarMaintenance',
            items: [
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        Ext.getCmp('formMaintenance').showTaxiFares();
                    },
                    id: 'btnView',
                    itemId: 'btnView',
                    width: 120,
                    iconCls: 'ion-eye icon16',
                    text: 'View',
                    textAlign: 'left'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var winTaxiFares = Ext.getCmp('winTaxiFares');

                        if (!winTaxiFares) {
                            winTaxiFares = Ext.create('widget.winTaxiFares');
                            winTaxiFares.show();
                            trex.hideScrollBars();
                        }
                    },
                    id: 'btnCreate',
                    itemId: 'btnCreate',
                    width: 120,
                    iconCls: 'ion-plus-circled icon16',
                    text: 'Create',
                    textAlign: 'left'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        Ext.getCmp('formMaintenance').showTaxiFares('edit');
                    },
                    id: 'btnUpdate',
                    itemId: 'btnUpdate',
                    width: 120,
                    iconCls: 'ion-edit icon16',
                    text: 'Update',
                    textAlign: 'left'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var msgFunction = function () {
                            Ext.getCmp('formMaintenance').deleteTaxiFares();

                        };

                        var msgType = 'question';
                        var msgTitle = 'Delete Taxi Fares';
                        var msgContent = 'Do you want to delete the Taxi Fares record: ';

                        trex.message(msgType,
                            msgTitle,
                            msgContent,
                            msgFunction);

                        return;
                    },
                    id: 'btnDelete',
                    itemId: 'btnDelete',
                    width: 120,
                    iconCls: 'ion-trash-a icon16',
                    text: 'Delete',
                    textAlign: 'left'
                },
                {
                    xtype: 'tbseparator',
                    width: 30
                },
                {
                    xtype: 'button',
                    id: 'btnFind',
                    itemId: 'btnFind',
                    width: 120,
                    iconCls: 'ion-ios-search-strong icon16',
                    text: 'Find',
                    textAlign: 'left'
                },
                {
                    xtype: 'button',
                    id: 'btnFilter',
                    itemId: 'btnFilter',
                    width: 120,
                    iconCls: 'ion-funnel icon16',
                    text: 'Filter',
                    textAlign: 'left'
                },
                {
                    xtype: 'tbseparator',
                    width: 30
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    id: 'btnInformation',
                    itemId: 'btnInformation',
                    width: 120,
                    iconCls: 'ion-information-circled icon16',
                    text: 'Information',
                    textAlign: 'left'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var win = window.parent.Ext.getCmp('catTaxiFares');
                        if (win)win[win.closeAction]();
                    },
                    id: 'btnExit',
                    itemId: 'btnExit',
                    width: 120,
                    iconCls: 'ion-android-exit icon16',
                    text: 'Exit',
                    textAlign: 'left'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            columnWidth: 0.5,
            id: 'gridTaxiFares',
            itemId: 'gridTaxiFares',
            ui: 'green-panel',
            title: 'Fares',
            columnLines: false,
            forceFit: false,
            store: 'storeTaxiFares',
            viewConfig: {
                height: 400,
                width: 200
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    id: 'taxi_type_fare',
                    itemId: 'taxi_type_fare',
                    maxWidth: 70,
                    width: 70,
                    dataIndex: 'taxi_type_fare',
                    text: 'Fare </br> Taype'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'sector',
                    itemId: 'sector',
                    maxWidth: 170,
                    width: 170,
                    dataIndex: 'sector_start',
                    text: 'Sector'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'zone',
                    itemId: 'zone',
                    maxWidth: 170,
                    width: 170,
                    dataIndex: 'zone_end',
                    text: 'Zone'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'taxi_start',
                    itemId: 'taxi_start',
                    maxWidth: 65,
                    width: 65,
                    dataIndex: 'taxi_start',
                    text: 'Start </br> Fare'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'taxi_km',
                    itemId: 'taxi_km',
                    maxWidth: 65,
                    width: 65,
                    dataIndex: 'taxi_km',
                    text: 'Km </br> Fare'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'taxi_min',
                    itemId: 'taxi_min',
                    maxWidth: 65,
                    width: 65,
                    dataIndex: 'taxi_min',
                    text: 'Min </br> Fare'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'taxi_min_waiting',
                    itemId: 'taxi_min_waiting',
                    maxWidth: 65,
                    width: 65,
                    dataIndex: 'taxi_min_waiting',
                    text: 'Waiting </br> Fare'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'cost',
                    itemId: 'cost',
                    maxWidth: 80,
                    width: 80,
                    dataIndex: 'cost',
                    text: ' Cost'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'created_date',
                    itemId: 'created_date',
                    maxWidth: 70,
                    width: 70,
                    dataIndex: 'created_date',
                    text: 'Fecha </br> Registro'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'isactive',
                    itemId: 'isactive',
                    maxWidth: 50,
                    minWidth: 30,
                    dataIndex: 'isactive',
                    text: 'Active'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    id: 'pagingToolbar',
                    itemId: 'pagingToolbar',
                    width: 260,
                    displayInfo: true,
                    store: 'storeTaxiFares'
                }
            ],
            listeners: {
                itemdblclick: 'onGridTaxiFaresItemDblClick',
                itemclick: 'onGridTaxiFaresItemClick'
            }
        },
        {
            xtype: 'gridpanel',
            columnWidth: 0.5,
            id: 'gridRangeFares',
            itemId: 'gridRangeFares',
            margin: '0 0 0 15',
            ui: 'green-panel',
            title: 'Ranges',
            columnLines: false,
            forceFit: false,
            store: 'storeRageFares',
            viewConfig: {
                height: 400,
                maxWidth: 300,
                width: 300
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    id: 'start_range',
                    itemId: 'start_range',
                    maxWidth: 80,
                    width: 80,
                    dataIndex: 'km_start',
                    text: 'Start </br> Rage'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'end_range',
                    itemId: 'end_range',
                    maxWidth: 80,
                    width: 80,
                    dataIndex: 'km_end',
                    text: 'End </br> Range'
                },
                {
                    xtype: 'gridcolumn',
                    id: 'cost2',
                    itemId: 'cost2',
                    maxWidth: 80,
                    width: 80,
                    dataIndex: 'cost',
                    text: 'Cost'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    id: 'pagingToolbar2',
                    itemId: 'pagingToolbar2',
                    width: 260,
                    displayInfo: true,
                    store: 'storeRageFares'
                }
            ],
            listeners: {
                itemdblclick: 'onGridRageFaresItemDblClick',
                itemclick: 'onGridRageFaresItemClick'
            }
        }
    ],

    onGridTaxiFaresItemDblClick: function (dataview, record, item, index, e, eOpts) {
        Ext.getCmp('formMaintenance').showTaxiFares();
    },

    onGridTaxiFaresItemClick: function (dataview, record, item, index, e, eOpts) {
        Ext.getCmp('formMaintenance').TaxiFaresID = record.data.id;
        Ext.getCmp('formMaintenance').TaxiFaresRecord = record.data;
    },

    onGridRageFaresItemDblClick: function (dataview, record, item, index, e, eOpts) {
        Ext.getCmp('formMaintenance').showRageFares();
    },

    onGridRageFaresItemClick: function (dataview, record, item, index, e, eOpts) {
        Ext.getCmp('formMaintenance').RageFaresID = record.data.id;
        Ext.getCmp('formMaintenance').RageFaresRecord = record.data;
    },

    showTaxiFares: function (pMode) {
        var apiController = 'apiTaxiFares';
        var apiMethod = 'showTaxiFares';
        var objJsonData = new Object();
        objJsonData.TaxiFaresID = Ext.getCmp('formMaintenance').TaxiFaresID;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = apiController;
        objJsonRequest.apiMethod = apiMethod;
        objJsonRequest.apiData = JSON.stringify(objJsonData);

        var functionSuccess = function () {
            var jsonData = trex.getInfoDataBridge(apiController);


            var winTaxiFares = Ext.getCmp('winTaxiFares');

            if (!winTaxiFares) {
                winTaxiFares = Ext.create('widget.winTaxiFares');
                winTaxiFares.show();
                trex.hideScrollBars();
            }

            trex.showRecord(jsonData, 'taxifares');

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

    deleteTaxiFares: function () {
        alert('registro borrado');

        var formRecord = 'formTaxiFares';
        var apiController = 'apiTaxiFares';
        var apiMethod = 'deleteTaxiFares';

        var objJsonData = new Object();
        objJsonData.SectorId = Ext.getCmp('formMaintenance').TaxiFaresRecord.id;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = apiController;
        objJsonRequest.apiMethod = apiMethod;
        objJsonRequest.apiData = JSON.stringify(objJsonData);

        var functionSuccess = function () {
            var jsonData = trex.getInfoDataBridge(apiController);

            console.log(jsonData);
            trex.showInfo(jsonData, 'info');

        };

        var functionFailure = function () {
            var jsonData = trex.getInfoDataBridge(apiController);
            trex.showInfo(jsonData, 'error', 'tfCompany');
        };

        trex.doDataBridge(objJsonRequest,
            functionSuccess,
            null,
            functionFailure,
            null);
    }

});