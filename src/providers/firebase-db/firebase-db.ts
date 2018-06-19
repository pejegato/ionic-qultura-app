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
      this.datosUsuario.avatar = this.getImage(this.datosUsuario.uid);
      console.log("url avatar ",this.datosUsuario.avatar);
    });
  }

  uploadImage(captureDataUrl, filename) {
    let storageRef = firebase.storage().ref();   
    
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);      
  };

  getImage(userId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`image/${userId}`);
    return imageRef.getDownloadURL();
  }

}
