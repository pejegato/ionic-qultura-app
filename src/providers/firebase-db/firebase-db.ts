import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import firebase from 'firebase';


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

  upload(captureDataUrl) {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child('images/${filename}.jpg');
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);
      
  };

}
