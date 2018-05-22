import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Dashcard } from '../../interfaces/dashcard-interface';
import { DASHCARDS } from '../../data/dashcards.data';



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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController) {

    this.listaContactos = DASHCARDS.slice(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    
    
  }

  abrirMenu(){
    this.menuController.toggle();
  }

}
