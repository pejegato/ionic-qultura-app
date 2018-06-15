import { FirebaseDbProvider } from './../../providers/firebase-db/firebase-db';
import { HomePage } from './../home/home';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Dashcard } from '../../interfaces/dashcard-interface';
import { DASHCARDS } from '../../data/dashcards.data';
import { ScannerProvider } from '../../providers/scanner/scanner';

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
  homePage:any = HomePage;
  listaContactos:Dashcard[] = [];
  datosUsuario:any = {}
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menuController: MenuController,
    public fb: FirebaseDbProvider,
    public sc: ScannerProvider

  ) {

    this.listaContactos = DASHCARDS.slice(0);
  }

  abrirMenu(){
    this.menuController.toggle();
  }

  ionViewDidLoad(){
   this.fb.obtieneDatosUsuario();
  }
}
