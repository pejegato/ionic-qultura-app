import {InicioSesionPage} from "./../inicio-sesion/inicio-sesion";
import {DashboardPage} from "./../dashboard/dashboard";
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {RegistroPage} from "../registro/registro";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registroPage: any = RegistroPage;
  dashboardPage: any = DashboardPage;
  inicioSesionPage: any = InicioSesionPage;

  loading: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }
  

}
