import { Component } from '@angular/core';
import { IonicPage, MenuController, ModalController } from 'ionic-angular';
import { CONTACTO_DATOS, CONTACTO_LUGARES } from '../../data/dashcards.data';

//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from './../../providers/avisos/avisos';
import { UserProvider } from "./../../providers/user/user";

/**
 * Generated class for the PerfilContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-contacto',
  templateUrl: 'perfil-contacto.html',
})
export class PerfilContactoPage {
  contactoPerfil: any;
  contactoLogros: any;
  

  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    private avisosProvider: AvisosProvider
  ) {
    this.contactoPerfil = CONTACTO_DATOS;
    this.contactoLogros = CONTACTO_LUGARES.slice(0);
  }

/*****************************************************************************
* metodo que abre el menu lateral para acceder a las diferentes acciones
******************************************************************************/
abrirMenu(){
  this.menuController.toggle();
}

/*****************************************************************************
* metodo que abre el scanner y detecta eñ codigo QR, 
* si todo sale bien despliega un modal con los datos de la obra escaneada
******************************************************************************/

abrirScanner(){            
  this.sc.scanCode(this.userProvider.datosUsuario)
  .then(obraResponse =>{    
    const modal = this.modalCtrl.create(ModalObraPage, { obra: obraResponse});
    modal.present();
  }).catch(err =>{      
    this.avisosProvider.crearAlertaSimple('Error', err);
  })
}

}