import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    private dbFirebase: FirebaseDbProvider,
    private loadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }


  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nombre: ''
  };


  loading = this.loadingController.create({ content: "Registrando, por favor espera..." });
  
  
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
    this.loading.present();

    this.auth.registerUser(usuario.email, usuario.password)
      .then((user) => {
        this.dbFirebase.guardaUsuario(usuario).then(res => {
          this.loading.dismissAll();
          this.crearAlerta('Exito',res);
        })
      })
      .catch(err => {
        this.crearAlerta('Error', err);
        this.loading.dismissAll();
      })
  }

  crearAlerta(titulo, mensaje){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
