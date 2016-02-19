Ext.define('modCPXSesion',
{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codEmpresa',         type:'string'},
		{name: 'razonSocial',        type:'string'},
		{name: 'nombreComercial',    type:'string'},
		{name: 'codSistema',         type:'string'},
		{name: 'nombreSistema',      type:'string'},
		{name: 'codMenu',            type:'string'},
		{name: 'codUsuario',         type:'string'},
		{name: 'clavePersona',       type:'string'},
        {name: 'nombre',             type:'string'},
        {name: 'codTipoPersona',     type:'string'},
        {name: 'descripcion',        type:'string'},
        {name: 'idSesion',           type:'string'},
        {name: 'codEmpresaActiva',   type:'string'},
        {name: 'codSucursalActiva',  type:'string'},
        {name: 'codEntidad',         type:'string'},
        {name: 'nombreEntidad',      type:'string'},
        {name: 'dirTemporal',        type:'string'},
        {name: 'correo',             type:'string'},
        {name: 'telefono',           type:'string'},
        {name: 'servidor',           type:'string'},
        {name: 'servicio',           type:'string'},
        {name: 'programa',           type:'string'},
        {name: 'jasperUsername',     type:'string'},
        {name: 'jasperURLServer',    type:'string'},
        {name: 'jasperReportUnit',   type:'string'},
        {name: 'jasperPassword',     type:'string'},
        {name: 'jasperParentFolder', type:'string'},
        {name: 'jasperOpenLink',     type:'string'}
	]
});



Ext.define('storeCpxSesion',
{
	extend: 'Ext.data.Store',
	model: 'modCPXSesion',
	proxy:{
		type: 'sessionstorage',
		id: 'sesionCPX'
	}
});


function generaSesion(temp_datos_sesion){
	Ext.onReady(function(){

		var storeSesion = Ext.create('storeCpxSesion');
		storeSesion.getProxy().clear();
        
        /*------------------------------------------------------\
        | ECRC: Seleccionando la Empresa Activa.				|
        \------------------------------------------------------*/
        var codEmpresaActiva  = configuracionSistema('codEmpresaActiva');
        var codSucursalActiva = configuracionSistema('codSucursalActiva');
        
        if(codEmpresaActiva === ''){
            codEmpresaActiva  = temp_datos_sesion.codempresaactiva;
            codSucursalActiva = temp_datos_sesion.codsucursalactiva;
        }

        /*------------------------------------------------------\
        | ECRC: Todos los campos deben leerse en Min�sculas.	|
        \------------------------------------------------------*/
        storeSesion.add({
            codEmpresa         : temp_datos_sesion.codempresa,
            razonSocial        : temp_datos_sesion.razonsocial,
            nombreComercial    : temp_datos_sesion.nombrecomercial,
            codSistema         : temp_datos_sesion.codsistema,
            nombreSistema      : temp_datos_sesion.nombresistema,  
            codMenu            : temp_datos_sesion.codmenu,            
            codUsuario         : temp_datos_sesion.codusuario,            
            clavePersona       : temp_datos_sesion.clavepersona,
            nombre             : temp_datos_sesion.nombre,
            codTipoPersona     : temp_datos_sesion.codtipopersona,
            descripcion        : temp_datos_sesion.descripcion,
            idSesion           : temp_datos_sesion.idsesion,
            codEntidad         : temp_datos_sesion.codentidad,      
            nombreEntidad      : temp_datos_sesion.nombreentidad,      
            codEmpresaActiva   : codEmpresaActiva,   
            codSucursalActiva  : codSucursalActiva,
            dirTemporal        : temp_datos_sesion.dirtemporal,
            correo             : temp_datos_sesion.correo,
            telefono           : temp_datos_sesion.telefono,
            servidor           : datosOpenLink('servidor'),
            servicio           : datosOpenLink('servicio'),
            programa           : datosOpenLink('programa'),
            jasperUsername     : temp_datos_sesion.jasperusername,
            jasperURLServer    : temp_datos_sesion.jasperurlserver,
            jasperReportUnit   : temp_datos_sesion.jasperreportunit,
            jasperPassword     : temp_datos_sesion.jasperpassword,
            jasperParentFolder : temp_datos_sesion.jasperparentfolder,
            jasperOpenLink     : temp_datos_sesion.jasperopenlink
        });

        
  
        
		storeSesion.sync();
	});
}

function recuperaDatoSesion(p_dato){
	var valRetorno = '';
    var storeSesion = Ext.create('storeCpxSesion');
    
    storeSesion.load(function(records,op,success){
        var sesionCPX, iCiclo;
        
        for (iCiclo=0; iCiclo<records.length; iCiclo++){
            sesionCPX = records[iCiclo].data;
            valRetorno = sesionCPX[p_dato];
        }
        
        return valRetorno;
    });
    return valRetorno;
}

