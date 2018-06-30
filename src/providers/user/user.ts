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


    //Metodo que obtiene data del usuario autenticado en la aplicacion
    public getUserData(user){
        return new Promise<any>((resolve, reject) => 
        this.firebaseProvider.obtieneDatosUsuario(user.uid).subscribe(
            response => {
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


    //Metodo que obtiene data de la obra escaneada
    public getPiecesData(dataObra) {        
        return new Promise<any>(
            (resolve, reject) => 
            this.firebaseProvider.obtieneDatosObra(dataObra).subscribe(response => {
                if (response) {                  
                    this.photoProvider.downloadImageUrl(response.img + ".jpg")
                    .then(url => {
                        response.imgUrl = url;
                        resolve(response);
                    })
                    .catch(err=>{
                        reject(err);
                    })
                }else{
                    reject();
                }
            }, error => {
                reject(error);
            })
        );

    }

}
