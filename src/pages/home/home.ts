import { HistorialProvider } from './../../providers/historial/historial';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private platform: Platform, private historialProvider: HistorialProvider) {

  }

  scanCode(){
    console.log("Escaneando...");
    if(!this.platform.is('cordova')){
     this.historialProvider.agregarHistorial("http://google.com");
     return;
    }
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Escaneando...");
      console.log('Barcode text: '+ barcodeData.text);
      console.log('Barcode format: '+ barcodeData.format);
      console.log('Barcode cancelled: '+ barcodeData.cancelled);

      if (!barcodeData.cancelled && barcodeData.cancelled!==null){
        this.historialProvider.agregarHistorial(barcodeData.text);
      }

    }).catch(err => {
      
      console.log('Error', err);
      this.mostrarError("Error: " + err);
    });
  }

  mostrarError(mensaje:string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });

    toast.present();
  }

}
