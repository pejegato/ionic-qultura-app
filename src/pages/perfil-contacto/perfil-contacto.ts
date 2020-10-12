import { Component } from '@angular/core';
import {IonicPage, MenuController, ModalController, NavParams} from 'ionic-angular';
import { CONTACTO_DATOS, CONTACTO_LUGARES } from '../../data/dashcards.data';

//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from './../../providers/avisos/avisos';
import { UserProvider } from "./../../providers/user/user";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {Observable} from "rxjs";

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
  userData:any;

  public actividadesContacto:any[] = [];

  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private avisosProvider: AvisosProvider,
    private firebaseProvider: FirebaseDbProvider,

  ) {
    this.userData = navParams.get('usuario');
    this.contactoPerfil = CONTACTO_DATOS;
    this.contactoLogros = CONTACTO_LUGARES.slice(0);
  }

  ionViewWillEnter(){
    this.obtenerDatosContacto();
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



/**************************************************************************
 * Metodo que trae los comentarios del contacto
 *
 **************************************************************************/


obtenerDatosContacto(){
  let _self= this;
  this.firebaseProvider.obtieneMensajesContacto(this.userData.data.uid).subscribe({
    next(mensajesContacto){

      //let _fechaIngresoContacto = contacto.fechaIngreso;
      if(mensajesContacto){
          _self.snapshotToArray(mensajesContacto).forEach(mensaje => {

          _self.actividadesContacto.push(mensaje);

          _self.actividadesContacto = _self.snapshotToArray(_self.actividadesContacto);

          console.log(_self.actividadesContacto);
        });
      }
    }
  })
}

  /*****************************************************************************
   * Metodo utilitario que convierte un listado de objetos en un array         *
   *****************************************************************************/

  snapshotToArray(snapshot:any[]) {
    var returnArr = [];
    if(typeof snapshot !== 'undefined'){
      Object.keys(snapshot).forEach(function(key) {
        returnArr.push(snapshot[key]);
      });
      return  returnArr.sort(function(a, b) {
        var dateA = new Date(a.fechaIngreso), dateB = new Date(b.fechaIngreso);
        return +dateB - +dateA ;
      });
    }else{
      return returnArr;
    };
  };
}




