import { AvisosProvider } from './../../providers/avisos/avisos';
import {UserProvider} from "./../../providers/user/user";
import {Component} from "@angular/core";
import {IonicPage, MenuController, ModalController, NavParams} from "ionic-angular";
import {Dashcard} from "../../interfaces/dashcard-interface";
import {DASHCARDS} from "../../data/dashcards.data";
import {ScannerProvider} from "../../providers/scanner/scanner";
import { StartPage } from "../start/start";
import { ModalObraPage } from "../modal-obra/modal-obra";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {

  listaContactos:Dashcard[] = [];

  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    private avisosProvider: AvisosProvider
  ) {
    this.listaContactos = DASHCARDS.slice(0);
  }

  abrirMenu(){
    this.menuController.toggle();
  }


  //metodo que abre el scanner y detecta qr, si todo sale bien despliega un modal con los datos de la obra escaneada
  abrirScanner(){            
    this.sc.scanCode(this.userProvider.datosUsuario)
    .then(obraResponse =>{        
      const modal = this.modalCtrl.create(ModalObraPage, { obra: obraResponse});
      modal.present();
    }).catch(err =>{
      this.avisosProvider.crearAlertaSimple('Error', "Problemas escaneando la obra!");
    })
  }

}
