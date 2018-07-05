import { UserProvider } from './../user/user';
import { FirebaseDbProvider } from './../firebase-db/firebase-db';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScannerProvider {

  constructor(
    private http: HttpClient,
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
      if (!this.platform.is('cordova')) {        
        
        this.userProvider.getPiecesData(3)
        .then(responseObra => {
          obras = responseObra;
          this.firebaseProvider.updateDatosUsuarioObra(usuario, obras)
        })          
        .then (() => {
          this.firebaseProvider.updateDatosUsuarioPuntaje(usuario, obras)        
        })          
        .then(() => {          
          resolve(obras)
        })          
        .catch(err  => {
            reject(err)
        })
          
        
      } else {
        this.barcodeScanner.scan().then(barcodeData => {

          if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
            
            this.userProvider.getPiecesData(barcodeData.text)            
            .then(responseObra => {
              obras = responseObra;
              this.firebaseProvider.updateDatosUsuarioObra(usuario, obras)
            })          
            .then (() => {
              this.firebaseProvider.updateDatosUsuarioPuntaje(usuario, obras)        
            })          
            .then(() => {          
              resolve(obras)
            })                      
            .catch(err  => {
              reject(err)
            })
          }
        })
        .catch(err => reject(err));
      }
    })
  }
}
