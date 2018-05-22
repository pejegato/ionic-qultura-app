import { ScanData } from './../../models/scan-data.model';
import { HistorialProvider } from './../../providers/historial/historial';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial:ScanData[] = []; 
    constructor(private _historialService:HistorialProvider) {
  }

  ionViewDidLoad() {
    this.historial = this._historialService.cargarHistorial();
  }

  abrir_scan(index:number){
    this._historialService.abrir_scan(index);
  }

}
