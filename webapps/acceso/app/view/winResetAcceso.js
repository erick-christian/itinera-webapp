/*
 * File: app/view/winResetAcceso.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('acceso.view.winResetAcceso', {
    extend: 'Ext.window.Window',
    alias: 'widget.winResetAcceso',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.Text'
    ],

    height: 215,
    id: 'winResetAcceso',
    itemId: 'winResetAcceso',
    width: 500,
    closable: false,
    title: 'Reestablecer Acceso',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarResetAcceso',
                    itemId: 'toolbarResetAcceso',
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var mensajeUsuario = "";

                                aDatosAPI = new Array();
                                aDatosAPI[0] = new Object();
                                aDatosAPI[0].p_clavePersona         = leeValorElemento('tf_claveUsuarioReset');

                                console.log(aDatosAPI[0].p_clavePersona);
                                console.log('Empresa: ' + configuracionSistema('codEmpresa'));

                                var strJson = JSON.stringify(aDatosAPI);

                                datosJsonFormulario = {codPrograma       : 'api_RecuperaAcceso',
                                    codProcedimiento  : 'recuperaAcceso',
                                    idOpenLink        : 'recuperaAcceso',
                                    tipoLlamada       : "informacion",
                                    datosJson         : strJson,
                                    usuarioActivo     : leeValorElemento('tf_claveUsuarioReset'),
                                    codEmpresa        : configuracionSistema('codEmpresa'),
                                    codSistema        : configuracionSistema('codSistema'),
                                    codEmpresaActiva  : configuracionSistema('codEmpresaActiva'),
                                    codSucursalActiva : configuracionSistema('codSucursalActiva'),
                                    openLinkServidor  : datosOpenLink('servidor'),
                                    openLinkServicio  : datosOpenLink('servicio'),
                                    openLinkPrograma  : datosOpenLink('programa')

                                };


                                var cajaEspera = Ext.MessageBox.show({
                                    msg: 'Por favor espere, procesando información...',
                                    progressText: 'Validando Acceso',
                                    width:400,
                                    wait:true,
                                    waitConfig: {interval:170}
                                });

                                deshabilitaElemento('tf_claveUsuarioReset');
                                deshabilitaElemento('btnConfirmarResetAcceso');
                                deshabilitaElemento('btnCerrarResetAcceso');

                                asignaValorElemento('labelAccion','Enviando Correo Electrónico, por favor espere...');

                                Ext.Ajax.request({
                                    url: '../../../../../../openLink/openLink.jsp',
                                    method: 'POST',
                                    success: function(response,opts){
                                        /* ECRC: Función cuando se ejecuta correctamente el Script en el Servidor */
                                        var datosJson = Ext.decode(response.responseText);

                                        if(datosJson.success === true ){
                                            /* ECRC: API ejecutada correctamente y sin Errores */

                                            var aMensaje = datosJson.temp_mensaje_exec;

                                            for(var iCiclo = 0; iCiclo<aMensaje.length; iCiclo++){
                                                mensajeUsuario += aMensaje[iCiclo].contenido + "</br></br>";
                                            }

                                            var winResetAcceso = Ext.getCmp('winResetAcceso');
                                            winResetAcceso.close();

                                            mensajeUsr("INFO",
                                            "Acceso Restablecido",
                                            mensajeUsuario);
                                        }
                                        else{
                                            /* ECRC: Errores encontrados en la API */
                                            var aMensaje = datosJson.temp_mensaje_exec;

                                            for(var iCiclo = 0; iCiclo<aMensaje.length; iCiclo++){
                                                mensajeUsuario += aMensaje[iCiclo].contenido + "</br></br>";
                                            }

                                            mensajeUsr("ERROR",
                                            "Error de Acceso",
                                            mensajeUsuario);
                                        }
                                    },
                                    failure: function(response,opts){
                                        /* ECRC: Función cuando hay Error en la Ejecución en el Servidor */
                                        console.log('Servidor falló con el Código ' + response.status);
                                    },
                                    callback: function(response,opts){
                                        habilitaElemento('tf_claveUsuarioReset');
                                        habilitaElemento('btnConfirmarResetAcceso');
                                        habilitaElemento('btnCerrarResetAcceso');
                                        asignaValorElemento('labelAccion','Un Correo Electrónico le será enviado con las nuevas credenciales.');
                                    },
                                    params: datosJsonFormulario
                                });

                                cajaEspera.hide();

                            },
                            id: 'btnConfirmarResetAcceso',
                            itemId: 'btnConfirmarResetAcceso',
                            width: 135,
                            iconAlign: 'right',
                            iconCls: 'confirmar16',
                            text: 'Confirmar',
                            textAlign: 'left'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var winResetAcceso = Ext.getCmp('winResetAcceso');
                                winResetAcceso.close();


                            },
                            id: 'btnCerrarResetAcceso',
                            itemId: 'btnCerrarResetAcceso',
                            width: 135,
                            iconAlign: 'right',
                            iconCls: 'close16',
                            text: 'Cerrar',
                            textAlign: 'left'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    height: 250,
                    id: 'formResetAcceso',
                    itemId: 'formResetAcceso',
                    layout: 'column',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'fieldset',
                            columnWidth: 1,
                            height: 120,
                            id: 'fieldsetRestableceAcceso',
                            itemId: 'fieldsetRestableceAcceso',
                            layout: 'column',
                            title: '<b>Información</b>',
                            items: [
                                {
                                    xtype: 'label',
                                    columnWidth: 1,
                                    html: '<p align=\'justify\'><b>Digite su Clave de Usuario para reestablecer su acceso.</b></br></p>',
                                    id: 'labelDescripcion',
                                    itemId: 'labelDescripcion',
                                    text: ''
                                },
                                {
                                    xtype: 'label',
                                    columnWidth: 1,
                                    id: 'labelAccion',
                                    itemId: 'labelAccion',
                                    text: 'Un Correo Electrónico le será enviado con las nuevas credenciales.'
                                },
                                {
                                    xtype: 'textfield',
                                    columnWidth: 1,
                                    id: 'tf_claveUsuarioReset',
                                    itemId: 'tf_claveUsuarioReset',
                                    margin: '10 0 0 100',
                                    maxWidth: 250,
                                    minWidth: 250,
                                    width: 250,
                                    fieldLabel: 'Usuario',
                                    labelWidth: 60,
                                    vtype: 'alphanum',
                                    vtypeText: 'Escriba su Clave de Acceso'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});