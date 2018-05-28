import { PerfilPage } from './../pages/perfil/perfil';
import { EdicionPerfilPage } from './../pages/edicion-perfil/edicion-perfil';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { RegistroPage } from './../pages/registro/registro';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, TabsPage, MapaPage } from '../pages/index-paginas';
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

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuController: MenuController,
    private auth: AuthProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.Session.subscribe(session => {
        if (session) {
          this.rootPage = this.dashboardPage;
        }
        else {
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
    this.auth.getUser();
    this.menuController.close();
  }

  
}



