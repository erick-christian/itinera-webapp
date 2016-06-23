function cambiaFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.href = src;
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

function codificaOpenLink(p_objJson) {
    var cadenaObjeto = Ext.encode(p_objJson);

    cadenaObjeto = '#ini#' + cadenaObjeto + '#fin#';

    if (cadenaObjeto.indexOf('"')) {
        cadenaObjeto = cadenaObjeto.split('"').join('&#34;');
    }

    if (cadenaObjeto.indexOf(':')) {
        cadenaObjeto = cadenaObjeto.split(':').join('&#58;');
    }
    if (cadenaObjeto.indexOf('{')) {
        cadenaObjeto = cadenaObjeto.split('{').join('&#123;');
    }

    if (cadenaObjeto.indexOf('}')) {
        cadenaObjeto = cadenaObjeto.split('}').join('&#125;');
    }

    if (cadenaObjeto.indexOf('/')) {
        cadenaObjeto = cadenaObjeto.split('/').join('&#47;');
    }

    return cadenaObjeto;
}

function decodificaOpenLink(p_cadenaObjeto) {
    var objJson = p_cadenaObjeto;

    if (objJson.indexOf('&#34;')) {
        objJson = objJson.split('&#34;').join('"');
    }

    if (objJson.indexOf('&#58;')) {
        objJson = objJson.split('&#58;').join(':');
    }

    if (objJson.indexOf('&#123;')) {
        objJson = objJson.split('&#123;').join('{');
    }

    if (objJson.indexOf('&#125;')) {
        objJson = objJson.split('&#125;').join('}');
    }

    if (objJson.indexOf('&#47;')) {
        objJson = objJson.split('&#47;').join('/');
    }

    if (objJson.indexOf('#ini#')) {
        objJson = objJson.split('#ini#').join('');
    }

    objJson = objJson.replace('#ini#', '');

    if (objJson.indexOf('#fin#')) {
        objJson = objJson.split('#fin#').join('');
    }

    if (objJson !== '') {
        objJson = Ext.decode(objJson);
    }

    return objJson;
}

function convierteAscci(p_valor) {
    var caracteresAscci = true;

    while (caracteresAscci) {
        caracteresAscci = false;
        if (p_valor.indexOf('&#193;') > -1) {
            p_valor = p_valor.replace('&#193;', 'Á');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#225;') > -1) {
            p_valor = p_valor.replace('&#225;', 'á');
            caracteresAscci = true;
        }


        if (p_valor.indexOf('&#201;') > -1) {
            p_valor = p_valor.replace('&#201;', 'É');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#233;') > -1) {
            p_valor = p_valor.replace('&#233;', 'é');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#205;') > -1) {
            p_valor = p_valor.replace('&#205;', 'Í');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#237;') > -1) {
            p_valor = p_valor.replace('&#237;', 'í');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#211;') > -1) {
            p_valor = p_valor.replace('&#211;', 'Ó');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#243;') > -1) {
            p_valor = p_valor.replace('&#243;', 'ó');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#218;') > -1) {
            p_valor = p_valor.replace('&#218;', 'Ú');
            caracteresAscci = true;
        }


        if (p_valor.indexOf('&#250;') > -1) {
            p_valor = p_valor.replace('&#250;', 'ú');
            caracteresAscci = true;
        }


        if (p_valor.indexOf('&#209;') > -1) {
            p_valor = p_valor.replace('&#209;', 'Ñ');
            caracteresAscci = true;
        }

        if (p_valor.indexOf('&#241;') > -1) {
            p_valor = p_valor.replace('&#241;', 'ñ');
            caracteresAscci = true;
        }
    }
    return p_valor;
}

function ocultarElemento(p_IdElemento) {
    var elemento = Ext.getCmp(p_IdElemento);
    if (elemento !== undefined) {
        elemento.setVisible(false);
    }
    else {
        console.error('ocultarElemento - No se encontro el elemento ' + p_IdElemento);
    }
}

function mostrarElemento(p_IdElemento) {
    var elemento = Ext.getCmp(p_IdElemento);
    if (elemento !== undefined) {
        elemento.setVisible(true);
    }
    else {
        console.error('mostrarElemento - No se encontro el elemento ' + p_IdElemento);
    }
}


/*------------------------------------------------------------------------------\
 | ECRC: Funcion para tomar el Valor de una Columna de una Fila Seleccionada.	|
 \------------------------------------------------------------------------------*/
