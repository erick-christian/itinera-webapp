Ext.define('modOpenLink',
{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'idStore', type:'string'},
		{name: 'respuestaJson', type:'string'}
	]
});


function generaDatosOpenLink(p_idStore, 
                             p_respuestaJson){
    Ext.define('storeOpenLink',
               {
                   extend: 'Ext.data.Store',
                   model: 'modOpenLink',
                   proxy:{
                       type: 'sessionstorage',
                       id: p_idStore
                   }
               });
    
    var storeOpenLink = Ext.create('storeOpenLink');
    storeOpenLink.getProxy().clear();
    
    storeOpenLink.add({
        idStore: p_idStore,
        respuestaJson: p_respuestaJson
    });
    
    storeOpenLink.sync();  
}

function recuperaDatosOpenLink(p_idStore){
    
    Ext.define('storeOpenLink',
               {
                   extend: 'Ext.data.Store',
                   model: 'modOpenLink',
                   proxy:{
                       type: 'sessionstorage',
                       id: p_idStore
                   }
               });
    
    var valRetorno = '';
    var storeOpenLink = Ext.create('storeOpenLink');
    
    Ext.define('storeOpenLink',
               {
                   extend: 'Ext.data.Store',
                   model: 'modOpenLink',
                   proxy:{
                       type: 'sessionstorage',
                       id: 'openLink'
                   }
               });
    
    storeOpenLink.load(function(records,op,success){
        var datosOpenLink, iCiclo;
        
        for (iCiclo=0; iCiclo<records.length; iCiclo++){
            datosOpenLink = records[iCiclo].data;
            //valRetorno = Ext.decode(datosOpenLink.respuestaJson);
            valRetorno = datosOpenLink.respuestaJson;
            
        }
        
        return valRetorno;
    });
    return valRetorno;
}

