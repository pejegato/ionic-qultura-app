import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

/*
  Generated class for the PhotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotosProvider {

  constructor(
    private fb: FirebaseApp) {
    console.log('Hello PhotosProvider Provider');
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
