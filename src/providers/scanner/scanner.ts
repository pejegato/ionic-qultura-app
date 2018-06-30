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

  scanCode(usuario) {
    return new Promise<any>((resolve, reject) => {
      if (!this.platform.is('cordova')) {
        let idObra= "2";
        this.userProvider.getPiecesData(idObra)
        .then(response1 => {
          response1.uid = idObra;
          this.firebaseProvider.updateDatosUsuarioObra(usuario, response1)
          .then(response => {
            resolve(response1);
          })
        })
        .catch(err => {
          reject(err);
        });
      } else {
        this.barcodeScanner.scan().then(barcodeData => {
          if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
            let idObra = barcodeData.text;
            this.userProvider.getPiecesData(idObra)
            .then(obraResponse => {
              obraResponse.uid = idObra;
              this.firebaseProvider.updateDatosUsuarioObra(usuario, obraResponse)
              .then(() => {
                this.firebaseProvider.updateDatosUsuarioPuntaje(usuario, obraResponse)
                resolve(obraResponse);
              })
            })
          }
        }).catch(err => {
          reject(err);
        });
      }
    })
  }
}
