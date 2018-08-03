import {AlertController, LoadingController} from "ionic-angular/";
import {Injectable} from "@angular/core";

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

  /*****************************************************************************
  * Crea una alerta para ser usada en el resto de los modulos                  *
  *****************************************************************************/
  crearAlertaSimple(titulo, mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: [{
        text: 'Aceptar',        
        handler: () => {
          
        }
      }]
    });
    alert.present();
  }

  /*****************************************************************************
  * Crea un loader para ser usada en el resto de los modulos                   *
  *****************************************************************************/
  crearLoading(mensaje: string) {
    let loading = this.loadingController.create(
        {content: mensaje}
    );
    return loading;
  }

}
