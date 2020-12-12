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
                        _self.datosUsuario.contactos = _self.snapshotToArray(response.contactos);
                        _self.datosUsuario.data = _self.snapshotToArray(response.data);
                        _self.datosUsuario.dataContacto = [];
                        _self.datosUsuario.dataTotal = [];


                        _self.datosUsuario.contactos.forEach(contacto => {

                            _self.firebaseProvider.obtieneMensajesContacto(contacto.data.uid).subscribe({
                                next(mensajesContacto){

                                    let _fechaIngresoContacto = contacto.fechaIngreso;
                                   if(mensajesContacto){
                                        var aux = []

                                        _self.snapshotToArray(mensajesContacto).forEach(mensaje => {
                                            let existe = true;
                                            for (var i=0; i <= _self.datosUsuario.data.length - 1;  i++) {
                                                if (_self.datosUsuario.data[i].contenido.uid != mensaje.contenido.uid) {
                                                    existe = false
                                                }else{
                                                    existe = true
                                                    break;
                                                }
                                            }
                                            if(!existe){
                                              var fecha:any;
                                              if(mensaje.uid != _self.datosUsuario.uid) {
                                                _self.datosUsuario.contactos.filter(obj => {
                                                  if (obj.data.uid === mensaje.uid) {
                                                    fecha = new Date(obj.fechaIngreso);
                                                  }
                                                });

                                                if(new Date(mensaje.fechaIngreso) >= fecha){
                                                  _self.datosUsuario.data.push(mensaje);
                                                }
                                              }else{
                                                _self.datosUsuario.data.push(mensaje);
                                              }
                                            }
                                        _self.datosUsuario.data = _self.snapshotToArray(_self.datosUsuario.data);
                                        });
                                   }
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



}
