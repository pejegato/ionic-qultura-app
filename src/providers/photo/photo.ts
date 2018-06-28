import {Injectable} from "@angular/core";
import firebase from "firebase";
/*
 Generated class for the PhotoProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class PhotoProvider {


    uploadImage(captureDataUrl, filename) {
        let storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${filename}`);
        return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);

    };

    downloadImageUrl(imgId: string): any {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child(`images/${imgId}`);
        return imageRef.getDownloadURL();
    }

}
