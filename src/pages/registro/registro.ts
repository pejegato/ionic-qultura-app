import { Component,  Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AvisosProvider } from '../../providers/avisos/avisos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

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
    private avisosProvider: AvisosProvider,
    private camera : Camera
  ) {
  }
  
  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nombre: '',
    dataUrl: ''
  };
  
  alertCtrl: AlertController;

  @Input('useURI') useURI: Boolean = true;
     
  signin() {
    if (this.user.passwordConfirm === this.user.password){      
      this.registrarUsuario(this.user);
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
          this.dbFirebase.upload(this.user.captureDataUrl).then(res =>{
            loading.dismiss();
            this.avisosProvider.crearAlertaSimple('Exito',"Usuario creado con exito");
          })
        })
      })
      .catch(err => {
        this.avisosProvider.crearAlertaSimple('Error', err);
        loading.dismiss();
      })
  }

  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:  this.camera.EncodingType.JPEG,
      mediaType:  this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };
    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.user.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }).catch(err => {
      this.avisosProvider.crearAlertaSimple('Error',"No se pudo obtener la foto");
    });
  }
}
