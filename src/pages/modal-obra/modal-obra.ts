import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular/';

/**
 * Generated class for the ModalObraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-obra',
  templateUrl: 'modal-obra.html',
})
export class ModalObraPage {
  obraEscaneada = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.obraEscaneada = navParams.get("obra");
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalObraPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
