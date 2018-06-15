

export class diccionarioErrores {

  private ERRORES_LOGIN = new  Map<string, string>([        
      ["AUTH/AUTHENTICATION-PROVIDER-DISABLED","Autenticación Deshabilitada"],           
      ["AUTH/INVALID-CREDENTIALS", 'Credenciales invalidas'],
      ['AUTH/INVALID-EMAIL', 'Email invalido'],
      ["AUTH/INVALID-ORIGIN", 'Origen invalido'],
      ["AUTH/INVALID-PASSWORD", 'Password invalido'],    
      ["AUTH/WRONG-PASSWORD", 'Password invalido'],    
      ["AUTH/EMAIL-TAKEN", 'Email ya existe'],
      ["AUTH/INVALID-PROVIDER", 'Proveedor invalido'],
      ["AUTH/INVALID-AUTH-ARGUMENTS", 'Argumentos de autenticación invalidos'],
      ["AUTH/INVALID-CONFIGURATION", 'Configuración invalida'],      
      ["AUTH/INVALID-TOKEN", 'Token invalido'],
      ["AUTH/NETWORK-ERROR", 'Error de red'],
      ["AUTH/UNKNOWN-ERROR", 'Se ha producido un error'],
      ["AUTH/USER-DENIED-AUTH", 'Usuario no autorizado'],
      ["AUTH/USER-DOES-NOT-EXIST", 'Usuario no existe']      
  ]);
  
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
