
import { Component } from "@angular/core";
import { IonicPage, MenuController, ModalController} from "ionic-angular";
import { Dashcard } from "../../interfaces/dashcard-interface";
import { DASHCARDS } from "../../data/dashcards.data";
//Dependencias para Scanner
import { ScannerProvider } from "../../providers/scanner/scanner";
import { ModalObraPage } from "../modal-obra/modal-obra";
import { AvisosProvider } from '../../providers/avisos/avisos';
import { UserProvider } from "../../providers/user/user";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {

  listaContactos:Dashcard[] = [];
  public comentario:any

  constructor(
    private menuController: MenuController,
    public sc: ScannerProvider,
    public userProvider: UserProvider,
    public modalCtrl: ModalController,
    private avisosProvider: AvisosProvider,
    private firebaseProvider: FirebaseDbProvider
  ) {
    this.listaContactos = DASHCARDS.slice(0);
    this.comentario = {      
      autor:"",
      cuerpo:"",      
      uid:"",
    };
  }

/*****************************************************************************
* metodo que abre el menu lateral para acceder a las diferentes acciones
******************************************************************************/
  abrirMenu(){
    this.menuController.toggle();
  }

/*****************************************************************************
* metodo que abre el scanner y detecta eñ codigo QR, 
* si todo sale bien despliega un modal con los datos de la obra escaneada
******************************************************************************/
  
  abrirScanner(){            
    this.sc.scanCode(this.userProvider.datosUsuario)
    .then(obraResponse =>{       
      const modal = this.modalCtrl.create(ModalObraPage, { obra: obraResponse});
      modal.present();
    }).catch(err =>{      
      this.avisosProvider.crearAlertaSimple('Error', err);
    })
  }

  /*****************************************************************************
* metodo  que abre el scanner y detecta eñ codigo QR, 
* si todo sale bien despliega un modal con los datos de la obra escaneada
******************************************************************************/
  
enviarComentario(){
  if(!this.comentario.cuerpo){
  this.avisosProvider.crearAlertaSimple('Error!', "Debe ingresar un texto");
    this.comentario.cuerpo = "";
   }else{  
    this.comentario.uid = Math.floor(Date.now() / 1000);
    this.comentario.autor = this.userProvider.datosUsuario.username;
    this.firebaseProvider.updateDatosUsuarioObra(this.userProvider.datosUsuario, this.comentario, 'comentario')
    .then(() =>{
      this.avisosProvider.crearAlertaSimple('Exito!', "Comentario creado con exito");
      this.comentario.cuerpo = "";
    }).catch(err =>{
          this.avisosProvider.crearAlertaSimple('Error', err);
    })
  }
}

}
