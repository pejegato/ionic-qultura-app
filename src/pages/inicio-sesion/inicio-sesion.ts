import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the InicioSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html',
})
export class InicioSesionPage {
  user = { email: '', password: '' };
  dashboardPage: any  = DashboardPage;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioSesionPage');
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
