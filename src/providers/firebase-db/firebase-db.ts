import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class FirebaseDbProvider {
  /***********************************
   * Variables globales del servicio
  ************************************/
  datosUsuario:any = {}  


  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider
  ) {}

  guardaUsuario(usuario) {    
    return this.afDB.database.ref('usuarios/' + this.auth.getUser()).set(usuario);
  }

  //observable
  obtieneDatosUsuario() {
    this.afDB.object('usuarios/' + this.auth.getUser()).valueChanges().subscribe(usuario => {
      this.datosUsuario = usuario;
    });
  }

  

}
