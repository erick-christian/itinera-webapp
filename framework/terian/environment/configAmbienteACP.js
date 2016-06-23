var objAmbienteOpenLink = new Object();
objAmbienteOpenLink.servidorWeb = 'http://10.11.21.14:6180/';
objAmbienteOpenLink.servidor = '10.11.21.14';
objAmbienteOpenLink.servicio = 'OPENLINK_WS_DESARROLLO';
objAmbienteOpenLink.programa = 'openLink.html';
objAmbienteOpenLink.ambiente = 'Ambiente de Desarrollo';
objAmbienteOpenLink.tituloAplicacion = 'PORTAL ACP - Control de la Producción | Desarrollo';

Ext.define('modAmbienteOpenLink',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'servidorWeb', type: 'string'},
            {name: 'servidor', type: 'string'},
            {name: 'servicio', type: 'string'},
            {name: 'programa', type: 'string'},
            {name: 'ambiente', type: 'string'},
            {name: 'tituloAplicacion', type: 'string'}
        ]
    });

Ext.define('storeAmbienteOpenLink',
    {
        extend: 'Ext.data.Store',
        model: 'modAmbienteOpenLink',
        proxy: {
            type: 'sessionstorage',
            id: 'storeAmbienteOpenLink'
        }
    });


function datosOpenLink(p_dato) {
    var datoRetorno = 'Sin dato recibido';

    if (p_dato == 'servidorWeb') {
        datoRetorno = objAmbienteOpenLink.servidorWeb;
    }

    if (p_dato == 'servidor') {
        datoRetorno = objAmbienteOpenLink.servidor;
    }

    if (p_dato == 'servicio') {
        datoRetorno = objAmbienteOpenLink.servicio;
    }

    if (p_dato == 'programa') {
        datoRetorno = objAmbienteOpenLink.programa;
    }

    if (p_dato == 'ambiente') {
        datoRetorno = objAmbienteOpenLink.ambiente;
    }

    if (p_dato == 'tituloAplicacion') {
        datoRetorno = objAmbienteOpenLink.tituloAplicacion;
    }

    return datoRetorno;
}


function validaArchivo() {
    var archivo = 'Archivo configAmbiente.js listo!';
    return archivo;
}

function generaAmbienteOpenLink() {
    Ext.onReady(function () {

        var storeAmbienteOpenLink = Ext.create('storeAmbienteOpenLink');
        storeAmbienteOpenLink.getProxy().clear();


        /*------------------------------------------------------\
         | ECRC: Todos los campos deben leerse en Minusculas.	|
         \------------------------------------------------------*/
        storeAmbienteOpenLink.add({
            servidorWeb: objAmbienteOpenLink.servidorWeb,
            servidor: objAmbienteOpenLink.servidor,
            servicio: objAmbienteOpenLink.servicio,
            programa: objAmbienteOpenLink.programa,
            ambiente: objAmbienteOpenLink.ambiente,
            tituloAplicacion: objAmbienteOpenLink.tituloAplicacion
        });

        storeAmbienteOpenLink.sync();
    });
}

function recuperaDatoAmbiente(p_dato) {
    var valRetorno = '';
    var storeAmbienteOpenLink = Ext.create('storeAmbienteOpenLink');

    storeAmbienteOpenLink.load(function (records, op, success) {
        var sesionCPX, iCiclo;

        for (iCiclo = 0; iCiclo < records.length; iCiclo++) {
            sesionCPX = records[iCiclo].data;
            valRetorno = sesionCPX[p_dato];
        }

        return valRetorno;
    });
    return valRetorno;
}

generaAmbienteOpenLink();