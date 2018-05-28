import { InicioSesionPage } from './../inicio-sesion/inicio-sesion';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController) {
  }
  user = { email: '', password: '' };
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
    }
    )
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

  
    

}
