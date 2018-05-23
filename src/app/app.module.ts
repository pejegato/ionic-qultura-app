import { InicioSesionPage } from './../pages/inicio-sesion/inicio-sesion';
import { PerfilPage } from './../pages/perfil/perfil';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { LoginPage } from './../pages/login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage, TabsPage, GuardadosPage, MapaPage } from './../pages/index-paginas';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistorialProvider } from '../providers/historial/historial';
import { AgmCoreModule } from '@agm/core';
import { RegistroPage } from '../pages/registro/registro';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage,
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYi00yrWm7s1YVl0mOHEh9GfNqVCZpTU4'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage,
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
