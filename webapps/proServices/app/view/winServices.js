/*
 * File: app/view/winServices.js
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

Ext.define('proServices.view.winServices', {
    extend: 'Ext.window.Window',
    alias: 'widget.winServices',

    requires: [
        'proServices.view.winServicesViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.Date',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    viewModel: {
        type: 'winservices'
    },
    height: 300,
    id: 'winServices',
    itemId: 'winServices',
    maxHeight: 200,
    minHeight: 500,
    minWidth: 850,
    ui: 'green-window',
    width: 850,
    layout: 'column',
    closable: false,
    title: 'Services',
    modal: true,

    items: [
        {
            xtype: 'form',
            confirmRecord: function () {
                if (Ext.getCmp('formServices').isValid()) {
                    var formRecord = 'formServices';
                    var apiController = 'apiServices';
                    var apiMethod = 'createServices';

                    var objJsonRequest = new Object();
                    objJsonRequest.apiController = apiController;
                    objJsonRequest.apiMethod = apiMethod;
                    objJsonRequest.apiData = trex.prepareFormFields(formRecord);

                    var functionSuccess = function () {
                        var jsonData = trex.getInfoDataBridge(apiController);

                        trex.showInfo(jsonData, 'information');

                        var winServices = Ext.getCmp('winServices');
                        winServices.close();

                        Ext.getStore('storeServices').load();

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
            height: 141,
            id: 'formServices',
            itemId: 'formServices',
            width: 838,
            layout: 'column',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'fieldset',
                    columnWidth: 1,
                    height: 117,
                    id: 'fieldsetServicesInformation',
                    itemId: 'fieldsetServicesInformation',
                    width: 816,
                    layout: 'column',
                    title: '<b>General information</b>',
                    items: [
                        {
                            xtype: 'textfield',
                            columnWidth: 0.2,
                            disabledCls: 'disabledField',
                            id: 'tfTurn',
                            itemId: 'tfTurn',
                            margin: '0 5 5 5',
                            width: 387,
                            fieldLabel: 'Turn',
                            labelClsExtra: 'requiredField',
                            labelWidth: 60,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.25,
                            disabledCls: 'disabledField',
                            id: 'cbStandTaxi',
                            itemId: 'cbStandTaxi',
                            margin: '0 5 5 5',
                            fieldLabel: 'Stand Taxi',
                            labelClsExtra: 'requiredField',
                            labelWidth: 80,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.55,
                            disabledCls: 'disabledField',
                            id: 'tfStandDesc',
                            itemId: 'tfStandDesc',
                            margin: '0 5 5 5',
                            width: 387,
                            fieldLabel: 'Description',
                            labelClsExtra: 'requiredField',
                            labelWidth: 120
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.25,
                            disabledCls: 'disabledField',
                            id: 'dtServDate',
                            itemId: 'dtServDate',
                            margin: '0 5 5 5',
                            fieldLabel: 'Date',
                            labelClsExtra: 'requiredField',
                            labelWidth: 60,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.35,
                            disabledCls: 'disabledField',
                            id: 'cbTypeServices',
                            itemId: 'cbTypeServices',
                            margin: '0 5 5 5',
                            fieldLabel: 'Type Services',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.35,
                            disabledCls: 'disabledField',
                            id: 'cbTypeFire',
                            itemId: 'cbTypeFire',
                            margin: '0 5 5 15',
                            fieldLabel: 'Type Fare',
                            labelClsExtra: 'requiredField',
                            allowBlank: false
                        },
                        {
                            xtype: 'checkboxfield',
                            columnWidth: 0.17,
                            disabledCls: 'disabledField',
                            id: 'chAppointment',
                            itemId: 'chAppointment',
                            margin: '0 5 5 5',
                            labelClsExtra: 'requiredField',
                            boxLabel: 'Appointment'
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.4,
                            disabledCls: 'disabledField',
                            id: 'cbAppointmentDate',
                            itemId: 'cbAppointmentDate',
                            margin: '0 5 5 40',
                            fieldLabel: 'Appointment Date',
                            labelClsExtra: 'requiredField',
                            labelWidth: 130,
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.3,
                            disabledCls: 'disabledField',
                            id: 'tfAppointmentHour',
                            itemId: 'tfAppointmentHour',
                            margin: '0 5 5 10',
                            width: 387,
                            fieldLabel: 'Appoitment Hour',
                            labelClsExtra: 'requiredField',
                            labelWidth: 130,
                            allowBlank: false
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
            id: 'toolbarServices',
            itemId: 'toolbarServices',
            items: [
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        Ext.getCmp('formServices').confirmRecord();
                    },
                    id: 'btnConfirmServices',
                    itemId: 'btnConfirmServices',
                    width: 120,
                    iconCls: 'ion-checkmark-circled icon16',
                    text: 'Confirm',
                    textAlign: 'left'
                },
                {
                    xtype: 'tbfill',
                    id: 'filServices',
                    itemId: 'filServices'
                },
                {
                    xtype: 'button',
                    handler: function (button, e) {
                        var winServices = Ext.getCmp('winServices');
                        winServices.close();
                    },
                    id: 'btnCloseServices',
                    itemId: 'btnCloseServices',
                    width: 120,
                    iconCls: 'ion-close-circled icon16',
                    text: 'Close',
                    textAlign: 'left'
                }
            ]
        }
    ]

});