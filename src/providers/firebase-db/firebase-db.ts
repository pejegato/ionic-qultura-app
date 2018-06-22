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

  guardaInfoAdicionalUsuario(usuario): Promise<any> {          
    return this.afDB.database.ref(`usuarios/'${usuario.uid}`).set(usuario)
    .then(response => Promise.resolve(response))
      .catch(err => Promise.reject(err));
  }

  //observable
  obtieneDatosUsuario() {    
    this.loader = true;
    let usuarioActual = this.auth.currentUser
    this.afDB.object(`usuarios/'${usuarioActual.uid}`).valueChanges().subscribe(usuario => {
      this.infoExtraUsuario = usuario;
      this.downloadImageUrl(this.infoExtraUsuario.img).then((url)=>{
        this.infoExtraUsuario.imgUrl = url;  
        console.log("imagen "+this.infoExtraUsuario.imgUrl);     
      }).catch((err)=>{
       
      });          
    });
  }

  uploadImage(captureDataUrl, filename) {
    let storageRef = firebase.storage().ref();       
    const imageRef = storageRef.child(`images/${filename}`);
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then(response => Promise.resolve(response))
    .catch(err => Promise.reject(err));;      
  };

  downloadImageUrl(userId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`images/${userId}.jpg`);
    return imageRef.getDownloadURL()
  } 

}

