import { EdicionPerfilPage } from './../pages/edicion-perfil/edicion-perfil';
import { InicioSesionPage } from './../pages/inicio-sesion/inicio-sesion';
import { PerfilPage } from './../pages/perfil/perfil';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { LoginPage } from './../pages/login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage, GuardadosPage, MapaPage } from './../pages/index-paginas';
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
import { ListaContactosPage } from '../pages/lista-contactos/lista-contactos';
import { PerfilContactoPage } from '../pages/perfil-contacto/perfil-contacto';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AvisosProvider } from '../providers/avisos/avisos';
import { diccionarioErrores } from '../providers/constants/errores';



export const firebaseConfig = {
  apiKey: "AIzaSyDcB8jqFCAA5L1ieeI7E_K7toTJZXUEJ_4",
  authDomain: "qultura-63b5d.firebaseapp.com",
  databaseURL: "https://qultura-63b5d.firebaseio.com",
  projectId: "qultura-63b5d",
  storageBucket: "qultura-63b5d.appspot.com",
  messagingSenderId: "996842443204"  
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,    
    GuardadosPage,
    MapaPage,
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage,
    EdicionPerfilPage,
    ListaContactosPage,
    PerfilContactoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYi00yrWm7s1YVl0mOHEh9GfNqVCZpTU4'
    }),
    HttpClientModule,
     AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage,
    EdicionPerfilPage,
    ListaContactosPage,
    PerfilContactoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider,
    AuthProvider,
    FirebaseDbProvider,
    AvisosProvider,
    diccionarioErrores
  ]
})
export class AppModule {}
