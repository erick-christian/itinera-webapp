var trex = {
    prepareFormFields : function(p_idForm){
        var objJsonData = new Object();
        var formItems = Ext.getCmp(p_idForm).items;

        for(iLoop = 0; iLoop < formItems.keys.length; iLoop++){
            var element = Ext.getCmp(formItems.keys[iLoop]);

            if(element.xtype === 'fieldset'){

                for(iLoopSet = 0; iLoopSet < element.items.keys.length; iLoopSet++){
                    var field = Ext.getCmp(element.items.keys[iLoopSet]);

                    objJsonData[field.itemId] = field.value;
                }
            }
        }

        var returnValue = JSON.stringify(objJsonData);
        return returnValue;
    },

    showAppWindow : function(p_windowId,p_title){

        var winApplication = Ext.getCmp(p_windowId);
        var appUrl = "../" + p_windowId + "/index.html";

        if(!winApplication){
            winApplication = new Ext.Window({
                title       : p_title,
                titlebar    : false,
                minWidth    : 900,
                minHeight   : 500,
                maximized   : true,
                maximizable : false,
                draggable   : false,
                closable    : false,
                ui          : 'green-window',
                modal       : true,
                id          : p_windowId,
                itemId      : p_windowId,
                layout      : 'fit',
                items : [{
                    xtype   : "component",
                    autoEl  : {
                        tag    : "iframe",
                        src    : appUrl,
                        layout : 'fit'
                    }
                }],
                listeners:{
                    resize: {
                        fn: function(){
                        }
                    }
                }

            });
        }

        trex.hideScrollBars();
        winApplicationOpen();

        function winApplicationOpen(){
            winApplication.show();
        }

        function winApplicationClose(){
            winApplication.close();
        }        
    },

    showScrollBars : function(){
        document.documentElement.style.overflow = 'auto';  // firefox, chrome
        document.body.scroll = "yes"; // ie only            
    },

    hideScrollBars : function(){
        document.documentElement.style.overflow = 'hidden';  // firefox, chrome
        document.body.scroll = "no"; // ie only
    },

    showRecord: function(p_jsonRecordData,p_recordTable){
        var fieldUpdated;
        var prefixObj = ['fi','dt','ch','cbx','ind','tf','ta'];
        var fieldForm;

        jsonObject = p_jsonRecordData[p_recordTable][0];

        if(jsonObject === undefined){
            jsonObject = p_jsonRecordData[p_recordTable];
        }

        console.log(jsonObject);

        for (var key in jsonObject) {
            for(var prefix in prefixObj){

                var valPrefix = prefixObj[prefix];

                fieldUpdated = valPrefix + trex.toCamelCase(key);

                fieldForm = Ext.getCmp(fieldUpdated);

                if(fieldForm !== undefined){
                    try{
                        var fieldValue = jsonObject[key];

                        switch(fieldForm.xtype){
                            case 'datefield':
                                fieldValue = Ext.Date.parse(fieldValue,'c');
                                fieldValue = Ext.Date.format(fieldValue,'Y/m/d');

                                var dateValue = new Date(fieldValue);

                                /*var valFecha = new Date(valAnn,valMes,valDia);*/

                                console.log(fieldValue);
                                trex.writeElement(fieldUpdated,dateValue);

                                break;
                            default:
                                trex.writeElement(fieldUpdated,fieldValue);
                        }
                        trex.disableElement(fieldUpdated);
                    }
                    catch(error){
                        console.error(fieldUpdated + '(' + jsonObject[key] + ')' + ' >> ' + error.message);
                    }
                }
            } //for - Prefix
        } //for - jsonObject  
    },   

    enableElement : function (p_elemento){
        var elemento = Ext.getCmp(p_elemento);
        if(elemento !== undefined){
            elemento.setDisabled(false);
        }
    },

    disableElement : function (p_elemento){
        var elemento = Ext.getCmp(p_elemento);
        if(elemento !== undefined){
            elemento.setDisabled(true);
        }
        else{
            console.error('disableElement - No se encontró el Componente o Elemento: ' + p_elemento);
        }
    },

    toCamelCase : function(str) {
        var stringReturn;

        stringReturn = str.replace(/_/g,' ');

        stringReturn =  stringReturn.toLowerCase()
        .replace( /['"]/g, '' )
        .replace( /\W+/g, ' ' )
        .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
        .replace( / /g, '' )
        ;

        stringReturn = stringReturn.charAt(0).toUpperCase() + stringReturn.slice(1);
        return stringReturn;
    },

    translateInterface: function(p_interfaceName){

        var objJsonData = new Object();

        objJsonData.interface = p_interfaceName;

        var objJsonRequest = new Object();
        objJsonRequest.apiController = 'apiPrepareInterface';
        objJsonRequest.apiMethod     = 'getInformation';
        objJsonRequest.apiData       = JSON.stringify(objJsonData);

        var functionSuccess = function(){

            var jsonData = trex.getInfoDataBridge('apiPrepareInterface');
            var defaultLanguage = environment.defaultLanguage();

            var languageData = jsonData.languages.filter(function (languageData){
                return languageData.name === defaultLanguage;
            })[0];

            var translations = jsonData.translations;

            for (var iLoop = 0; iLoop < translations.length; iLoop++){
                var tooltip     = 'tooltip0'     + languageData.id;
                var empty       = 'empty0'       + languageData.id;
                var translation = 'translation0' + languageData.id;

                var widgetId = translations[iLoop]['widget'];
                widgetObj = Ext.getCmp(widgetId);
                if(widgetObj !== undefined){
                    console.log(widgetObj);

                    if(widgetObj.componentCls === 'x-field'){
                        widgetObj.labelEl.update(translations[iLoop][translation]);
                        widgetObj.emptyText = translations[iLoop][empty];
                        widgetObj.applyEmptyText();
                        widgetObj.reset();
                    }

                    if(widgetObj.componentCls === 'x-btn'){
                        widgetObj.setText(translations[iLoop][translation]);
                        widgetObj.setTooltip(translations[iLoop][tooltip]);

                        /* pone un mensage despues de ejecutar
                        var toolTip = Ext.get(widgetId);
                        toolTip.set({ 
                            'data-qtitle': 'New Tooltip Title', //this line is optional
                            'data-qtip': 'Updated Tool Tip!' 
                        });
                        */
                    }
                }
            }

        };

        var functionFailure = function(){
            var jsonData = trex.getInfoDataBridge('apiPrepareInterface');
            trex.showInfo(jsonData, 'error', 'tfEmail');
        };

        trex.doDataBridge(objJsonRequest,
                          functionSuccess,
                          null,
                          functionFailure,
                          null);
    },

    focusElement: function (p_element){
        var element = Ext.getCmp(p_element);

        if(element === undefined){
            console.error('focusElement - Element was not found: ' + p_element);
            return;
        }
        element.focus(false,200);
    },

    message: function (p_type,p_title,p_message,p_function,p_format){

        var iconoMessage;
        var botonMessage;
        var botonTexto;
        var decodificaUtf8;

        switch(p_type){
            case "information": 
                iconoMessage = Ext.MessageBox.INFO;
                botonMessage = Ext.Msg.OK;
                break;
            case "question": 
                iconoMessage = Ext.MessageBox.QUESTION;
                botonMessage = Ext.Msg.YESNO;
                botonTexto   = {                        
                    yes: 'Confirmar',
                    no: 'Cerrar'
                };
                break;
            case "warning": 
                iconoMessage = Ext.MessageBox.WARNING;
                botonMessage = Ext.Msg.OK;
                break;
            case "error": 
                iconoMessage = Ext.MessageBox.ERROR;
                botonMessage = Ext.Msg.OK;
                break;
        }

        if(p_message.indexOf("á") > 0 ||
           p_message.indexOf("é") > 0 ||
           p_message.indexOf("í") > 0 ||
           p_message.indexOf("ó") > 0 ||
           p_message.indexOf("ú") > 0 ||
           p_message.indexOf("ñ") > 0
          ){
            decodificaUtf8 = false;
        }
        else{
            decodificaUtf8 = true;
        }

        if(decodificaUtf8 === true){
            p_message = Ext.encode(p_message);
        }

        /*--------------------------------------\
    | ECRC: Formato especial del Message.	|
    \--------------------------------------*/
        var widthMessage = 400;
        if(p_format!== undefined && p_format.width !== undefined){
            widthMessage = p_format.width;
        }

        Ext.Msg.show({
            title  : p_title,
            msg    : p_message,
            icon   : iconoMessage,
            buttons: botonMessage,
            buttonText: botonTexto,
            fn     : function(btn){

                if(btn=='yes' || btn=='ok'){
                    if(p_function !== '' && p_function !== undefined){

                        if(String(p_function).indexOf('function') != -1){
                            p_function();
                        }
                        else{
                            eval(p_function);
                        }

                    }
                }
            },
            width  : widthMessage
        });    
    },    

    showInfo: function(p_infoDataBridge, p_type, p_fieldFocus, p_messageFunction){

        if(p_infoDataBridge === undefined){
            return;
        }

        console.log('showing info');
        console.log(p_infoDataBridge);

        var numRecords = Object.keys(p_infoDataBridge.message).length;
        var dataInformation = '';


        for(var iCiclo=0; iCiclo < numRecords; iCiclo++){
            if(p_infoDataBridge.message[iCiclo] !== null){

                dataMessage = p_infoDataBridge.message[iCiclo];

                console.log('dataMessage');
                console.log(dataMessage);

                if(dataMessage.type !== undefined && dataMessage.type == 'info-api'){
                    dataInformation = dataInformation + dataMessage.message + '</br></br>';
                }
            }
        }

        var msgTitulo    = '';
        switch(p_type){
            case 'information':
                msgTitulo = 'System Information';
                break;
            case 'question':
                msgTitulo = 'System Question';
                break;
            case 'warning':
                msgTitulo = 'System Warning';
                break;
            case 'error':
                msgTitulo = 'System Error';
                break;
            default:                
        }

        var msgTipo      = p_type;
        var msgContenido = dataInformation;
        var msgFuncion   = function(){
            if(p_fieldFocus !== undefined){
                trex.focusElement(p_fieldFocus);
            }

            if(p_messageFunction !== undefined){
                console.log('vba a ejecutar una funcion extra');
                console.log(p_messageFunction);

                p_messageFunction();
            }
        };

        var msgFormato   = {};
        msgFormato.width = 500;

        this.message(msgTipo,
                     msgTitulo,
                     msgContenido,
                     msgFuncion,
                     msgFormato
                    );        
    },

    writeElement: function (p_elemento,
                             p_valor,
                             p_tipo){

        var valorElemento = p_valor;
        var elemento = Ext.getCmp(p_elemento);

        if(elemento === undefined){
            console.error('writeElement - No se encontró el Componente o Elemento: ' + p_elemento);
            return;
        }

        if(p_valor === 'NULL' ||
           p_valor === undefined ||
           p_valor === null){
            p_valor = '';
        }

        if(p_valor !== '' || p_valor !== null){
            if(elemento.xtype !== 'datefield'){
                if(p_valor !== undefined){

                    p_valor = Ext.util.Format.htmlDecode(p_valor);
                }
            }
        }

        if(elemento !== undefined){
            switch(elemento.xtype){
                case 'textfield':
                    elemento.setValue(p_valor);
                    break;
                case 'tbtext':
                    elemento.update(p_valor);
                    break;
                case 'label':
                    elemento.update(p_valor);
                    break;
                case 'checkboxfield':
                    if(p_valor === 'true' || p_valor === 'yes'){
                        elemento.setValue(true);
                    }
                    else{
                        elemento.setValue(false);
                    }
                    break;
                default:
                    elemento.setValue(p_valor);
            }

            if(isNaN(p_valor) === false){
                if(p_tipo == "INT"){
                    Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000'));
                }

                if(p_tipo == "DEC"){
                    Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000.00'));
                }

                if(p_tipo == "VAL"){
                    Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000.00000'));
                }
            }

            /*--------------------------------------------------\
        | ECRC: Asignación de Valores para Campos Fecha.	|
        \--------------------------------------------------*/
            var elementoDate = Ext.getCmp(p_elemento);

            if(elementoDate.xtype === 'datefield'){ 
                if(p_valor            !== 'NULL' &&
                   p_valor            !== ''     &&
                   p_valor            !== null   &&
                   p_valor            !== undefined){

                    if(typeof(p_valor) == 'object'){
                        elementoDate.setValue(p_valor);
                    }
                    else{
                        var valDia   = p_valor.substring(0,2);
                        var valMes   = p_valor.substring(3,5) - 1;
                        var valAnn   = p_valor.substring(6,10);
                        var valFecha = new Date(valAnn,valMes,valDia);
                        elementoDate.setValue(valFecha);
                    }
                }
                else{
                    elementoDate.setValue(null);
                }
            }
        }
        else{
            var mensaje = 'No se encontro el Elemento con Id  o itemId en la Interfaz: ' + p_elemento;
            console.error(mensaje);
        }

    },    
    readElement: function (p_element,p_type){
        var valRetorno = "";
        var Elemento = Ext.getCmp(p_element);

        if(Elemento === undefined){
            console.error('readElement - Element was not found by ID: ' + p_element);
            return;
        }    

        var tipoElemento = Elemento.getXType();

        switch(tipoElemento){
            case 'datefield':
                valRetorno = Ext.getCmp(p_element).getSubmitValue();

                if(p_type === 'date'){
                    var dia = valRetorno.substring(0,2);
                    var mes = valRetorno.substring(3,5);
                    var ann = valRetorno.substring(8,10);

                    valRetorno = dia + "-" + mes + "-" + ann;
                }            
                break;
            case 'timefield':
                valRetorno = Ext.getCmp(p_element).getValue();
                valRetorno = Ext.Date.format(valRetorno, 'H:i');
                valRetorno = valRetorno.replace(':','|');
                break;
            case 'radiogroup':
                var radioGroup = Ext.getCmp(p_element).getValue();
                valRetorno = radioGroup[p_element];            
                break;
            case 'checkbox':
                valRetorno = Ext.getCmp(p_element).getValue().toString();
                break;
            default:
                valRetorno = Ext.getCmp(p_element).getValue();
        }

        if(p_type === 'number'){
            /* ECRC: Cleaning the number format  */
            valRetorno = valRetorno.replace("$","");
            valRetorno = valRetorno.split(",").join('');
        }

        if(typeof valRetorno == 'string'){
            valRetorno = valRetorno.trim();
        }
        return valRetorno;
    },


    carga: function (){
        alert('cargado');
        console.log('funcion de carga');
    },
    setInfoDataBridge: function (p_idStore, 
                                  p_respuestaJson){

        Ext.define('modDataBridge',
                   {
                       extend: 'Ext.data.Model',
                       fields: [
                           {name: 'idStore', type:'string'},
                           {name: 'respuestaJson', type:'string'}
                       ]
                   });

        Ext.define('storeDataBridge',
                   {
                       extend: 'Ext.data.Store',
                       model: 'modDataBridge',
                       proxy:{
                           type: 'sessionstorage',
                           id: p_idStore
                       }
                   });

        var storeDataBridge = Ext.create('storeDataBridge');
        storeDataBridge.getProxy().clear();

        storeDataBridge.add({
            idStore: p_idStore,
            respuestaJson: p_respuestaJson
        });

        storeDataBridge.sync();  
    },

    getInfoDataBridge : function (p_idStore){

        Ext.define('modDataBridge',
                   {
                       extend: 'Ext.data.Model',
                       fields: [
                           {name: 'idStore', type:'string'},
                           {name: 'respuestaJson', type:'string'}
                       ]
                   });

        Ext.define('storeDataBridge',
                   {
                       extend: 'Ext.data.Store',
                       model: 'modDataBridge',
                       proxy:{
                           type: 'sessionstorage',
                           id: p_idStore
                       }
                   });

        var valRetorno = '';
        var storeDataBridge = Ext.create('storeDataBridge');

        Ext.define('storeDataBridge',
                   {
                       extend: 'Ext.data.Store',
                       model: 'modDataBridge',
                       proxy:{
                           type: 'sessionstorage',
                           id: 'openLink'
                       }
                   });

        storeDataBridge.load(function(records,op,success){
            var infoDataBridge, iCiclo;

            for (iCiclo=0; iCiclo<records.length; iCiclo++){
                infoDataBridge = records[iCiclo].data;
                //valRetorno = Ext.decode(infoDataBridge.respuestaJson);
                valRetorno = infoDataBridge.respuestaJson;

            }

            return valRetorno;
        });

        valRetorno = Ext.decode(valRetorno);
        return valRetorno;
    },    

    doDataBridge: function (p_jsonDataForm,
                             p_fncSuccess,
                             p_paramsSuccess,
                             p_fncFailure,
                             p_paramsFailure,
                             p_fncCallback,
                             p_paramsCallback,
                             p_modoDebug){


        console.log('xsfr');
        console.log('<?php echo csrf_field(); ?>');

        var funcionSuccess;
        var funcionFailure;
        var cajaEspera = Ext.MessageBox.show({
            msg: 'Por favor espere, procesando informacion...',
            progressText: 'Procesando',
            width:300,
            wait:true,
            waitConfig: {interval:170}
        });

        var nombreCampo;
        var valorCampo;
        var aDatosJson;
        aDatosJson = new Array();
        aDatosJson[0] = new Object();

        var tokenLaravel = Ext.util.Cookies.get('XSRF-TOKEN');
        if(tokenLaravel !== null){
            p_jsonDataForm._token = tokenLaravel;
        }

        p_jsonDataForm.defaultLanguage = environment.defaultLanguage();

        var urlAjax = '../../backend/public/dataBridge/' + p_jsonDataForm.apiController;


        Ext.Ajax.request({
            url: urlAjax,
            method: 'POST',
            headers:{
                'XSRF-TOKEN': tokenLaravel
            },
            params: p_jsonDataForm,
            success: function(response,opts){
                var jsonData = Ext.decode(response.responseText);
                var idDataBridge = p_jsonDataForm.apiController;

                if(p_jsonDataForm.apiController !== undefined){
                    idDataBridge = p_jsonDataForm.apiController;
                }

                trex.setInfoDataBridge(idDataBridge,
                                       response.responseText
                                      );

                /* ECRC: Función cuando se ejecuta correctamente el Script en el Servidor */
                if(jsonData.success === true ){
                    cajaEspera.hide();
                    if(p_fncSuccess !== undefined){
                        /*--------------------------------------\
                     | ECRC: Integración de Jasper Reports.	|
                     \--------------------------------------*/
                        if(p_fncSuccess == "generaReporte"){
                            /*----------------------------------------------------------------------\
                         | ECRC: En ésta sección se general la URL para  presentar  el  Reporte	|
                         |       para que posteriormente se presente una Ventana con el Reporte	|
                         |       ya generado.													|
                         |       Los parámetros que se envían al Jasper Server son:				|
                         |       idSesion y jsonData (Con el ID Sesión y el ID Trans).			|
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
                                funcionSuccess = p_fncSuccess + "(p_jsonDataForm,jsonData)";
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
                    if(jsonData.dsRetorno != undefined){
                        /*------------------------------------------------------------------\
                     | ECRC: Errores de Lógica de Negocio encontrados en la ejecución	|
                     |       de los Procedimientos Backend.								|
                     \------------------------------------------------------------------*/
                        numRecords = Object.keys(jsonData.dsRetorno.ttInformacion).length;

                        for(var iCiclo=0; iCiclo <= numRecords; iCiclo++){
                            if(jsonData.dsRetorno.ttInformacion[iCiclo] != null){

                                if(jsonData.dsRetorno.ttInformacion[iCiclo].tipo == 'ERROR'){
                                    mensajeError = '<font color=darkred size=2px><b>' + jsonData.dsRetorno.ttInformacion[iCiclo].codInformacion + ' - ';
                                    mensajeError += jsonData.dsRetorno.ttInformacion[iCiclo].descInformacion + '</b></br>';
                                    mensajeError += '<i>' + jsonData.dsRetorno.ttInformacion[iCiclo].adicional + '</i></font></br>';
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
                        p_paramsFailure = jsonData;
                        funcionFailure = p_fncFailure + "(p_jsonDataForm,p_paramsFailure)";
                    }
                    else{

                        funcionFailure = p_fncFailure + "(p_paramsFailure,p_jsonDataForm)";
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
            }

        });
    }
};





