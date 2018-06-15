import { ScannerProvider } from './../../providers/scanner/scanner';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


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
  homePage: any = HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController, public sc: ScannerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdicionPerfilPage');
  }

  abrirMenu() {
    this.menuController.toggle();
  }

}
