/*
 * File: app/view/winSector.js
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

Ext.define('catSector.view.winSector', {
    extend: 'Ext.window.Window',
    alias: 'widget.winSector',

    requires: [
        'catSector.view.winSectorViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    viewModel: {
        type: 'winsector'
    },
    height: 500,
    id: 'winSector',
    itemId: 'winSector',
    maxHeight: 300,
    minHeight: 500,
    minWidth: 850,
    ui: 'green-window',
    width: 850,
    layout: 'column',
    closable: false,
    title: 'Sector',
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
            height: 233,
            id: 'formSector',
            itemId: 'formSector',
            width: 838,
            layout: 'column',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'fieldset',
                    columnWidth: 1,
                    height: 117,
                    id: 'fieldsetSectorInformation',
                    itemId: 'fieldsetSectorInformation',
                    width: 816,
                    layout: 'column',
                    title: '<b>General information</b>',
                    items: [
                        {
                            xtype: 'textfield',
                            columnWidth: 0.3,
                            disabledCls: 'disabledField',
                            id: 'tfSectorID',
                            itemId: 'tfSectorID',
                            margin: '0 5 5 5',
                            width: 387,
                            fieldLabel: 'Sector ID',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.7,
                            disabledCls: 'disabledField',
                            id: 'tfSectorName',
                            itemId: 'tfSectorName',
                            margin: '0 5 5 5',
                            fieldLabel: 'Sector Name',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.4,
                            disabledCls: 'disabledField',
                            id: 'cbCountry',
                            itemId: 'cbCountry',
                            margin: '0 5 5 5',
                            fieldLabel: 'Country',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.4,
                            disabledCls: 'disabledField',
                            id: 'cbState',
                            itemId: 'cbState',
                            margin: '0 5 5 5',
                            fieldLabel: 'State',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.33,
                            disabledCls: 'disabledField',
                            id: 'dtCreatedAt',
                            itemId: 'dtCreatedAt',
                            margin: '0 5 5 5',
                            fieldLabel: 'Created',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'checkboxfield',
                            columnWidth: 0.17,
                            disabledCls: 'disabledField',
                            id: 'chActive',
                            itemId: 'chActive',
                            margin: '0 5 5 5',
                            labelClsExtra: 'requiredField',
                            boxLabel: 'Active'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    columnWidth: 1,
                    height: 85,
                    id: 'fieldsetGeolocalization',
                    itemId: 'fieldsetGeolocalization',
                    layout: 'column',
                    title: '<b>Geolocalization</b>',
                    items: [
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            disabledCls: 'disabledField',
                            id: 'tfLatitude',
                            itemId: 'tfLatitude',
                            margin: '0 5 5 5',
                            fieldLabel: 'Latitude',
                            labelClsExtra: 'requiredField'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            disabledCls: 'disabledField',
                            id: 'tfLongitude',
                            itemId: 'tfLongitude',
                            margin: '0 5 5 5',
                            fieldLabel: 'Longitude',
                            labelClsExtra: 'requiredField'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 1,
                            disabledCls: 'disabledField',
                            id: 'tfGeocodeUrl',
                            itemId: 'tfGeocodeUrl',
                            margin: '0 5 5 5',
                            fieldLabel: 'Geocode URL'
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
            id: 'toolbarSector',
            itemId: 'toolbarSector',
            items: [
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        Ext.getCmp('formSector').confirmRecord();
                    },
                    id: 'btnConfirmSector',
                    itemId: 'btnConfirmSector',
                    width: 120,
                    iconCls: 'ion-checkmark-circled icon16',
                    text: 'Confirm',
                    textAlign: 'left'
                },
                {
                    xtype: 'tbfill',
                    id: 'filSector',
                    itemId: 'filSector'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var winSector = Ext.getCmp('winSector');
                        winSector.close();
                    },
                    id: 'btnCloseSector',
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