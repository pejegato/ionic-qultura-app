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

  scanCode() {
    return new Promise<any>((resolve, reject) => {
      
      if (!this.platform.is('cordova')) {
        this.userProvider.getPiecesData("1").then(response => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      }
    });
    
  }

  mostrarError(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });

    toast.present();
  }

}
