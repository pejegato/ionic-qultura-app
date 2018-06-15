import { ScannerProvider } from './../../providers/scanner/scanner';
import { FirebaseDbProvider } from './../../providers/firebase-db/firebase-db';
import { HomePage } from './../home/home';
import { EdicionPerfilPage } from './../edicion-perfil/edicion-perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MIS_DATOS, MIS_LUGARES } from '../../data/dashcards.data';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  miPerfil:any;
  misLogros:any;
  edicionPerfilPage:any = EdicionPerfilPage;
  homePage: any = HomePage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menuController: MenuController,
    private fb: FirebaseDbProvider,
    public sc: ScannerProvider) {

    this.miPerfil  = fb.datosUsuario;
    this.misLogros = MIS_LUGARES.slice(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  abrirMenu() {
    this.menuController.toggle();
  }

}
