/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    id: 'aplicacion',
    models: [
        'modelEstadoDocumentos',
        'modClienteActivo'
    ],
    stores: [
        'storeEstadoDocumentos',
        'storeClienteActivo'
    ],
    views: [
        'windowMenuPrincipal'
    ],
    name: 'areaACP',

    launch: function() {
        Ext.create('areaACP.view.windowMenuPrincipal', {renderTo: Ext.getBody()});
        var nombreEntidad  = convierteAscci(recuperaDatoSesion('nombreEntidad'));
        var nombreSistema = convierteAscci(recuperaDatoSesion('nombreSistema'));
        var nombrePersona = convierteAscci(recuperaDatoSesion('nombre'));

        Ext.getCmp('nombreEntidad').setText(nombreEntidad);
        Ext.getCmp('nomCompleto').setText(nombrePersona);
        Ext.getCmp('razonSocial').setText(recuperaDatoSesion('razonSocial'));
        Ext.getCmp('nombreComercial').setText(recuperaDatoSesion('nombreComercial'));
        Ext.getCmp('nombreSistema').setText(nombreSistema);

        aplicacionLocal = this;

        var nombreSistema = datosOpenLink('tituloAplicacion');
        Ext.getDoc().dom.title = nombreSistema;

        var iconoAplicacion = datosOpenLink('servidorWeb');
        iconoAplicacion = iconoAplicacion + 'copamex/framework/ambiente/ambiente.ico';
        cambiaFavicon(iconoAplicacion);

        aplicacionLocal.getApplication().generaClienteActivo();

    },

    generaClienteActivo: function() {
        aDatosAPI = new Array();
        aDatosAPI[0] = new Object();
        aDatosAPI[0].p_codEntidad         = recuperaDatoSesion('codEntidad');

        var strJson = JSON.stringify(aDatosAPI);

        datosJsonFormulario = {codPrograma      : 'api_AccesoPortal',
                               codProcedimiento : 'datosCliente',
                               usuarioActivo    : recuperaDatoSesion('clavePersona'),
                               codEmpresa       : recuperaDatoSesion('codEmpresa'),
                               codSistema       : recuperaDatoSesion('codSistema'),
                               tipoLlamada      : "formulario",
                               datosJson        : strJson};

        var funcionSuccess = function(){
            var datosJson = Ext.decode(recuperaDatosOpenLink('datosCliente'));

            var codCliente = datosJson.temp_datosCliente[0].codcliente;
            var nomeAbrev  = datosJson.temp_datosCliente[0].nomeabrev;
            var nomeEmit   = datosJson.temp_datosCliente[0].nomeemit;

            var datosClienteActivo = {
                codCliente : codCliente,
                nomeAbrev  : nomeAbrev,
                nomeEmit   : nomeEmit
            };

            asignaValoresStore('storeClienteActivo',datosClienteActivo);
        };

        var funcionFailure = function(){
            var datosJson = Ext.decode(recuperaDatosOpenLink('datosCliente'));
        };

        ejecutaOpenLink(datosJsonFormulario,
                        funcionSuccess,
                        undefined,
                        funcionFailure,
                        undefined);
    }

});
