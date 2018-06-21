import { Component,  Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AvisosProvider } from '../../providers/avisos/avisos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import {Observable} from 'rxjs/Rx'

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
    uid:'',
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nombre: '',
    dataUrl: ''
  };
  
  alertCtrl: AlertController;


     
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

    this.auth.registerUser(usuario)    
    .then(response => {
      usuario.uid = response.user.uid;
      this.guardarDatosUsuario(usuario)
    })    
    .then(() => {
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple('Error', "Usuario Guardado con Exito");
    })     
    .catch(err => {
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple('Error', err);
    });
  }

  guardarDatosUsuario(usuario) {
    if (usuario.dataUrl){
      Promise.all([
        this.dbFirebase.guardaInfoAdicionalUsuario(usuario),
        this.auth.updatePerfilUsuario(usuario.username, "images/" + usuario.uid),
        this.dbFirebase.uploadImage(usuario.dataUrl, usuario.uid)
      ])
    }else{
      Promise.all([
        this.dbFirebase.guardaInfoAdicionalUsuario(usuario),
        this.auth.updatePerfilUsuario(usuario.username, "images/" + usuario.uid),        
      ])
    }
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
       this.user.dataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }).catch(err => {
      this.avisosProvider.crearAlertaSimple('Error',"No se pudo obtener la foto");
    });
  }  

}