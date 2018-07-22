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
                        _self.datosUsuario.data = _self.snapshotToArray(response.data);
                        _self.datosUsuario.contactos = _self.snapshotToArray(response.contactos);
                        _self.datosUsuario.contactos.forEach(element => {
                            console.log(element)
                            _self.firebaseProvider.obtieneMensajesContacto(element.data.uid).subscribe({
                                next(response){
                                   let _fechaIngresoContacto = element.data.fechaIngreso;
                                   let result = _self.snapshotToArray(response).filter(elemento => elemento.fechaIngreso >= _fechaIngresoContacto);
                                    _self.datosUsuario.data = _self.datosUsuario.data.concat(result);
                                    console.log(response);        
                                }
                            })
                        });
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
        if(typeof snapshot !== 'undefined'){
            Object.keys(snapshot).forEach(function(key) {
                returnArr.push(snapshot[key]);
            });
            return  returnArr.sort(function(a, b) {
                var dateA = new Date(a.fechaIngreso), dateB = new Date(b.fechaIngreso);
                return +dateB - +dateA ;
            });
        }else{
            return returnArr;
        };
        
    };
/*
    public getContactos(username) {
        return new Promise((resolve, reject) => {            
            this.firebaseProvider.buscarContactos(username).subscribe({
                next(response) {
                    response ? resolve(response) : reject("Este código QR no corresponde a una obra valida");    
                }
                ,error(msg) {
                    reject(msg)
                }
            });
        })

    }
*/
}
