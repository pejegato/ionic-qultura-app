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

  guardaInfoAdicionalUsuario(usuario) {    
    console.log('Funcion de guardar usuario con parametros')
    return this.afDB.database.ref(`usuarios/'${usuario.uid}`).set(usuario);
  }

  //observable
  obtieneDatosUsuario() {    
    let usuarioActual = this.auth.currentUser
    this.afDB.object(`usuarios/'${usuarioActual.uid}`).valueChanges().subscribe(usuario => {
      this.datosUsuario = usuario;
      this.datosUsuario.username = usuarioActual.displayName;
      this.datosUsuario.imgUrl = this.downloadImageUrl(usuarioActual.uid);
      console.log("url ima", this.datosUsuario.imgUrl);
      //console.log("usuarios ", this.auth.getUser());
      //this.datosUsuario.avatar = this.getImage(this.auth.getUser());
      //console.log("url avatar ",this.datosUsuario.avatar);
    });
  }

  uploadImage(captureDataUrl, filename) {
    let storageRef = firebase.storage().ref();   
    
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);      
  };

  downloadImageUrl(userId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`images/${userId}.jpg`);
    return imageRef.getDownloadURL();
  } 

}

