export interface infoUsuarioInterface {    
    email: string,    
    username: string,
    nombre: string,
    urlImg: string
}


export interface usuarioInterface {
    uid: string,
    email: string,
    password: string,
    passwordConfirm: string,
    username: string,
    nombre: string,
    img: string,
    puntaje: number,
    obrasEscaneadas: [{}];
}

export interface obraInterface {
    uid: string,
    nombre: string,
    autor: string,
    anio: string,
    imgUrl: string,
    puntaje: number,
    descripcion: string
}