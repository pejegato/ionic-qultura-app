import {EdicionPerfilPage} from "./../pages/edicion-perfil/edicion-perfil";
import {InicioSesionPage} from "./../pages/inicio-sesion/inicio-sesion";
import {PerfilPage} from "./../pages/perfil/perfil";
import {DashboardPage} from "./../pages/dashboard/dashboard";
import {LoginPage} from "./../pages/login/login";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {MyApp} from "./app.component";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AgmCoreModule} from "@agm/core";
import {RegistroPage} from "../pages/registro/registro";
import {ListaContactosPage} from "../pages/lista-contactos/lista-contactos";
import {PerfilContactoPage} from "../pages/perfil-contacto/perfil-contacto";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AuthProvider} from "../providers/auth/auth";
import {FirebaseDbProvider} from "../providers/firebase-db/firebase-db";
import {AvisosProvider} from "../providers/avisos/avisos";
import {diccionarioErrores} from "../providers/constants/errores";
import {ScannerProvider} from "../providers/scanner/scanner";
import {Camera} from "@ionic-native/camera";
import {UserProvider} from "../providers/user/user";
import {StartPage} from "../pages/start/start";
import { ModalObraPage } from "../pages/modal-obra/modal-obra";
import { PhotosProvider } from '../providers/photos/photos';
import 'firebase/storage';
import { ModalBuscarUsuarioPage } from "../pages/modal-buscar-usuario/modal-buscar-usuario";

export const firebaseConfig = {
  apiKey: "AIzaSyBP9JDYl1X_0EaKIDBUimQnsUavudVPMzw",
  authDomain: "qulturatesting.firebaseapp.com",
  databaseURL: "https://qulturatesting.firebaseio.com",
  projectId: "qulturatesting",
  storageBucket: "qulturatesting.appspot.com",
  messagingSenderId: "458092754772"
};

@NgModule({
  declarations: [
    MyApp,   
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage,
    EdicionPerfilPage,
    ListaContactosPage,
    PerfilContactoPage,
    StartPage,
    ModalObraPage,
    ModalBuscarUsuarioPage
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
    LoginPage,
    RegistroPage,
    DashboardPage,
    PerfilPage,
    InicioSesionPage,
    EdicionPerfilPage,
    ListaContactosPage,
    PerfilContactoPage,
    StartPage,
    ModalObraPage,
    ModalBuscarUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},    
    AuthProvider,
    FirebaseDbProvider,
    AvisosProvider,
    diccionarioErrores,
    ScannerProvider,
    Camera,
    UserProvider,
    PhotosProvider
    
  ]
})
export class AppModule {}
