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
    public http: HttpClient, 
    private barcodeScanner: BarcodeScanner, 
    private toastCtrl: ToastController, 
    private platform: Platform, 
    private historialProvider: HistorialProvider) {
    console.log('Hello ScannerProvider Provider');
  }

  scanCode() {
    console.log("Escaneando...");
    if (!this.platform.is('cordova')) {
      this.historialProvider.agregarHistorial("http://google.com");
      return;
    }
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Escaneando...");
      console.log('Barcode text: ' + barcodeData.text);
      console.log('Barcode format: ' + barcodeData.format);
      console.log('Barcode cancelled: ' + barcodeData.cancelled);

      if (!barcodeData.cancelled && barcodeData.cancelled !== null) {
        this.historialProvider.agregarHistorial(barcodeData.text);
      }

    }).catch(err => {

      console.log('Error', err);
      this.mostrarError("Error: " + err);
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
