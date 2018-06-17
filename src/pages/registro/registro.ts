import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, normalizeURL } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AvisosProvider } from '../../providers/avisos/avisos';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

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
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController
  ) {
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

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  uploadImageToFirebase(image) {
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.dbFirebase.uploadImage(image)
      .then(photoURL => {

        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }
}
