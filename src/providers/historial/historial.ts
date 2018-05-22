import { ScanData } from './../../models/scan-data.model';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private historial:ScanData[] = [];
  
  constructor(private iab: InAppBrowser) {}


  agregarHistorial(texto:string){
    let data = new ScanData(texto);
    this.historial.unshift(data);
    console.log(this.historial);

    this.abrir_scan(0);

  }

  abrir_scan(index:number){
    let scanData = this.historial[index];
    console.log(scanData);
    switch (scanData.tipo) {
      case "http": this.iab.create(scanData.info, "_system");
      
      default: console.log("Tipo no soportado")
    }  
  

  }

  cargarHistorial(){
    return this.historial;
  }

}
