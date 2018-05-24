import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CONTACTO_DATOS, CONTACTO_LUGARES } from '../../data/dashcards.data';

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
  
  homePage: any = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController) {
    this.contactoPerfil = CONTACTO_DATOS;
    this.contactoLogros = CONTACTO_LUGARES.slice(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  abrirMenu() {
    this.menuController.toggle();
  }

}