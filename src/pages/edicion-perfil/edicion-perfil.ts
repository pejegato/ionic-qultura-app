import { Component } from '@angular/core';
import { IonicPage, MenuController, ModalController, NavController, AlertController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { Camera, CameraOptions } from '../../../node_modules/@ionic-native/camera';
import { diccionarioErrores } from '../../providers/constants/errores';

//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from './../../providers/avisos/avisos';
import { UserProvider } from "./../../providers/user/user";
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-edicion-perfil',
  templateUrl: 'edicion-perfil.html',
})

export class EdicionPerfilPage {
  user = {
    uid:'',
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nombre: '',
    img: '',
    imgUrl: '',
    puntaje: '',
    obrasEscaneadas:[]
};

  password:any;
  nuevoPassword:any;


private originalMail:string;

  constructor(
    private menuController: MenuController,
    public modalCtrl: ModalController,
    public auth: AuthProvider ,
    private scannerProvider: ScannerProvider,
    private firebaseProvider: FirebaseDbProvider,
    private avisosProvider: AvisosProvider,
    public userProvider: UserProvider,
    private camera : Camera,
    private errores : diccionarioErrores,
    private navCtrl: NavController
  ) {
    this.user = userProvider.datosUsuario;
    this.originalMail = userProvider.datosUsuario.email
  }

/*****************************************************************************
* metodo que abre el menu lateral para acceder a las diferentes acciones
******************************************************************************/
  abrirMenu(){
    this.menuController.toggle();
  }

/*****************************************************************************
* metodo que abre el scanner y detecta eñ codigo QR,
* si todo sale bien despliega un modal con los datos de la obra escaneada
******************************************************************************/

  abrirScanner(){
    this.scannerProvider.scanCode(this.userProvider.datosUsuario)
    .then(obraResponse =>{
      const modal = this.modalCtrl.create(ModalObraPage, { obra: obraResponse});
      modal.present();
    }).catch(err =>{
      this.avisosProvider.crearAlertaSimple('Error', err);
    })
  }
  private imgData:string;

  alertCtrl: AlertController;

  signin(){
    if (this.user.passwordConfirm === this.user.password){
      this.actualizarUsuario(this.user);
    }else{
      this.avisosProvider.crearAlertaSimple('Error!','Passwords no coinciden!');
    }
  }

  actualizarUsuario(user){

    let loading = this.avisosProvider.crearLoading("Editando usuario...");
    loading.present();

    this.auth.updatePerfilUsuario(user,this.originalMail)
    .then(response => {
      //imagen por defecto
      this.user.img = diccionarioErrores.IMG_DEFECTO;
      this.user.imgUrl = diccionarioErrores.URL_IMG_DEFECTO;

      if (this.imgData){
        user.img = Math.floor(Date.now() / 1000);
        this.firebaseProvider.uploadImage(this.imgData, user.img)
        .then(()=>
          this.firebaseProvider.downloadImageUrl(user.img)
        .then(url=>{
          user.imgUrl = url;
          this.firebaseProvider.guardaInfoAdicionalUsuario(user)
        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Éxito', "Usuario editado correctamente.");
          this.navCtrl.setRoot(PerfilPage);
          })
        })
        .catch(err => {
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Error', this.errores.traducirError('LOGIN',err.code));
        }));
      }else{
        this.firebaseProvider.guardaInfoAdicionalUsuario(user)
        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('¡Éxito!', "Usuario editado correctamente.");
        })
        .catch(err => {
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Error', this.errores.traducirError('LOGIN',err.code));
        });
      }
    }).catch(err => {
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple('Error', this.errores.traducirError('LOGIN',err.code));
    });
  }

  actualizarPassword(nuevoPassword, nuevoPasswordConfirm){

    let loading = this.avisosProvider.crearLoading("Actualizando Password...");
    loading.present();
    if (nuevoPassword === nuevoPasswordConfirm){
      this.auth.updatePasswordUsuario(this.user, nuevoPassword)
      .then(response => {
        //manejar esta actualizacion
        this.user.password = nuevoPassword;
        this.user.passwordConfirm = nuevoPasswordConfirm;
        this.firebaseProvider.guardaInfoAdicionalUsuario(this.user)
      })
      .then(()=>{
        loading.dismiss();
        this.avisosProvider.crearAlertaSimple('¡Éxito!', "Password actualizado correctamente.");
        this.navCtrl.setRoot(PerfilPage);
      })
      .catch(err => {
            loading.dismiss();
            this.avisosProvider.crearAlertaSimple('Error', this.errores.traducirError('LOGIN',err.code));
      });
    }else{
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple('Error!','Passwords no coinciden!');
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
       this.imgData = 'data:image/jpeg;base64,' + captureDataUrl;
    })
  }
}
