import {UserProvider} from "./../../providers/user/user";
import {Component} from "@angular/core";
import {IonicPage, MenuController} from "ionic-angular";
import {Dashcard} from "../../interfaces/dashcard-interface";
import {DASHCARDS} from "../../data/dashcards.data";
import {ScannerProvider} from "../../providers/scanner/scanner";

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
  
  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider

  ) {
    this.listaContactos = DASHCARDS.slice(0);
  }

  abrirMenu(){
    this.menuController.toggle();
  }

  ionViewDidLoad(){
    
  }
}
