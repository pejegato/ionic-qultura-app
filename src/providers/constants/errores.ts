export class diccionarioErrores {

  public static readonly URL_IMG_DEFECTO = "https://firebasestorage.googleapis.com/v0/b/qulturatesting.appspot.com/o/images%2FnoneImg.jpg?alt=media&token=8639b640-b0ae-4a49-8671-94670c88bf9c";
  public static readonly IMG_DEFECTO = "noneImg"

  private ERRORES_LOGIN = new  Map<string, string>([
      ["AUTH/AUTHENTICATION-PROVIDER-DISABLED","Autenticación Deshabilitada."],
      ["AUTH/INVALID-CREDENTIALS", 'Credenciales inválidas.'],
      ['AUTH/INVALID-EMAIL', 'Correo electrónico inválido.'],
      ["AUTH/INVALID-ORIGIN", 'Origen inválido.'],
      ["AUTH/INVALID-PASSWORD", 'Contraseña no corresponde, intente nuevamente.'],
      ["AUTH/WRONG-PASSWORD", 'Contraseña no corresponde, intente nuevamente.'],
      ["AUTH/EMAIL-TAKEN", 'Este correo electrónico ya se encuentra registrado.'],
      ["AUTH/INVALID-PROVIDER", 'Proveedor inválido.'],
      ["AUTH/INVALID-AUTH-ARGUMENTS", 'Argumentos de autenticación inválidos.'],
      ["AUTH/INVALID-CONFIGURATION", 'Configuración inválida.'],
      ["AUTH/INVALID-TOKEN", 'Token inválido.'],
      ["AUTH/NETWORK-ERROR", 'Error de red.'],
      ["AUTH/UNKNOWN-ERROR", 'Se ha producido un error.'],
      ["AUTH/USER-DENIED-AUTH", 'Usuario no autorizado.'],
      ["AUTH/USER-DOES-NOT-EXIST", 'Este correo electrónico no se encuentra registrado.'],
      ["AUTH/EMAIL-ALREADY-IN-USE", 'Este correo electrónico ya se encuentra registrado.'],
      ["AUTH/WEAK-PASSWORD", 'Contraseña demasiado corta.'],
      ["AUTH/USER-NOT-FOUND", 'Este correo electrónico no se encuentra registrado.'],
      ["AUTH/ARGUMENT-ERROR", 'Ingrese una contraseña nueva para realizar la actualización.'],
      ["AUTH/NETWORK-REQUEST-FAILED", 'Revise su conexión a internet.'],


  ]);

  public traducirError(tipo:string, key:string) {
    if(typeof key !== 'undefined'){


    console.log("tipo de error ", typeof key);
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
