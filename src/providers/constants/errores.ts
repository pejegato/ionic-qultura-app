

export class diccionarioErrores {

  private ERRORES_LOGIN = new  Map<string, string>([        
      ["AUTH/AUTHENTICATION_PROVIDER_DISABLED","Autenticación Deshabilitada"],           
      ["AUTH/INVALID_CREDENTIALS", 'Credenciales invalidas'],
      ['AUTH/INVALID-EMAIL', 'Email invalido'],
      ["AUTH/INVALID_ORIGIN", 'Origen invalido'],
      ["AUTH/INVALID_PASSWORD", 'Password invalido'],    
      ["AUTH/EMAIL_TAKEN", 'Email ya existe'],
      ["AUTH/INVALID_PROVIDER", 'Proveedor invalido'],
      ["AUTH/INVALID_AUTH_ARGUMENTS", 'Argumentos de autenticación invalidos'],
      ["AUTH/INVALID_CONFIGURATION", 'Configuración invalida'],      
      ["AUTH/INVALID_TOKEN", 'Token invalido'],
      ["AUTH/NETWORK_ERROR", 'Error de red'],
      ["AUTH/UNKNOWN_ERROR", 'Se ha producido un error'],
      ["AUTH/USER_DENIED_AUTH", 'Usuario no autorizado'],
      ["AUTH/USER_DOES_NOT_EXIST", 'Usuario no existe']      
  ]);

  /**
   * name
   */
  public traducirError(tipo:string, key:string) {  
    console.log("tipo de error ",typeof key); 
    let erroresMap = new  Map<string, string>();
    let codigoError = key ? key.toString().toUpperCase() : '';
    if(tipo === 'LOGIN'){
      erroresMap = this.ERRORES_LOGIN
    }
    
    if(erroresMap.has(codigoError)){
      return erroresMap.get(codigoError);  
    }else{
      return 'Error desconocido'
    }
  };



}
