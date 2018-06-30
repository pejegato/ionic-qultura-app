import { UserProvider } from './../user/user';
import { FirebaseDbProvider } from './../firebase-db/firebase-db';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform, ToastController } from 'ionic-angular';
import { HistorialProvider } from './../historial/historial';
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
    private toastCtrl: ToastController,
    private platform: Platform,
    private historialProvider: HistorialProvider,
    private firebaseProvider: FirebaseDbProvider,
    private userProvider: UserProvider) {

  }

  //Metodo encargado de escanear y recibir datos de la obra y luego realizar las llamadas a los metodos que rescatan
  //dichos datos de la BD
  
  scanCode(usuario):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      
      if (!this.platform.is('cordova')) {
        console.log("1");
        let idObra = "8";
        let obra:any;
        
        this.userProvider.getPiecesData(idObra)
        .then(responseObra => {
          console.log("2");
          obra = responseObra;
          
          //Datos complementarios
          obra.uid=idObra;
          obra.fechaScan = new Date()

          this.firebaseProvider.updateDatosUsuarioObra(usuario, responseObra)          
        })
        .then(() => {
          console.log("3");
          resolve(obra);
        })
        .catch(err => {
          console.log("4");
          reject(err);
        });
        console.log("5");

      } else {
        this.barcodeScanner.scan().then(barcodeData => {
          if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
            
          }
        }).catch(err => {
          reject(err);
        });
      }
    })
  }
}