function ejecutaOpenLink(p_datosJsonFormulario, 
                         p_fncSuccess, 
                         p_paramsSuccess,
                         p_fncFailure,
                         p_paramsFailure,
                         p_fncCallback,
                         p_paramsCallback,
                         p_modoDebug){
    
    var funcionSuccess;
    var funcionFailure;
    var cajaEspera = Ext.MessageBox.show({ 
		msg: 'Por favor espere, procesando informacion...', 
		progressText: 'Procesando', 
		width:300, 
		wait:true, 
		waitConfig: {interval:170}
	});

    /*--------------------------------------------------------------------------\
    | ECRC: Modificando los datos que se enviaran para cambiar las comas que	|
    |       son los delimitadores que se utilizan en Progress.					|
    \--------------------------------------------------------------------------*/
    //var objDatosJsonFormulario = JSON.parse(p_datosJsonFormulario);
    var objJsonDatos = JSON.parse(p_datosJsonFormulario.datosJson);
    var cambioTexto = true;
    
    
    // ECRC: Adicionando la URL del OpenLink
    p_datosJsonFormulario.codEmpresa       = recuperaDatoSesion("codEmpresa");
    p_datosJsonFormulario.codSistema       = recuperaDatoSesion("codSistema");
    p_datosJsonFormulario.openLinkServidor = recuperaDatoSesion('servidor');
    p_datosJsonFormulario.openLinkServicio = recuperaDatoSesion('servicio');
    p_datosJsonFormulario.openLinkPrograma = recuperaDatoSesion('programa');
    p_datosJsonFormulario.usuarioActivo    = recuperaDatoSesion('clavePersona');
    /*p_datosJsonFormulario.appActiva        = appLocal.name;*/
    
    var nombreCampo;
    var valorCampo;
    var aDatosJson;
    aDatosJson = new Array();
    aDatosJson[0] = new Object();
    
    
    for(var iCiclo=0; iCiclo < objJsonDatos.length; iCiclo++){
        var contObjJson = objJsonDatos[iCiclo];
        
        for(var iKeys=0; iKeys < Object.keys(contObjJson).length; iKeys++){
            
            nombreCampo = Object.keys(contObjJson)[iKeys];
            valorCampo = contObjJson[nombreCampo];
            
            cambioTexto = true;
            while(cambioTexto){
                cambioTexto = false;
                try{
                    
                    if(valorCampo !== null){
                        if(valorCampo.indexOf(",") > -1){
                            valorCampo = valorCampo.replace(",","#comma"); 
                            cambioTexto = true;
                        }
                    }
                }
                catch(error){
                }
            }
            aDatosJson[0][nombreCampo] = valorCampo;   
        }
    }
    
    aDatosJson[0].p_idSesion     = recuperaDatoSesion("idSesion");
    aDatosJson[0].p_codEmpresa   = recuperaDatoSesion('codEmpresa');
    aDatosJson[0].p_codSistema   = recuperaDatoSesion('codSistema');
    aDatosJson[0].p_clavePersona = recuperaDatoSesion('clavePersona');
    
    var strJson = JSON.stringify(aDatosJson);
    p_datosJsonFormulario.datosJson = strJson;
    
    Ext.Ajax.request({
        url: '../../../../../../openLink/openLink.jsp',
        method: 'POST',
        success: function(response,opts){
            var datosJson = Ext.decode(response.responseText);
            
            /* ECRC: Implementación de la Lógica de Negocio */
            
            var idOpenLink = p_datosJsonFormulario.codProcedimiento;
            
            if(p_datosJsonFormulario.idOpenLink !== undefined){
               idOpenLink = p_datosJsonFormulario.idOpenLink;
            }
            
            generaDatosOpenLink(idOpenLink,
                                response.responseText
                               );
            /* ECRC: Función cuando se ejecuta correctamente el Script en el Servidor */
            if(datosJson.success === true ){
                cajaEspera.hide();
                if(p_fncSuccess !== undefined){
                    /* ECRC: Funcion especial a ejecutar*/
                    
                    /*--------------------------------------\
                    | ECRC: Integración de Jasper Reports.	|
                    \--------------------------------------*/
                    if(p_fncSuccess == "generaReporte"){
                        /*----------------------------------------------------------------------\
                        | ECRC: En ésta sección se general la URL para  presentar  el  Reporte	|
                        |       para que posteriormente se presente una Ventana con el Reporte	|
                        |       ya generado.													|
                        |       Los parámetros que se envían al Jasper Server son:				|
                        |       idSesion y datosJson (Con el ID Sesión y el ID Trans).			|
                        \----------------------------------------------------------------------*/
                        
                        var urlJasper = creaUrlJasper(p_paramsSuccess);
                        funcionSuccess = p_fncSuccess + "('" + urlJasper + "',p_paramsSuccess)";  
                        
                        try{
                            eval(funcionSuccess);
                        } catch(error){
                            console.error('Error en la Funcion: ' + funcionSuccess);
                            console.error(error.message);
                            console.error('Verifique la Sintaxis de la Funcion.');
                        }
                    }
                    else {
                        
                        if(p_paramsSuccess === "" || p_paramsSuccess === undefined){
                            funcionSuccess = p_fncSuccess + "(p_datosJsonFormulario,datosJson)";
                        }                        
                        else{
                            var strParametros = String(p_paramsSuccess);
                            var arrayParametros = strParametros.split(",");
                            
                            if(arrayParametros.length > 1){
                                funcionSuccess = p_fncSuccess + "(";
                                
                                for(var iCiclo=0;iCiclo<=arrayParametros.length;iCiclo++){
                                    
                                    if(arrayParametros[iCiclo] !== undefined){
                                        funcionSuccess += arrayParametros[iCiclo];
                                        if(iCiclo != (arrayParametros.length - 1)  ){
                                            funcionSuccess += ",";
                                        }
                                    }
                                }   
                                funcionSuccess += ")";
                            }
                            else{
                                funcionSuccess = p_fncSuccess + "(p_paramsSuccess)";
                            }
                        }
                        
                        try{
                            if(String(p_fncSuccess).indexOf('function') != -1){
                                funcionSuccess = p_fncSuccess;
                                funcionSuccess();
                            }else{
                                eval(funcionSuccess);
                            }
                            
                        } catch(error){
                            console.error('Error en la Funcion: ' + funcionSuccess);
                            console.error(error.message);
                            console.error('Verifique la Sintaxis de la Funcion.');
                        }
                    }
                    
                }
            }
            else{
                if(datosJson.dsRetorno != undefined){
                    /*------------------------------------------------------------------\
                    | ECRC: Errores de Lógica de Negocio encontrados en la ejecución	|
                    |       de los Procedimientos Backend.								|
                    \------------------------------------------------------------------*/
                    numRegistros = Object.keys(datosJson.dsRetorno.ttInformacion).length;
                    
                    for(var iCiclo=0; iCiclo <= numRegistros; iCiclo++){
                        if(datosJson.dsRetorno.ttInformacion[iCiclo] != null){
                            
                            if(datosJson.dsRetorno.ttInformacion[iCiclo].tipo == 'ERROR'){
                                mensajeError = '<font color=darkred size=2px><b>' + datosJson.dsRetorno.ttInformacion[iCiclo].codInformacion + ' - ';
                                mensajeError += datosJson.dsRetorno.ttInformacion[iCiclo].descInformacion + '</b></br>';
                                mensajeError += '<i>' + datosJson.dsRetorno.ttInformacion[iCiclo].adicional + '</i></font></br>';
                            }
                        }
                    }                        
                }
                
                cajaEspera.hide();
                
                if(p_modoDebug){
                    Ext.Msg.show({
                       title      : 'Error en API Backend',
                       msg        : mensajeError,
                       width      : 500,
                       buttons    : Ext.MessageBox.OK,
                       icon       : Ext.MessageBox.ERROR
                    });
                }
                
                
                
                if(p_paramsFailure === "" || p_paramsFailure === undefined){
                    p_paramsFailure = datosJson;
                    funcionFailure = p_fncFailure + "(p_datosJsonFormulario,p_paramsFailure)";
                }
                else{
                    
                    funcionFailure = p_fncFailure + "(p_paramsFailure,p_datosJsonFormulario)";                    
                }
                
                
                
                if(p_fncFailure !== undefined){
                    if(String(p_fncFailure).indexOf('function') != -1){
                        funcionFailure = p_fncFailure;
                        funcionFailure();
                    }
                    else{
                        console.info('Funcion de error: ' + p_fncFailure + ' > ' + funcionFailure);
                        console.info('Ejecutando la Funcion: ' + funcionFailure);
                        eval(funcionFailure);   
                    }
                }
            }
        },
        failure: function(response,opts){
            /* ECRC: Función cuando hay Error en la Ejecución en el Servidor */
            console.error('Servidor Fallo con el Estado: ' + response.status);
            cajaEspera.hide();
        },
        callback: function(success){
            var funcionCallback;
            if(success && p_fncCallback !== undefined){
                if(p_paramsCallback !== undefined || p_paramsCallback != ''){
                    funcionCallback = p_fncCallback + '(p_paramsCallback)';
                }
                else{
                    funcionCallback = p_fncCallback + '()';
                }
                
                try{
                    if(String(p_fncCallback).indexOf('function') != -1){
                        funcionCallback = p_fncCallback;
                        funcionCallback();
                    }else{
                        eval(funcionCallback);                        
                    }                    

                }catch(error){
                    console.error('Error en la Funcion Callback');
                    console.error(error.message);
                    console.error('Verifique la Sintaxis de la Funcion');
                }
            } 
        },
        params: p_datosJsonFormulario
    }); 
}


