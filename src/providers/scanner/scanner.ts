import { UserProvider } from '../user/user';
import { FirebaseDbProvider } from '../firebase-db/firebase-db';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform} from 'ionic-angular/';
import { Injectable } from '@angular/core';


/*
  Generated class for the ScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScannerProvider {

  constructor(    
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private firebaseProvider: FirebaseDbProvider,
    private userProvider: UserProvider) {

  }

  /******************************************************************************************************
  * Metodo encargado de escanear y recibir datos de la obra y luego realizar las llamadas a los metodos *
  * que rescatan dichos datos de la BD                                                                  *
  ******************************************************************************************************/

  
  scanCode(usuario):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      var obras;

      //Pregunta si es telefono o pc
      if (!this.platform.is('cordova')) {        
        
        this.userProvider.getPiecesData(2)
        .then(responseObra => {
          obras = responseObra;
          this.firebaseProvider.updateDatosUsuarioObra(usuario, obras, 'scan')
        })
        .then (() => {
          if(!this.comprobarObra("2", usuario.data)){
            this.firebaseProvider.updateDatosUsuarioPuntaje(usuario, obras);        
          }
          
        })
        .then(() => {
          resolve(obras)
        })
        .catch(err  => {
            reject(err)
        })
      } else {
        //abre scanner
        this.barcodeScanner.scan()
        .then(barcodeData => {

          if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
            
            this.userProvider.getPiecesData(barcodeData.text)
            .then(responseObra => {
              obras = responseObra;
              this.firebaseProvider.updateDatosUsuarioObra(usuario, obras, 'scan');
            })
            .then (() => {
              if(!this.comprobarObra(barcodeData.text, usuario.data)){
                this.firebaseProvider.updateDatosUsuarioPuntaje(usuario, obras);        
              }
            })
            .then(() => {
              resolve(obras);
            })
            .catch(err  => {
              reject(err);
            })
          }
        })
        .catch(err => reject(err));
      }
    })
  }

  comprobarObra(idObra, arrayObras) {
    let existe:boolean = false;
    
    var result = arrayObras.find(obj => {
      return obj.contenido.uid == idObra
    })

    existe = true ? typeof result !== 'undefined' : false;
    return existe; 
  }


}




