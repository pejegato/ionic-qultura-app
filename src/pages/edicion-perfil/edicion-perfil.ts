import { Component } from '@angular/core';
import { IonicPage, MenuController, ModalController } from 'ionic-angular';

//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from './../../providers/avisos/avisos';
import { UserProvider } from "./../../providers/user/user";


/**
 * Generated class for the EdicionPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edicion-perfil',
  templateUrl: 'edicion-perfil.html',
})

export class EdicionPerfilPage {
  
  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    private avisosProvider: AvisosProvider
  ) {
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
