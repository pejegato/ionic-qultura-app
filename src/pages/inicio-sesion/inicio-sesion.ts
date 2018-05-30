import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public loadingController: LoadingController) {
  }

  loading = this.loadingController.create({ content: "Conectando, por favor espera..." });

  login() {    
    this.loading.present();
    this.auth.loginUser(this.user.email, this.user.password)
    
    .then((user) => { 
      this.loading.dismissAll();  
    })
    .catch(err => {      
      this.crearAlerta(err).present();
      this.loading.dismissAll();
    })
  }

  crearAlerta(err){
    return this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
  }


}