function valorGridColumna(p_IdGrid, p_columna) {
    var gridProto = Ext.getCmp(p_IdGrid);
    var selectionModel = gridProto.getSelectionModel();
    var selectionCount = selectionModel.getCount();

    if (selectionCount === 0) {
        selectionModel.select(0);
    }

    var selectedRecords = selectionModel.getSelection();
    var valorRetorno = selectedRecords[0].get(p_columna);

    return valorRetorno;
}

/*----------------------------------------------------------\
 | ECRC: Funcion para Totalizar Valores de Columnas de Grid.	|
 \----------------------------------------------------------*/
function valTotalColumna(p_datos) {
    var valorColumna = p_datos;
    var resultado = '';
    var valorDato = '';
    var valResultado = 0;
    var insertaLimite = 0;
    var aDatos;

    resultado = '';

    for (var iCiclo = 0; iCiclo <= valorColumna.length; iCiclo++) {
        if (valorColumna.substr(iCiclo, 1) != ' ') {
            resultado = resultado + valorColumna.substr(iCiclo, 1);
            insertaLimite = 0;
        }

        if (valorColumna.substr(iCiclo, 1) == ' ' && insertaLimite === 0) {
            resultado = resultado + '|';
            insertaLimite = 1;
        }
    }

    aDatos = resultado.split('|');

    for (var iCiclo = 0; iCiclo <= aDatos.length; iCiclo++) {
        valorDato = aDatos[iCiclo];

        if (valorDato !== undefined) {
            valorDato = valorDato.replace(',', '');
            valResultado += parseFloat(valorDato);
        } //Diferente de undefined

    }

    resultado = '<b><font color=red>' + Ext.util.Format.number(valResultado, '0,000.00') + '</font></b>';

    return resultado;
}

function asignaDatosComboBox(p_idComboBox,
                             p_datosJson,
                             p_nombreTabla,
                             p_elementoClave,
                             p_elementoDescripcion,
                             p_valorDefault,
                             p_filtrarPor,
                             p_modoDebug) {

    var nombreEntidad;
    var nombreStore;
    var storeCombo;
    var datosJson;
    var valCampoClave;
    var valCampoDesc;
    var datosComboBox;
    var numRegistros;
    var primerValor;
    var comboEstandar;

    p_elementoClave = p_elementoClave.toLowerCase();
    p_elementoDescripcion = p_elementoDescripcion.toLowerCase();

    datosJson = p_datosJson;
    nombreEntidad = p_idComboBox.substring(3, p_idComboBox.length);
    nombreStore = 'store' + nombreEntidad;
    storeCombo = Ext.getStore(nombreStore);

    if (storeCombo === undefined) {
        nombreEntidad = p_idComboBox.substring(4, p_idComboBox.length);
        nombreStore = 'store' + nombreEntidad.toLowerCase();
        storeCombo = Ext.getStore(nombreStore);
    }

    if (storeCombo === undefined) {
        console.error('No se encontró el Store: ' + nombreStore);
    }

    valCampoClave = '';
    valCampoDesc = '';
    datosComboBox = new Array();
    comboEstandar = Ext.getCmp(p_idComboBox);

    if (comboEstandar === undefined) {
        comboEstandar = window.parent.Ext.getCmp(p_idComboBox);
    }

    if (comboEstandar === undefined) {
        console.error('No se encontró el ComboBox: ' + p_idComboBox);
    }

    numRegistros = Object.keys(datosJson[p_nombreTabla]).length;

    primerValor = '';
    for (var iCiclo = 0; iCiclo <= numRegistros; iCiclo++) {
        if (datosJson[p_nombreTabla][iCiclo] != null) {

            if (primerValor === '') {
                primerValor = datosJson[p_nombreTabla][iCiclo][p_elementoClave];

            }

            valCampoClave = datosJson[p_nombreTabla][iCiclo][p_elementoClave];
            valCampoDesc = datosJson[p_nombreTabla][iCiclo][p_elementoDescripcion];
            valCampoDesc = convierteAscci(valCampoDesc);

            datosComboBox[iCiclo] = [valCampoClave, valCampoDesc];
        }
    }

    /* ECRC: Cargando la informacion en el ComboBox */
    storeCombo.loadData(datosComboBox, false);


    /* ECRC: Implementando el valor por defecto     */
    if (p_valorDefault !== '' && p_valorDefault !== undefined) {
        comboEstandar.setValue(p_valorDefault);
    }

    if (p_valorDefault === undefined) {
        comboEstandar.setValue(primerValor);
    }

    if (p_valorDefault === '') {
        comboEstandar.setValue(primerValor);
    }

}

/*----------------------------------------------\
 | ECRC: Funciones de Manipulación de ComboBox.	|
 \----------------------------------------------*/
