import { PerfilContactoPage } from './../perfil-contacto/perfil-contacto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, ModalController } from 'ionic-angular';
import { CONTACTOS } from '../../data/dashcards.data';

//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from './../../providers/avisos/avisos';
import { UserProvider } from "./../../providers/user/user";


/**
 * Generated class for the ListaContactosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-contactos',
  templateUrl: 'lista-contactos.html',
})

export class ListaContactosPage {  
  listaContactos: any[] = [];
  perfilContactoPage:any = PerfilContactoPage;
  constructor  (
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    private avisosProvider: AvisosProvider) {
      this.listaContactos = CONTACTOS.slice(0);
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
