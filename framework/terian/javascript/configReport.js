function mensajeReporteNOK(){
    var mensajeError = 'No se encontraron registros para generar el Reporte.';
    
    console.log(mensajeError);
    
    Ext.Msg.show({
        title      : 'Reporte sin datos',
        msg        : mensajeError,
        width      : 400,
        buttons    : Ext.MessageBox.OK,
        icon       : Ext.MessageBox.INFO
    });    
}

function generaReporte(p_urlJasperReport,p_datosJasperReport){
    var winReporte = Ext.getCmp('winReporte');
    var botonesWindow = new Array();
    
    if(p_datosJasperReport.jasperSalida == 'xls'){
        ejecutaURL(p_urlJasperReport);
    }
    else{
        if(p_datosJasperReport.jasperBtnEtiqueta !== undefined){
            botonesWindow.push({
                id     : p_datosJasperReport.jasperBtnId,
                text   : p_datosJasperReport.jasperBtnEtiqueta,
                handler: function(){
                    eval(p_datosJasperReport.jasperBtnFuncion);
                }
            });        
        }
        
        botonesWindow.push({
            text      : 'Cerrar',
            textAlign : 'left',
            width     : 130,
            height    : 40,
            iconCls   : 'exit32',
            iconAlign : 'right',
            handler: function(){
                if(p_datosJasperReport.jasperFuncionCierre !== undefined){
                    eval(p_datosJasperReport.jasperFuncionCierre);
                }
                cierraReporte(); 
            }
        });
        
        if(!winReporte){
            console.log('Creando la ventana');
            
            winReporte = new Ext.Window({
                width    : 850,
                height   : 500,
                closable : false,
                modal    : true,
                id       : 'winReporte',
                layout   : 'fit',
                items    : [{
                    xtype : "component",
                    id: "contenidoReporte",
                    autoEl : {
                        tag : "iframe",
                        src : p_urlJasperReport
                    }
                }],
                buttons:botonesWindow
            });
        }
        else{
            winReporte.src = p_urlJasperReport;
        }
        
        abreReporte(p_urlJasperReport);        
    } /* Cualquier tipo de Reporte */
}

function ejecutaURL(p_url){
    window.location.href = p_url;
}

function actualizaURLReporte(p_urlContenido){
    var winReporte = Ext.getCmp('winReporte');
    Ext.getDom('contenidoReporte').src = p_urlContenido;
    winReporte.update();
}

function abreReporte(p_urlJasperReport){
    var winReporte = Ext.getCmp('winReporte');
    
    winReporte.update(p_urlJasperReport);
    winReporte.show();
}

function cierraReporte(){
    var winReporte = Ext.getCmp('winReporte');
    winReporte.hide();
    winReporte.destroy();
    
}

function creaUrlJasper(p_datosJasper,p_idTransUsr){
    
    console.log("creaUrlJasper");
    console.log("p_datosJasper");
    console.log(p_datosJasper);    
    console.log("p_idTransUsr: " + p_idTransUsr);
    
    
    var serverJasper = recuperaDatoSesion('jasperURLServer');
    var parentFolder = '&ParentFolderUri=' + recuperaDatoSesion('jasperParentFolder');
    var reportUnit   = '&reportUnit=' + recuperaDatoSesion('jasperReportUnit') + p_datosJasper.jasperReporte; 
    var decorate     = "&decorate=no";
    var username     = '&j_username=' + recuperaDatoSesion('jasperUsername');
    var password     = '&j_password=' + recuperaDatoSesion('jasperPassword');
    var jasperOpenLink = "&jasperOpenLink=" + recuperaDatoSesion('jasperOpenLink');
    var salida       = "&output=pdf";
    var idTrans      = 0;
    var idSesion     = 0;
    
    var paramIdSesion    = '';
    var paramIdTrans     = '';
    var paramCodEmpresa  = '';
    var paramCodSistema  = '';
    var datosJson        = '';
    var openLinkServidor = '';
    var openLinkServicio = '';
    var openLinkPrograma = '';
    
    /*----------------------------------------------------------------------\
    | ECRC: Recuperando el ID de la Transacción que respalda al Reporte.	|
    \----------------------------------------------------------------------*/
    idSesion = recuperaDatoSesion('idSesion');
    if(idSesion === undefined){
        idSesion = recuperaDatoSesion('idsesion');
    }
    
    
    if(p_idTransUsr !== undefined){
        idTrans = p_idTransUsr;
    }
    else{
        idTrans  = valorCampo(p_datosJasper.jasperStorage,
                              p_datosJasper.jasperTablaLocal,
                              'p_idtrans'); 
    }
    

    
    /*----------------------------------------------------------------------\
    | ECRC: Adicionando Parametros Extra para paso hacia Jasper y OpenLink	|
    \----------------------------------------------------------------------*/
    paramIdSesion    = '%22p_idsesion%22:%22' + idSesion + '%22';
    paramIdTrans     = '%22p_idtrans%22:%22'  + idTrans  + '%22';
    paramCodEmpresa  = '%22p_codEmpresa%22:%22'  + recuperaDatoSesion('codEmpresa') + '%22';
    paramCodSistema  = '%22p_codSistema%22:%22'  + recuperaDatoSesion('codSistema') + '%22';
    datosJson        = '&datosJson=[{' + paramIdSesion + ',' + paramIdTrans + ',' + paramCodEmpresa + ',' + paramCodSistema + '}]';
    
    console.log('datosJson: ' + datosJson);
    console.log('jasperOpenLink:' + jasperOpenLink);
    
    var extraParams  = [
        datosJson
    ].join('');
    
    if(p_datosJasper.jasperSalida == 'xls'){
        salida       = "&output=xls";
    }
    
    if(p_datosJasper.jasperSalida == 'jasper'){
        salida       = "";
    }    

    if(typeof(datosOpenLink) == 'function'){
        openLinkServidor = '&openLinkServidor=' + datosOpenLink('servidor');
        openLinkServicio = '&openLinkServicio=' + datosOpenLink('servicio');
        openLinkPrograma = '&openLinkPrograma=' + datosOpenLink('programa');
    }
    else{
        openLinkServidor = '&openLinkServidor=' + recuperaDatoAmbiente('servidor');
        openLinkServicio = '&openLinkServicio=' + recuperaDatoAmbiente('servicio');
        openLinkPrograma = '&openLinkPrograma=' + recuperaDatoAmbiente('programa');
        
    }
    
    
    var urlJasper = [
        serverJasper,
        parentFolder,
        reportUnit,
        decorate,
        username,
        password,
        salida, 
        jasperOpenLink,
        openLinkServidor,
        openLinkServicio,
        openLinkPrograma,
        extraParams
    ].join('');
    
    console.log('Esta es la URL de Jasper: ' + urlJasper);
    
    return urlJasper;
}