function cargaComboBox(p_idComboBox,
                       p_codPrograma,
                       p_codProcedimiento,
                       p_nombreTabla,
                       p_elementoClave,
                       p_elementoDescripcion,
                       p_valorDefault,
                       p_filtrarPor,
                       p_appServerDatos,
                       p_modoDebug,
                       p_funcionExito,
                       p_funcionFallo) {

    var nombreEntidad;
    var nombreStore;
    var storeCombo;
    var strJson;
    var datosJsonFormulario;
    var comboEstandar;
    var mensajeError;
    var codEmpresa = recuperaDatoSesion();
    var codSistema = '';

    codEmpresa = recuperaDatoSesion("codEmpresa");
    codSistema = recuperaDatoSesion("codSistema");
    nombreEntidad = p_idComboBox.substring(3, p_idComboBox.length);
    nombreStore = 'store' + nombreEntidad;
    storeCombo = Ext.getStore(nombreStore);

    if (storeCombo === undefined) {
        nombreEntidad = p_idComboBox.substring(4, p_idComboBox.length);
        nombreStore = 'store' + nombreEntidad;
        storeCombo = Ext.getStore(nombreStore);
    }
    if (storeCombo === undefined) {
        nombreEntidad = p_idComboBox.substring(4, p_idComboBox.length);
        nombreStore = 'store' + nombreEntidad.toLowerCase();
        storeCombo = Ext.getStore(nombreStore);
    }

    if (storeCombo === undefined) {
        console.error('No se encontró el Store: ' + nombreStore);
    }

    arrayInformacion = new Array();
    arrayInformacion[0] = new Object();
    arrayInformacion[0].p_filtrarPor = p_filtrarPor;

    /*------------------------------------------\
     | ECRC: Implementando llamadas AppServer.	|
     \------------------------------------------*/
    if ((typeof p_appServerDatos != 'undefined') && p_appServerDatos !== null) {
        if (p_appServerDatos.p_AppServerApi !== null &&
            p_appServerDatos.p_AppServerApi !== undefined) {

            arrayInformacion[0].p_idSesion = p_appServerDatos.p_idSesion;
            arrayInformacion[0].p_clavePersona = p_appServerDatos.p_clavePersona;
            arrayInformacion[0].p_codEmpresaSel = p_appServerDatos.p_codEmpresaSel;
            arrayInformacion[0].p_codSucursalSel = p_appServerDatos.p_codSucursalSel;
            arrayInformacion[0].p_codSistema = p_appServerDatos.p_codSistema;
            arrayInformacion[0].p_AppServerApi = p_appServerDatos.p_AppServerApi;
            arrayInformacion[0].p_AppServerProcedure = p_appServerDatos.p_AppServerProcedure;
        }
        else {
            console.warning('No se informó los datos de Ejecución de AppServer');
        }
    }

    strJson = JSON.stringify(arrayInformacion);

    var servidorOpenLink;
    var servicioOpenLink;
    var programaOpenLink;

    if (typeof datosOpenLink == 'function') {
        servidorOpenLink = datosOpenLink('servidor');
        servicioOpenLink = datosOpenLink('servicio');
        programaOpenLink = datosOpenLink('programa');
    }
    else {
        var objAmbienteOpenLink = Ext.decode(recuperaDatosOpenLink('ambienteOpenLink'));
        servidorOpenLink = objAmbienteOpenLink.servidor;
        servicioOpenLink = objAmbienteOpenLink.servicio;
        programaOpenLink = objAmbienteOpenLink.programa;
    }

    datosJsonFormulario = {
        codPrograma: p_codPrograma,
        codProcedimiento: p_codProcedimiento,
        tipoLlamada: "combobox",
        usuarioActivo: "",
        datosJson: strJson,
        codEmpresa: codEmpresa,
        codSistema: codSistema,
        openLinkServidor: servidorOpenLink,
        openLinkServicio: servicioOpenLink,
        openLinkPrograma: programaOpenLink
    };
    comboEstandar = Ext.getCmp(p_idComboBox);

    if (comboEstandar === undefined) {
        comboEstandar = window.parent.Ext.getCmp(p_idComboBox);
    }

    if (comboEstandar === undefined) {
        console.error('No se encontró el ComboBox: ' + p_idComboBox);
    }

    var cajaEspera = Ext.MessageBox.show({
        msg: 'Por favor espere, extrayendo informacion...',
        progressText: 'Procesando',
        width: 300,
        wait: true,
        waitConfig: {interval: 200}
    });

    Ext.Ajax.request({
        url: '../../../../../../openLink/openLink.jsp',
        method: 'POST',
        success: function (response, opts) {

            var datosJson;
            var valCampoClave;
            var valCampoDesc;
            var datosComboBox;
            var numRegistros;
            var primerValor;
            var existeValorDefault = false;

            /* ECRC: Función cuando se ejecuta correctamente el Script en el Servidor */
            datosJson = Ext.decode(response.responseText);

            if (datosJson.success === true) {
                /* ECRC: API ejecutada correctamente y sin Errores */

                valCampoClave = '';
                valCampoDesc = '';
                datosComboBox = new Array();

                numRegistros = Object.keys(datosJson[p_nombreTabla]).length;
                primerValor = '';
                for (var iCiclo = 0; iCiclo < numRegistros; iCiclo++) {
                    if (datosJson[p_nombreTabla][iCiclo] !== null) {

                        if (primerValor === '') {
                            primerValor = datosJson[p_nombreTabla][iCiclo][p_elementoClave];
                        }

                        valCampoClave = datosJson[p_nombreTabla][iCiclo][p_elementoClave];
                        valCampoDesc = datosJson[p_nombreTabla][iCiclo][p_elementoDescripcion];
                        valCampoDesc = convierteAscci(valCampoDesc);

                        datosComboBox[iCiclo] = [valCampoClave, valCampoDesc];

                        /* Validando si el Valor Default Existe */
                        if (valCampoClave == p_valorDefault) {
                            existeValorDefault = true;
                        }
                    }
                }

                /* ECRC: Cargando la informacion en el ComboBox */
                storeCombo.loadData(datosComboBox, false);

                /* ECRC: Implementando el valor por defecto     */
                if (p_valorDefault !== '') {
                    comboEstandar.setValue(p_valorDefault);
                }

                if (p_valorDefault === undefined || p_valorDefault === '') {
                    comboEstandar.setValue(primerValor);
                }

                if (existeValorDefault === false) {
                    comboEstandar.setValue(primerValor);
                }

                cajaEspera.hide();

                if (p_funcionExito !== null && p_funcionExito !== undefined) {
                    try {
                        p_funcionExito();
                    } catch (error) {
                        console.error('Error en la Funcion: ' + p_funcionExito);
                        console.error(error.message);
                        console.error('Verifique la Sintaxis de la Funcion.');
                    }
                }
                return;
            }
            else {
                /* ECRC: Errores encontrados en la API */

                numRegistros = Object.keys(datosJson.dsRetorno.ttInformacion).length;

                for (var iCiclo = 0; iCiclo <= numRegistros; iCiclo++) {
                    if (datosJson.dsRetorno.ttInformacion[iCiclo] != null) {

                        if (datosJson.dsRetorno.ttInformacion[iCiclo].tipo == 'ERROR') {
                            mensajeError = '<font color=darkred size=2px><b>' + datosJson.dsRetorno.ttInformacion[iCiclo].codInformacion + ' - ';
                            mensajeError += datosJson.dsRetorno.ttInformacion[iCiclo].descInformacion + '</b></br>';
                            mensajeError += '<i>' + datosJson.dsRetorno.ttInformacion[iCiclo].adicional + '</i></font></br>';
                        }
                    }
                }

                cajaEspera.hide();

                if (p_funcionFallo !== null) {
                    try {
                        p_funcionFallo();

                    } catch (error) {
                        console.error('Error en la Funcion: ' + p_funcionFallo);
                        console.error(error.message);
                        console.error('Verifique la Sintaxis de la Funcion.');
                    }
                }

                if (p_modoDebug === true) {
                    Ext.Msg.show({
                        title: 'Error en API Backend',
                        msg: mensajeError,
                        width: 500,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }

                /* ECRC: Cargando la informacion en el ComboBox */
                datosComboBox = '';
                storeCombo.loadData(datosComboBox, false);
                comboEstandar.setValue('');
                return;
            }
        },
        failure: function (response, opts) {
            /* ECRC: Función cuando hay Error en la Ejecución en el Servidor */
            console.error('Servidor falló con el Código ' + response.status);
            return;
        },
        params: datosJsonFormulario
    });
    return;
}


function asignaValorElemento(p_elemento,
                             p_valor,
                             p_tipo) {

    var valorElemento = p_valor;
    var elemento = Ext.getCmp(p_elemento);

    if (elemento === undefined) {
        console.error('asignaValorElemento - No se encontró el Componente o Elemento: ' + p_elemento);
        return;
    }

    if (p_valor === 'NULL' ||
        p_valor === undefined ||
        p_valor === null) {
        p_valor = '';
    }

    if (p_valor !== '' || p_valor !== null) {
        if (elemento.xtype !== 'datefield') {
            if (p_valor !== undefined) {

                p_valor = Ext.util.Format.htmlDecode(p_valor);
            }
        }
    }

    if (elemento !== undefined) {
        switch (elemento.xtype) {
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
                if (p_valor === 'true' || p_valor === 'yes') {
                    elemento.setValue(true);
                }
                else {
                    elemento.setValue(false);
                }
                break;
            default:
                elemento.setValue(p_valor);
        }

        if (isNaN(p_valor) === false) {
            if (p_tipo == "INT") {
                Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000'));
            }

            if (p_tipo == "DEC") {
                Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000.00'));
            }

            if (p_tipo == "VAL") {
                Ext.getCmp(p_elemento).setValue(Ext.util.Format.number(p_valor, '0,000.00000'));
            }
        }

        /*--------------------------------------------------\
         | ECRC: Asignación de Valores para Campos Fecha.	|
         \--------------------------------------------------*/
        var elementoDate = Ext.getCmp(p_elemento);

        if (elementoDate.xtype === 'datefield') {
            if (p_valor !== 'NULL' &&
                p_valor !== '' &&
                p_valor !== null &&
                p_valor !== undefined) {

                if (typeof(p_valor) == 'object') {
                    elementoDate.setValue(p_valor);
                }
                else {
                    var valDia = p_valor.substring(0, 2);
                    var valMes = p_valor.substring(3, 5) - 1;
                    var valAnn = p_valor.substring(6, 10);
                    var valFecha = new Date(valAnn, valMes, valDia);
                    elementoDate.setValue(valFecha);
                }
            }
            else {
                elementoDate.setValue(null);
            }
        }
    }
    else {
        var mensaje = 'No se encontro el Elemento con Id  o itemId en la Interfaz: ' + p_elemento;
        console.error(mensaje);
    }

}

function leeValorElemento(p_elemento, p_tipo) {
    var valRetorno = "";
    var Elemento = Ext.getCmp(p_elemento);

    if (Elemento === undefined) {
        console.error('leeValorElemento - No se encontró el Elemento o Componente: ' + p_elemento);
        return;
    }

    var tipoElemento = Elemento.getXType();

    switch (tipoElemento) {
        case 'datefield':
            valRetorno = Ext.getCmp(p_elemento).getSubmitValue();

            if (p_tipo === "FECHA") {
                var dia = valRetorno.substring(0, 2);
                var mes = valRetorno.substring(3, 5);
                var ann = valRetorno.substring(8, 10);

                valRetorno = dia + "-" + mes + "-" + ann;
            }
            break;
        case 'timefield':
            valRetorno = Ext.getCmp(p_elemento).getValue();
            valRetorno = Ext.Date.format(valRetorno, 'H:i');
            valRetorno = valRetorno.replace(':', '|');
            break;
        case 'radiogroup':
            var radioGroup = Ext.getCmp(p_elemento).getValue();
            valRetorno = radioGroup[p_elemento];
            break;
        case 'checkbox':
            valRetorno = Ext.getCmp(p_elemento).getValue().toString();
            break;
        default:
            valRetorno = Ext.getCmp(p_elemento).getValue();
    }

    if (p_tipo === "NUM") {
        /* ECRC: Eliminando los Caracteres de formato numérico */
        valRetorno = valRetorno.replace("$", "");
        valRetorno = valRetorno.split(",").join('');
    }

    if (typeof valRetorno == 'string') {
        valRetorno = valRetorno.trim();
    }
    return valRetorno;
}


function textoBoton(p_idBoton, p_texto) {
    Ext.getCmp(p_idBoton).setText(p_texto);
}

function habilitaElemento(p_elemento) {
    var elemento = Ext.getCmp(p_elemento);
    if (elemento !== undefined) {
        elemento.setDisabled(false);
    }
}

function deshabilitaElemento(p_elemento) {
    var elemento = Ext.getCmp(p_elemento);
    if (elemento !== undefined) {
        elemento.setDisabled(true);
    }
    else {
        console.error('deshabilitaElemento - No se encontró el Componente o Elemento: ' + p_elemento);
    }
}

function formatoEntero(componente) {
    var newValue = componente.value;
    componente.setValue(Ext.util.Format.number(newValue.replace(/[,]/g, ''), '0,0'));
}

function formatoDecimal(componente) {
    var newValue = componente.value;
    componente.setValue(Ext.util.Format.number(newValue.replace(/[,]/g, ''), '0,0.00'));
}

function formatoMoneda(componente) {
    var newValue = componente.value;
    componente.setValue(Ext.util.Format.number(newValue.replace(/[,]/g, ''), '$0,0.00'));
}

function mensajeUsr(p_tipo, p_titulo, p_mensaje, p_funcion, p_formato) {

    var iconoMensaje;
    var botonMensaje;
    var botonTexto;
    var decodificaUtf8;

    switch (p_tipo) {
        case "INFO":
            iconoMensaje = Ext.MessageBox.INFO;
            botonMensaje = Ext.Msg.OK;
            break;
        case "PREGUNTA":
            iconoMensaje = Ext.MessageBox.QUESTION;
            botonMensaje = Ext.Msg.YESNO;
            botonTexto = {
                yes: 'Confirmar',
                no: 'Cerrar'
            };
            break;
        case "ADVERTENCIA":
            iconoMensaje = Ext.MessageBox.WARNING;
            botonMensaje = Ext.Msg.OK;
            break;
        case "ERROR":
            iconoMensaje = Ext.MessageBox.ERROR;
            botonMensaje = Ext.Msg.OK;
            break;
    }

    if (p_mensaje.indexOf("á") > 0 ||
        p_mensaje.indexOf("é") > 0 ||
        p_mensaje.indexOf("í") > 0 ||
        p_mensaje.indexOf("ó") > 0 ||
        p_mensaje.indexOf("ú") > 0 ||
        p_mensaje.indexOf("ñ") > 0
    ) {
        decodificaUtf8 = false;
    }
    else {
        decodificaUtf8 = true;
    }

    if (decodificaUtf8 === true) {
        p_mensaje = DecodeUtf8(p_mensaje);
    }

    /*--------------------------------------\
     | ECRC: Formato especial del Mensaje.	|
     \--------------------------------------*/
    var anchoMensaje = 400;
    if (p_formato !== undefined && p_formato.ancho !== undefined) {
        anchoMensaje = p_formato.ancho;
    }


    Ext.Msg.show({
        title: p_titulo,
        msg: p_mensaje,
        icon: iconoMensaje,
        buttons: botonMensaje,
        buttonText: botonTexto,
        fn: function (btn) {

            if (btn == 'yes' || btn == 'ok') {
                if (p_funcion !== '' && p_funcion !== undefined) {

                    if (String(p_funcion).indexOf('function') != -1) {
                        p_funcion();
                    }
                    else {
                        eval(p_funcion);
                    }

                }
            }
        },
        width: anchoMensaje
    });
}

function mensajeRetornoError(p_storage, p_tabla) {
    var p_ok = valorCampo(p_storage,
        p_tabla,
        "p_ok");

    p_mensaje = valorCampo(p_storage,
        p_tabla,
        "p_mensaje");

    if (p_ok == "no") {
        mensajeUsr("ERROR",
            "Solicitud de Prestamos",
            p_mensaje);
    }
}

function habilitaCombosMaestros() {
    var codTipoPersona = recuperaDatoSesion("codTipoPersona");
    deshabilitaElemento('cbxUnidadNegocio');
    deshabilitaElemento('cbxSocios');

    if (parseInt(codTipoPersona) < 4 || parseInt(codTipoPersona) == 7) {
        habilitaElemento('cbxUnidadNegocio');
        habilitaElemento('cbxSocios');
    }
    else {
        if (parseInt(codTipoPersona) == 5 || parseInt(codTipoPersona) == 6) {
            deshabilitaElemento('cbxUnidadNegocio');
            habilitaElemento('cbxSocios');

        }
        else {
            deshabilitaElemento('cbxUnidadNegocio');
            deshabilitaElemento('cbxSocios');

        }
    }
}

function recuperaRegistroComboBox(p_LocalStorage, p_nombreTabla, p_CampoClave, p_Clave) {
    var objRetorno;

    datosJson = Ext.decode(recuperaDatosOpenLink(p_LocalStorage));
    var numRegistros = Object.keys(datosJson[p_nombreTabla]).length;

    for (var iCiclo = 0; iCiclo <= numRegistros; iCiclo++) {
        if (datosJson[p_nombreTabla][iCiclo] != null) {

            valCampoClave = datosJson[p_nombreTabla][iCiclo][p_CampoClave];

            if (valCampoClave == p_Clave) {
                objRetorno = datosJson[p_nombreTabla][iCiclo];
            }
        }
    }
    return objRetorno;
}

function enfocaElemento(p_elemento) {
    var elemento = Ext.getCmp(p_elemento);
    if (elemento === undefined) {
        console.error('enfocaElemento - No se encontró el Elemento o Componente: ' + p_elemento);
        return;
    }

    elemento.focus(false, 200);
}

function leeValorCombobox(p_idComboBox) {
    var comboBox = Ext.getCmp(p_idComboBox);
    return comboBox.getRawValue();
}

function botonOperacionFrecuente(p_objBoton, p_accion) {
    switch (p_accion) {
        case 'crear':
            p_objBoton.setText('Quitar de</br>Op. Frecuente');
            p_objBoton.setIconCls('paperclip32');
            break;
        case 'eliminar':
            p_objBoton.setText('Operación</br>Frecuente');
            p_objBoton.setIconCls('attachment32');
            break;
        case 'establecida':
            p_objBoton.setText('Operación</br>Estándar');
            p_objBoton.setIconCls('locked32');
            p_objBoton.establecida = true;
            p_objBoton.setDisabled();
            break;
    }
}

function generaBotonesMenu(p_elementoPadre) {
    var operacionFrecuente = Ext.decode(recuperaDatosOpenLink('preferenciasPersona'));
    var elementoPadreVisualiza;
    var datosAplicacionActiva = recuperaDatosOpenLink('aplicacionActiva');
    var objAplicacionActiva;
    var panelActividades = window.parent.Ext.getCmp('panelActividades');
    var grupoInicialActividades;

    if (operacionFrecuente === null) {
        return;
    }

    if (datosAplicacionActiva !== undefined && datosAplicacionActiva !== '') {
        objAplicacionActiva = Ext.decode(datosAplicacionActiva);
    }

    panelActividades.removeAll();

    for (var registroObj = 0; registroObj < operacionFrecuente.length; registroObj++) {

        var btnOperacionFrecuente = operacionFrecuente[registroObj];


        if (operacionFrecuente[registroObj].tipopreferencia === 'vistaArbolMenu') {
            var treePanelMenu = window.parent.Ext.getCmp('treePanelMenu');
            treePanelMenu.collapse();
        }

        if (operacionFrecuente[registroObj].tipopreferencia === 'grupoBoton') {
            var panelGrupoActividades = window.parent.Ext.getCmp('panelGrupoActividades');
            panelGrupoActividades.insertaBotonGrupo(btnOperacionFrecuente);

            if (grupoInicialActividades === undefined) {
                grupoInicialActividades = btnOperacionFrecuente.nombreelemento;
            }
        }

        if (p_elementoPadre !== undefined) {
            elementoPadreVisualiza = p_elementoPadre;
        }
        else {
            if (objAplicacionActiva !== undefined) {
                elementoPadreVisualiza = objAplicacionActiva.elementoPadre;
            }
        }

        if (elementoPadreVisualiza === undefined) {
            elementoPadreVisualiza = grupoInicialActividades;
        }

        if (operacionFrecuente[registroObj].tipopreferencia === 'botonMenu' &&
            operacionFrecuente[registroObj].elementopadre === elementoPadreVisualiza) {
            panelActividades.insertaBoton(btnOperacionFrecuente);
        }

    }
}

function esOperacionFrecuente(p_objOperacion) {
    var objOperacionFrecuente = Ext.decode(recuperaDatosOpenLink('preferenciasPersona'));
    var operacionFrecuente = 0;

    if (objOperacionFrecuente !== null) {
        for (var iRegistro = 0; iRegistro < objOperacionFrecuente.length; iRegistro++) {
            if (p_objOperacion.nombreElemento == objOperacionFrecuente[iRegistro].nombreelemento) {
                operacionFrecuente = 1;

                if (objOperacionFrecuente[iRegistro].estableceadmin == 'yes') {
                    operacionFrecuente = 2;
                }
            }
        }
    }

    return operacionFrecuente;
}

function accionOperacionFrecuente(button) {
    var btnOperacionFrecuente = Ext.getCmp('btnOperacionFrecuente');

    if (btnOperacionFrecuente.establecida) {
        mensajeTipo = 'ERROR';
        mensajeTitulo = 'Actividad Estándar';
        mensajeContenido = 'El Administrador del Sistema ha establecido ésta Actividad como Estándar para su Perfil de Usuario. </br></br>';
        mensajeContenido += 'No será posible Quitar ésta Actividad.';
        mensajeUsr(mensajeTipo,
            mensajeTitulo,
            mensajeContenido);
        return;
    }

    if (button.text.indexOf('Quitar') !== -1) {
        btnOperacionFrecuente = Ext.getCmp('btnOperacionFrecuente');
        creaOperacionFrecuente(btnOperacionFrecuente, 'botonMenu', 'eliminar');
    }
    else {
        btnOperacionFrecuente = Ext.getCmp('btnOperacionFrecuente');
        creaOperacionFrecuente(btnOperacionFrecuente, 'botonMenu', 'crear');
    }
}

function procesaColumnaGrid(p_idGrid, p_idColumna, p_accion) {
    var gridProceso = Ext.getCmp(p_idGrid);

    for (var index = 0; index < gridProceso.columns.length; index++) {
        if (gridProceso.columns[index].dataIndex == p_idColumna || gridProceso.columns[index].itemId == p_idColumna) {
            if (p_accion == 'visible') {
                gridProceso.columns[index].setVisible(true);
            }

            if (p_accion == 'oculta') {
                gridProceso.columns[index].setVisible(false);
            }
        }
    }
}

function despliegaRegistro(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'ind_', 'tf_', 'ta_'];
    var campoForm;

    objetoJson = p_datosJson[p_tablaRegistro][0];

    for (var key in objetoJson) {
        for (var prefix in prefixObj) {

            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {
                try {
                    asignaValorElemento(fiCampo, objetoJson[key]);
                    deshabilitaElemento(fiCampo);
                }
                catch (error) {
                    console.error(fiCampo + '(' + objetoJson[key] + ')' + ' >> ' + error.message);
                }
            }
        } //for - Prefix
    } //for - objetoJson  
}

function habilitaRegistroActualiza(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'tf_', 'ind_'];
    var campoForm;

    objetoJson = p_datosJson[p_tablaRegistro][0];
    for (var key in objetoJson) {
        for (var prefix in prefixObj) {
            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {
                if (campoForm.allowBlank === true) {
                    habilitaElemento(fiCampo);
                }

            }
        } //for - Prefix
    } //for - objetoJson
}

