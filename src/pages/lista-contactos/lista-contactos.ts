import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CONTACTOS } from '../../data/dashcards.data';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController) {
    this.listaContactos = CONTACTOS.slice(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaContactosPage');
  }

  abrirMenu() {
    this.menuController.toggle();
  }

}
