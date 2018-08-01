<<<<<<< HEAD

import {PhotoProvider} from "./../../providers/photo/photo";
=======
>>>>>>> master
import {Component} from "@angular/core";
import {IonicPage, AlertController, NavController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {Camera, CameraOptions} from "@ionic-native/camera";
<<<<<<< HEAD
import { infoUsuarioInterface, obraInterface } from "../../interfaces/interfaces"
=======
import { diccionarioErrores } from "../../providers/constants/errores";
import { DashboardPage } from "../dashboard/dashboard";
import { UserProvider } from "../../providers/user/user";
>>>>>>> master


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(
      public auth: AuthProvider,
      private firebaseProvider: FirebaseDbProvider,      
      private avisosProvider: AvisosProvider,
<<<<<<< HEAD
      private camera : Camera){
        
  }

  //Declaracion de variables

  form: any;
=======
      private camera : Camera,
      private errores : diccionarioErrores,
      private navCtrl: NavController,
      public userProvided: UserProvider
    ){
  }

    user = {
        uid:'',
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        nombre: '',
        img: '',
        imgUrl: '',
        puntaje: '0',
        obrasEscaneadas:[]
  };
>>>>>>> master

  private imgData:string;

  alertCtrl: AlertController;

  signin(){
    if (this.form.passwordConfirm === this.form.password){
      let user:infoUsuarioInterface = this.generarObjetoUsuario(this.form);
      this.registrarUsuario(user, this.form.password);
    }else{
      this.avisosProvider.crearAlertaSimple('Error!','Passwords no coinciden!');
    }
  }

  registrarUsuario(user, password){

    let loading = this.avisosProvider.crearLoading("Registrando usuario...");
    loading.present();
    
    this.auth.registerUser(user)
    .then(response => {
      
      //imagen por defecto
      user.img = diccionarioErrores.IMG_DEFECTO;
      user.imgUrl = diccionarioErrores.URL_IMG_DEFECTO;

      //this.user.uid = response.user.uid;
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
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
          this.navCtrl.setRoot(DashboardPage);
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
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
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
    }).catch(() => {
      this.avisosProvider.crearAlertaSimple('Error',"No se pudo obtener la foto");
    });
  }

<<<<<<< HEAD
  generarObjetoUsuario(form:any):infoUsuarioInterface{
    let _usuario:infoUsuarioInterface;
    _usuario.nombre=""
    _usuario.email="";
    _usuario.username=""
    _usuario.urlImg ="https://firebasestorage.googleapis.com/v0/b/qultura-63b5d.appspot.com/o/images%2FnoneImg.jpg?alt=media&token=611cf7f4-1b02-4886-aa33-bd722503a9e7"
    return _usuario
  
=======
  
  omit_special_char(event, email){
    var k;  
    k = event.charCode;
    var x = 64
    if(email)
    x=63
    return ((k > x && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57 || k == 45 || k == 46 || k == 95));
>>>>>>> master
  }
}
