import {Injectable} from "@angular/core";
import { FirebaseDbProvider } from "../firebase-db/firebase-db";
import { PhotoProvider } from "../photo/photo";


/*
 Generated class for the UserProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UserProvider {

    public datosUsuario: any
    constructor(
        private firebaseProvider: FirebaseDbProvider,
        private photoProvider: PhotoProvider
    ) {}

    public getUserData(user){
        return new Promise<any>(
            (resolve, reject) => this.firebaseProvider.obtieneDatosUsuario(user.uid).subscribe(response => {
                if(response){                
                    this.photoProvider.downloadImageUrl(response.img)
                    .then(url => {
                        response.imgUrl = url;                        
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                }else{
                    resolve(response);
                } 
            }, error => {
                reject(error);
             })
        );
    }

    public getPiecesData(user) {
        return new Promise<any>(
            (resolve, reject) => this.firebaseProvider.obtieneDatosObra("1").subscribe(response => {
                if (response) {
                    this.photoProvider.downloadImageUrl(response.img)
                        .then(url => {
                            response.imgUrl = url;
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                } else {
                    resolve(response);
                }
            }, error => {
                reject(error);
            })
        );
    }

}
