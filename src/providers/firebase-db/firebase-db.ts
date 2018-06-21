import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import firebase from 'firebase';


@Injectable()
export class FirebaseDbProvider {
  /***********************************
   * Variables globales del servicio
  ************************************/
  infoExtraUsuario:any = {}  


  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider
  ) {}

  public loader:boolean;

  guardaInfoAdicionalUsuario(usuario) {    
    console.log('Funcion de guardar usuario con parametros');    
    return this.afDB.database.ref(`usuarios/'${usuario.uid}`).set(usuario);
  }

  //observable
  obtieneDatosUsuario() {    
    this.loader = true;
    let usuarioActual = this.auth.currentUser
    this.afDB.object(`usuarios/'${usuarioActual.uid}`).valueChanges().subscribe(usuario => {
      this.infoExtraUsuario = usuario;
      this.infoExtraUsuario.username = usuarioActual.displayName;
      this.downloadImageUrl(usuarioActual.photoURL).then((url)=>{
        this.infoExtraUsuario.imgUrl = url;
        this.loader = false;
      }).catch((err)=>{
        this.loader = false;
      });          
    });
  }

  uploadImage(captureDataUrl, filename) {
    let storageRef = firebase.storage().ref();       
    const imageRef = storageRef.child(`images/${filename}`);
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);      
  };

  downloadImageUrl(userId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`images/${userId}.jpg`);
    return imageRef.getDownloadURL();
  } 

}