function habilitaCampos(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'tf_', 'ind_'];
    var campoForm;

    objetoJson = p_datosJson[p_tablaRegistro][0];
    for (var key in objetoJson) {
        for (var prefix in prefixObj) {
            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {
                habilitaElemento(fiCampo);
            }
        } //for - Prefix
    } //for - objetoJson
}

function deshabilitaCampos(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'ind_'];
    var campoForm;

    objetoJson = p_datosJson[p_tablaRegistro][0];
    for (var key in objetoJson) {
        for (var prefix in prefixObj) {
            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {

                deshabilitaElemento(fiCampo);
            }
        } //for - Prefix
    } //for - objetoJson
}

function recuperaDatosRegistro(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'ind_'];
    var campoForm;
    var valorCampo;
    var campoBase;
    var objetoForm;
    var indFormularioValido = true;
    var camposRequeridos = '';
    var aInfoRegistro = new Array();
    aInfoRegistro[0] = new Object();

    objetoJson = p_datosJson[p_tablaRegistro][0];
    for (var key in objetoJson) {
        for (var prefix in prefixObj) {
            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {

                valorCampo = leeValorElemento(fiCampo);
                if (typeof valorCampo == 'string') {
                    valorCampo = valorCampo.replace(',', '');
                }

                campoBase = fiCampo.substring(3, fiCampo.length);
                campoBase = campoBase.replace('_', '');
                objetoForm = Ext.getCmp(fiCampo);

                if (objetoForm !== undefined) {
                    /*------------------------------------------\
                     | ECRC: Validando los Campos Requeridos.	|
                     \------------------------------------------*/
                    if (objetoForm.allowBlank === false) {
                        if (valorCampo === '' && objetoForm.fieldLabel !== undefined) {
                            indFormularioValido = false;

                            camposRequeridos += '<font color=blue></br><b>*' + objetoForm.fieldLabel + '</b></font>';
                        }
                    }
                    aInfoRegistro[0][campoBase] = valorCampo;
                }
            }
        } //for - Prefix
    } //for - objetoJson

    var aResultado = new Array();
    aResultado[0] = aInfoRegistro;
    aResultado[1] = camposRequeridos;
    aResultado[2] = indFormularioValido;


    return aResultado;
}

function iniciaRegistro(p_datosJson, p_tablaRegistro) {
    var fiCampo;
    var prefixObj = ['fi_', 'dt_', 'cbx_', 'ind_'];
    var campoForm;

    objetoJson = p_datosJson[p_tablaRegistro][0];
    for (var key in objetoJson) {
        for (var prefix in prefixObj) {
            var valPrefix = prefixObj[prefix];

            fiCampo = valPrefix + key;
            campoForm = Ext.getCmp(fiCampo);

            if (campoForm !== undefined) {

                switch (valPrefix) {
                    case 'fi_':
                        campoForm.setValue('');
                        break;
                    case 'dt_':
                        campoForm.setValue('');
                        break;
                }

            }
        } //for - Prefix
    } //for - objetoJson    
}