/*
 * File: app/view/winEventCar.js
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

Ext.define('catCar.view.winEventCar', {
    extend: 'Ext.window.Window',
    alias: 'widget.winEventCar',

    requires: [
        'catCar.view.winSectorViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    viewModel: {
        type: 'wineventcar'
    },
    height: 240,
    id: 'winEventCar',
    itemId: 'winEventCar',
    maxHeight: 240,
    minHeight: 500,
    minWidth: 850,
    ui: 'green-window',
    width: 850,
    layout: 'column',
    closable: false,
    title: 'Event Car',
    modal: true,

    items: [
        {
            xtype: 'form',
            confirmRecord: function () {
                if (Ext.getCmp('formSector').isValid()) {
                    var formRecord = 'formSector';
                    var apiController = 'apiSector';
                    var apiMethod = 'createSector';

                    var objJsonRequest = new Object();
                    objJsonRequest.apiController = apiController;
                    objJsonRequest.apiMethod = apiMethod;
                    objJsonRequest.apiData = trex.prepareFormFields(formRecord);

                    var functionSuccess = function () {
                        var jsonData = trex.getInfoDataBridge(apiController);

                        trex.showInfo(jsonData, 'information');

                        var winSector = Ext.getCmp('winSector');
                        winSector.close();

                        Ext.getStore('storeSector').load();

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
                else {

                    trex.message('error',
                        'Incomplete Form',
                        'You must fill the required fields');
                }
            },
            columnWidth: 1,
            height: 178,
            id: 'formEventCar',
            itemId: 'formEventCar',
            width: 838,
            layout: 'column',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'fieldset',
                    columnWidth: 1,
                    height: 150,
                    id: 'fieldsetEventCarInformation',
                    itemId: 'fieldsetEventCarInformation',
                    width: 816,
                    layout: 'column',
                    title: '<b>General information</b>',
                    items: [
                        {
                            xtype: 'textfield',
                            columnWidth: 0.65,
                            disabledCls: 'disabledField',
                            id: 'tfEvent',
                            itemId: 'tfEvent',
                            margin: '0 5 5 5',
                            width: 100,
                            fieldLabel: 'Event',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.35,
                            disabledCls: 'disabledField',
                            id: 'dtEvent',
                            itemId: 'dtEvent',
                            margin: '0 5 5 5',
                            fieldLabel: 'Date Event',
                            labelClsExtra: 'requiredField',
                            labelWidth: 130,
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            columnWidth: 0.65,
                            disabledCls: 'disabledField',
                            height: 69,
                            id: 'tfActions',
                            itemId: 'tfActions',
                            margin: '0 5 5 5',
                            width: 100,
                            fieldLabel: 'Actions',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.35,
                            disabledCls: 'disabledField',
                            id: 'dtActions',
                            itemId: 'dtActions',
                            margin: '0 5 5 5',
                            fieldLabel: 'End Date Actions',
                            labelClsExtra: 'requiredField',
                            labelWidth: 130,
                            allowBlank: false
                        },
                        {
                            xtype: 'checkboxfield',
                            columnWidth: 0.17,
                            disabledCls: 'disabledField',
                            id: 'chActive3',
                            itemId: 'chActive2',
                            margin: '0 5 5 5',
                            labelClsExtra: 'requiredField',
                            boxLabel: 'Active'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            id: 'toolbarSector2',
            itemId: 'toolbarSector',
            items: [
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        Ext.getCmp('formSector').confirmRecord();
                    },
                    id: 'btnConfirmSector2',
                    itemId: 'btnConfirmSector',
                    width: 120,
                    iconCls: 'ion-checkmark-circled icon16',
                    text: 'Confirm',
                    textAlign: 'left'
                },
                {
                    xtype: 'tbfill',
                    id: 'filSector2',
                    itemId: 'filSector'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var winEventCar = Ext.getCmp('winEventCar');
                        winEventCar.close();
                    },
                    id: 'btnCloseSector2',
                    itemId: 'btnCloseSector',
                    width: 120,
                    iconCls: 'ion-close-circled icon16',
                    text: 'Close',
                    textAlign: 'left'
                }
            ]
        }
    ]

});