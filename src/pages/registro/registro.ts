import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  
  user = { 
    email: '', 
    password: '', 
    passwordConfirm:'',
    username: '',
    nombre: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    private dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  signin() {
    if (this.user.passwordConfirm === this.user.password){
      this.registrarUsuario(this.user)
    }else{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Passwords no coinciden",
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  registrarUsuario(usuario){
    this.auth.registerUser(usuario.email, usuario.password)
      .then((user) => {
        this.dbFirebase.guardaUsuario(usuario).then(res => {
          let alert = this.alertCtrl.create({
            title: 'Exito',
            subTitle: "Usuario Creado!",
            buttons: ['Aceptar']
          });
          alert.present();
        })
      })
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
