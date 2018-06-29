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

  scanCode(idUsuario) {
    return new Promise<any>((resolve, reject) => {      
      if (!this.platform.is('cordova')) {
        let idObra= "1";
        this.userProvider.getPiecesData(idObra)
        .then(response1 => {
          response1.uid = idObra;
          this.firebaseProvider.updateDatosUsuarioObra(idUsuario, response1)
          .then(response => {
            resolve(response1);
          })
          .catch(err => {
            reject(err);
          });
        })
        .catch(err => {
          reject(err);
        });
      } else {
        this.barcodeScanner.scan().then(barcodeData => {
          if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
            let idObra = barcodeData.text;
            this.userProvider.getPiecesData(idObra)
            .then(response1 => {
              response1.uid = idObra;
              this.firebaseProvider.updateDatosUsuarioObra(idUsuario, response1)
                .then(response => {
                  resolve(response1);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
          }
        })
      }
    })
  }
}