function EncodeUtf8 (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

function DecodeUtf8(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

function valorCampo(p_idStorage,p_nombreTabla,p_campoExtrae,p_tipo){
    var valRetorno;

    datosJson = Ext.decode(recuperaDatosOpenLink(p_idStorage));
    valRetorno = datosJson[p_nombreTabla][0][p_campoExtrae];
    
    if(p_tipo == 'NUM'){
        valRetorno = valRetorno.replace(',','');
    }
    
    return valRetorno;
}

function resultadoOpenLink(p_idStore){
    var valRetorno;
    
    datosJson = Ext.decode(recuperaDatosOpenLink(p_idStore));
    
    return datosJson;
    
}

function generaParamsProxy(p_codPrograma, p_codProcedimiento, p_datosJson){
    var objExtraParams = {
        codPrograma      : p_codPrograma,
        codProcedimiento : p_codProcedimiento,
        usuarioActivo    : recuperaDatoSesion('clavePersona'),
        datosJson        : p_datosJson,
        proxyRest        : 'true',
        codEmpresa       : recuperaDatoSesion("codEmpresa"),
        codSistema       : recuperaDatoSesion("codSistema"),
        openLinkServidor : recuperaDatoSesion('servidor'),
        openLinkServicio : recuperaDatoSesion('servicio'),
        openLinkPrograma : recuperaDatoSesion('programa')
        
    };
    
    return objExtraParams;
}