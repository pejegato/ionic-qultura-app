export class diccionarioErrores {

  public static readonly URL_IMG_DEFECTO = "https://firebasestorage.googleapis.com/v0/b/qulturatesting.appspot.com/o/images%2FnoneImg.jpg?alt=media&token=8639b640-b0ae-4a49-8671-94670c88bf9c";
  public static readonly IMG_DEFECTO = "noneImg"

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
      ["AUTH/USER-DOES-NOT-EXIST", 'Usuario no existe'],
      ["AUTH/EMAIL-ALREADY-IN-USE", 'Email ya se encuentra registrado'],
      ["AUTH/WEAK-PASSWORD", 'Password demasiado corto'],
      ["AUTH/USER-NOT-FOUND", 'Usuario no existe']
  ]);

  public traducirError(tipo:string, key:string) {
    if(typeof key !== 'undefined'){
        let erroresMap = new  Map<string, string>();
        let codigoError = key ? key.toString().toUpperCase() : '';
        if(tipo === 'LOGIN'){
            erroresMap = this.ERRORES_LOGIN
        }

        if(erroresMap.has(codigoError)){
          return erroresMap.get(codigoError);
        }else{
          return codigoError
        }
    }else{
        return "Se ha producido un error, contactate con el soporte de Qultura"
    }
  };

}
