import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the AvisosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvisosProvider {

  constructor(
    public alertCtrl: AlertController, 
    private loadingController: LoadingController
  ) {}

  crearAlertaSimple(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  crearLoading(){
    let loading = this.loadingController.create(
      { content: "Conectando, por favor espera..." }
    );
    return loading;
  }

}
