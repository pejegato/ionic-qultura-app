import {PhotoProvider} from "./../../providers/photo/photo";
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {Camera, CameraOptions} from "@ionic-native/camera";

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
      private photoProvider: PhotoProvider,
      private loadingController: LoadingController,
      private avisosProvider: AvisosProvider,
      private camera : Camera
  ) {
  }

    public user = {
    uid:'',
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nombre: '',
    img: ''
  };

  private imgData 
  
  alertCtrl: AlertController;

  signin() {
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
      this.user.uid = response.user.uid
      if (this.imgData){
        const filename = Math.floor(Date.now() / 1000);
        user.img = filename
          this.photoProvider.uploadImage(this.imgData, filename)
        .then(()=>{          
          this.dbFirebase.guardaInfoAdicionalUsuario(user)
          .then(()=>{          
            loading.dismiss();
            this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
          })
        })
      }else{
        user.img = "noneImg"
        this.dbFirebase.guardaInfoAdicionalUsuario(user)
        .then(()=>{          
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Exito', "Usuario Guardado con Exito");
        })
      }       
    })
    .catch(err => {
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

}