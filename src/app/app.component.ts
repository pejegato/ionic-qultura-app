import { FirebaseDbProvider } from './../providers/firebase-db/firebase-db';
import { PerfilPage } from './../pages/perfil/perfil';
import { EdicionPerfilPage } from './../pages/edicion-perfil/edicion-perfil';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { RegistroPage } from './../pages/registro/registro';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, MapaPage } from '../pages/index-paginas';
import { LoginPage } from '../pages/login/login';
import { ListaContactosPage } from '../pages/lista-contactos/lista-contactos';
import { PerfilContactoPage } from '../pages/perfil-contacto/perfil-contacto';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild('content') navCtrl: NavController;

  rootPage: any = LoginPage;
  loginPage: any = LoginPage;
  registroPage: any = RegistroPage;
  dashboardPage: any = DashboardPage;
  edicionPerfilPage: any = EdicionPerfilPage;
  perfilPage: any = PerfilPage;
  contactosPage:any = ListaContactosPage;
  perfilContactosPage:any = PerfilContactoPage;
  
  //contactosPage: any = ContactosPage;
  datosUsuario:any = {};
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuController: MenuController,
    private auth: AuthProvider,
    private fb : FirebaseDbProvider
    
  ) {
    platform.ready().then(() => {
      /*      
      this.auth.session.subscribe(session => {
        if (session) {          
          fb.obtieneDatosUsuario();
          this.rootPage = this.dashboardPage;
        }
        else {
          this.rootPage = this.loginPage;
        }
      });
      */
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(pagina: any) {
    this.navCtrl.setRoot(pagina);
    this.menuController.close();
  }

  cerrarSesion() {
    this.auth.logout();
    this.menuController.close();
  }

  
}



