import {Component} from "@angular/core";
import {IonicPage, AlertController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { diccionarioErrores } from "../../providers/constants/errores";


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
      private camera : Camera,
      private errores : diccionarioErrores){
  }

    user = {
        uid:'',
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        nombre: '',
        img: '',
        puntaje: '',
        obrasEscaneadas:[]
  };

  private imgData:string;

  alertCtrl: AlertController;

  signin(){
    if (this.user.passwordConfirm === this.user.password){
      this.registrarUsuario(this.user);
    }else{
      this.avisosProvider.crearAlertaSimple('Error!','Passwords no coinciden!');
    }
  }

  registrarUsuario(user){

    let loading = this.avisosProvider.crearLoading("Registrando usuario...");
    loading.present();
    this.auth.registerUser(user)
    .then(response => {
      
      //imagen por defecto
      user.img = "noneImg";
      user.imgUrl = "https://firebasestorage.googleapis.com/v0/b/qultura-63b5d.appspot.com/o/images%2FnoneImg.jpg?alt=media&token=611cf7f4-1b02-4886-aa33-bd722503a9e7"

      this.user.uid = response.user.uid;
      if (this.imgData){

        user.img = Math.floor(Date.now() / 1000);

        this.firebaseProvider.uploadImage(this.imgData, user.img)
        .then(()=>{
          this.firebaseProvider.guardaInfoAdicionalUsuario(user);
        })
        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
        })
        .catch(err => {
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Error', this.errores.traducirError('LOGIN',err.code));
        });
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
}
