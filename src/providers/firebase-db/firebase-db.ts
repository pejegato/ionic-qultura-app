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
/*
  guardaUsuario(usuario: any, userId: string) {    
    return this.afDB.database.ref(`usuarios/'${userId}`).set(usuario);
  }
*/

  guardaUsuario(usuario: any, userId: string) {    
  var user = firebase.auth().currentUser;
  }

  //observable
  obtieneDatosUsuario(userId: string) {    
    this.afDB.object(`usuarios/'${userId}`).valueChanges().subscribe(usuario => {
      this.datosUsuario = usuario;
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

  getImage(userId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`image/${userId}`);
    return imageRef.getDownloadURL();
  }

  get currentUser(){
    return firebase.auth().currentUser
  }

}
