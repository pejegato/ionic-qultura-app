import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AvisosProvider } from '../../providers/avisos/avisos';

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
    private dbFirebase: FirebaseDbProvider,
    private loadingController: LoadingController,
    private avisosProvider: AvisosProvider
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

  
  
  signin() {   

    if (this.user.passwordConfirm === this.user.password){      
      this.registrarUsuario(this.user)
      
    }else{            
      this.avisosProvider.crearAlertaSimple('Error!','Passwords no coinciden!');
    }
  }

  registrarUsuario(usuario){
    let loading = this.avisosProvider.crearLoading();
    loading.present();

    this.auth.registerUser(usuario.email, usuario.password)
      .then((user) => {
        this.dbFirebase.guardaUsuario(usuario).then(res => {        
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Exito',"Usuario creado con exito");
        })
      })
      .catch(err => {
        this.avisosProvider.crearAlertaSimple('Error', err);
        loading.dismiss();
      })
  }

  

}
