import {AvisosProvider} from "./../providers/avisos/avisos";
import {UserProvider} from "./../providers/user/user";
import {PhotoProvider} from "./../providers/photo/photo";
import {FirebaseDbProvider} from "./../providers/firebase-db/firebase-db";
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
    private firebaseProvider: FirebaseDbProvider,
    private photoProvider: PhotoProvider,
    public userProvider: UserProvider,
    private avisosProvider: AvisosProvider
  ) {
    if (this.rootPage !== StartPage) {
      this.loading.present();
    }
    this.loading.present();
    platform.ready().then(() => {

      this.authProvider.session.subscribe(session => {

        if (session) {
          this.firebaseProvider.obtieneDatosUsuario(session.uid).subscribe(
            response => {
              this.userProvider.datosUsuario = response;
              this.photoProvider.downloadImageUrl(response.uid)
                .then(url => {
                  this.userProvider.datosUsuario.imgUrl = url;
                  this.loading.dismiss();
                  this.rootPage = this.dashboardPage;
                })
                .catch(()=> {
                  this.loading.dismiss();
                  console.log("No se pudo obtener la foto");
                  this.avisosProvider.crearAlertaSimple('Error', "No se pudo obtener la foto");
                });
            },
            error => {
              console.log()
              this.loading.dismiss();
              console.log("No se pudo obtener el usuario");
              this.avisosProvider.crearAlertaSimple('Error', "No se pudo obtener el usuario");
            })
        } else {
          this.loading.dismiss();
          this.rootPage = this.loginPage;
        }
      });
      
      statusBar.styleDefault();
      splashScreen.hide();
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



