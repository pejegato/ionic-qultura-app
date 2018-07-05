import {Injectable} from "@angular/core";
import { FirebaseDbProvider } from "../firebase-db/firebase-db";


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
    ) {}


/*****************************************************************************
 * Metodo que obtiene data extra del usuario autenticado en la aplicacion     *
 *****************************************************************************/
    
    public getUserData(user){
        
        return new Promise((resolve, reject) => {           
            var _self = this;
            this.firebaseProvider.obtieneDatosUsuario(user.uid).subscribe({
                next(response){
                    if (response){
                        _self.datosUsuario = response; 
                        _self.datosUsuario.obras = _self.snapshotToArray(response.obras);
                        resolve();
                    }else{
                        reject("No existe registro");
                    }
                },
                error(msg) {reject(msg)}
            });            
        });
    }

/*****************************************************************************
 * Metodo que obtiene data de la obra escaneada                              *
 *****************************************************************************/
    public getPiecesData(idObra) {
        return new Promise((resolve, reject) => {            
            this.firebaseProvider.obtieneDatosObra(idObra).subscribe({
                next(response) {
                    response ? resolve(response) : reject("Este código QR no corresponde a una obra valida");    
                }
                ,error(msg) {
                    reject(msg)
                }
            });
        })

    }

/*****************************************************************************
 * Metodo utilitario que convierte un listado de objetos en un array         *
 *****************************************************************************/
    private snapshotToArray(snapshot) {
        var returnArr = [];
        if (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot;
                item.key = childSnapshot.uid;
            
                returnArr.push(item);
            });
        }
        return returnArr;
    };

    

}
