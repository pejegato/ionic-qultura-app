import {UserProvider} from "./../../providers/user/user";
import {ScannerProvider} from "./../../providers/scanner/scanner";
import {FirebaseDbProvider} from "./../../providers/firebase-db/firebase-db";
import {HomePage} from "./../home/home";
import {EdicionPerfilPage} from "./../edicion-perfil/edicion-perfil";
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, MenuController} from "ionic-angular";
import {MIS_LUGARES} from "../../data/dashcards.data";
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
  
  edicionPerfilPage:any = EdicionPerfilPage;
  
  
  constructor(      
      private menuController: MenuController,      
      private scannerProvider: ScannerProvider,
      public userProvider: UserProvider
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  abrirMenu() {
    this.menuController.toggle();
  }

}
