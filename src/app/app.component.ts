import {AvisosProvider} from "./../providers/avisos/avisos";
import {UserProvider} from "./../providers/user/user";
import {PerfilPage} from "./../pages/perfil/perfil";
import {EdicionPerfilPage} from "./../pages/edicion-perfil/edicion-perfil";
import {DashboardPage} from "./../pages/dashboard/dashboard";
import {RegistroPage} from "./../pages/registro/registro";
import {Component, ViewChild} from "@angular/core";
import {Platform, MenuController, NavController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginPage} from "../pages/login/login";
import {ListaContactosPage} from "../pages/lista-contactos/lista-contactos";
import {PerfilContactoPage} from "../pages/perfil-contacto/perfil-contacto";
import {AuthProvider} from "../providers/auth/auth";
import {StartPage} from "../pages/start/start";
import * as firebase from "firebase/app";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  rootPage: any = StartPage;
  loginPage: any = LoginPage;
  registroPage: any = RegistroPage;
  dashboardPage: any = DashboardPage;
  edicionPerfilPage: any = EdicionPerfilPage;
  perfilPage: any = PerfilPage;
  contactosPage:any = ListaContactosPage;
  perfilContactosPage:any = PerfilContactoPage;

  loading = this.avisosProvider.crearLoading("Por favor espera...");

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuController: MenuController,
    private authProvider: AuthProvider,
    private userProvider: UserProvider,
    private avisosProvider: AvisosProvider) {

      if (this.rootPage !== StartPage) {
      this.loading.present();

    }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
<<<<<<< HEAD
          this.userProvider.getUserData(user)
          .then(response => {

            let usuarioActual = {};

            usuarioActual.username = response.username;
            usuarioActual.imgUrl = response.imgUrl;

              this.userProvider.datosUsuario = response;
              this.userProvider.datosUsuario.uid = this.authProvider.currentUser.uid;
              if (this.userProvider.datosUsuario.obras){
                let obras = this.userProvider.datosUsuario.obras;
                this.userProvider.datosUsuario.obras = snapshotToArray(obras);
              }
              this.navCtrl.setRoot(DashboardPage);

          });
=======
          this.userProvider.getUserData(user).then(()=>{ 
                       
            this.navCtrl.setRoot(DashboardPage);            
          }).catch(()=>{
            this.navCtrl.setRoot(LoginPage);  
          })          
>>>>>>> master
        } else {          
          this.navCtrl.setRoot(LoginPage);
        }
        this.loading.dismiss();
      }), error => {
          this.loading.dismiss();
          this.navCtrl.setRoot(LoginPage);
          this.avisosProvider.crearAlertaSimple('Error!','Se ha producido un error rescatando datos de usuario: '+ error);
      }
    });
  }

  openPage(pagina: any) {
    this.navCtrl.setRoot(pagina);
    this.menuController.close();
  }

  cerrarSesion() {
    this.authProvider.logout();
    this.menuController.close();
  }
}





