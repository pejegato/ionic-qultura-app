import { EdicionPerfilPage } from './../pages/edicion-perfil/edicion-perfil';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { RegistroPage } from './../pages/registro/registro';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, TabsPage, MapaPage } from '../pages/index-paginas';
import { LoginPage } from '../pages/login/login';

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
  
  //contactosPage: any = ContactosPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private menuController: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  

  openPage(pagina: any) {
    this.navCtrl.setRoot(pagina);
    this.menuController.close();
  }
}



