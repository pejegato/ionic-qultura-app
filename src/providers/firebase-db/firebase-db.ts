import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

@Injectable()
export class FirebaseDbProvider {
  
  constructor(
    public afDB: AngularFireDatabase,
    private fb: FirebaseApp) {}
  
  /*************************************************************
   * Guarda la info adicional del usuario en la base de datos  *
  **************************************************************/
  guardaInfoAdicionalUsuario(usuario): Promise<any> {
      return this.afDB.database.ref(`usuarios/${usuario.uid}`).update(usuario);
  }
  
  /***************************************************************************************
   *Obtiene los datos adicionales (username, mail, foto de perfil del usuario logueado)  *                          *
   ***************************************************************************************/
  obtieneDatosUsuario(usuarioId): Observable<any> {
      return this.afDB.object(`usuarios/${usuarioId}`).valueChanges();
  }
  
  /*****************************************************************************
   *Busca los datos de las Obra en la base de datos                            *
   *****************************************************************************/
  obtieneDatosObra(obraId): Observable<any> {
    return this.afDB.object(`obras/${obraId}`).valueChanges();
  }
  
  /*****************************************************************************
   *Agrega los datos de la Obra escaneada al usuario en la base de datos       *
   *****************************************************************************/
  updateDatosUsuarioObra(usuario, obra): Promise<any> {
    obra.fechaScan = new Date();    
    return this.afDB.database.ref(`usuarios/${usuario.uid}/obras/${obra.uid}`).update(obra);
  }

  /*****************************************************************************
   *Actualiza el puntaje del usuario en base a los datos de la Obra escaneada  *
   *****************************************************************************/  
  updateDatosUsuarioPuntaje(usuario, obra): Promise<any> {
    let puntaje = usuario.puntaje + obra.puntaje;
    return this.afDB.database.ref(`usuarios/${usuario.uid}`).update({"puntaje":puntaje});
  }

  /*****************************************************************************
   *Actualiza el comentario de la obra en base a lo escrito en el modal        *
   *****************************************************************************/
  updateDatosUsuarioObraComentario(usuario, obra, comentario): Promise<any> {
    return this.afDB.database.ref(`usuarios/${usuario.uid}/puntos/${obra.uid}/${comentario}`).update(obra);
  }

  /************************************************************************************
   *Metodo que sube la imagen a la base de datos creando una instancia del storage    *
   ************************************************************************************/
  uploadImage(captureDataUrl, filename): firebase.storage.UploadTask {
    let storageRef = this.fb.storage().ref();
    const imageRef = storageRef.child(`images/${filename}`);
    return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);
  };

  /****************************************************************************************
   *Metodo que obtiene la url de visualizacion de la app basado en el nombre de la img    *
   ****************************************************************************************/
  downloadImageUrl(imgId: string): Promise<any> {
    let storageRef = this.fb.storage().ref();
    let imageRef = storageRef.child(`images/${imgId}`);
    return imageRef.getDownloadURL();
  }
}

