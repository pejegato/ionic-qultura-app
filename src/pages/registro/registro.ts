
import {PhotoProvider} from "./../../providers/photo/photo";
import {Component} from "@angular/core";
import {IonicPage, AlertController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { infoUsuarioInterface, obraInterface } from "../../interfaces/interfaces"


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(
      public auth: AuthProvider,
      private dbFirebase: FirebaseDbProvider,
      private photoProvider: PhotoProvider,
      private avisosProvider: AvisosProvider,
      private camera : Camera){
        
  }

  //Declaracion de variables

  form: any;

  private imgData;

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

      user.img = "noneImg";

      //this.user.uid = response.user.uid;
      if (this.imgData){

        user.img = Math.floor(Date.now() / 1000);

        this.photoProvider.uploadImage(this.imgData, user.img)

        .then(()=>{
          this.dbFirebase.guardaInfoAdicionalUsuario(user);
        })
        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
        })
        .catch(err => {
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Error', err);
        });

      }else{

        this.dbFirebase.guardaInfoAdicionalUsuario(user)

        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
        })

      }
    }).catch(err => {
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple('Error', err);
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
    }).catch(err => {
      this.avisosProvider.crearAlertaSimple('Error',"No se pudo obtener la foto");
    });
  }

  generarObjetoUsuario(form:any):infoUsuarioInterface{
    let _usuario:infoUsuarioInterface;
    _usuario.nombre=""
    _usuario.email="";
    _usuario.username=""
    _usuario.urlImg ="https://firebasestorage.googleapis.com/v0/b/qultura-63b5d.appspot.com/o/images%2FnoneImg.jpg?alt=media&token=611cf7f4-1b02-4886-aa33-bd722503a9e7"
    return _usuario
  
  }
}
