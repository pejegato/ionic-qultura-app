import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AngularFireList,AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { AvisosProvider } from '../../providers/avisos/avisos';
/**
 * Generated class for the ModalBuscarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-buscar-usuario',
  templateUrl: 'modal-buscar-usuario.html',
})
export class ModalBuscarUsuarioPage {
  public people:any=[];
  tasksRef: AngularFireList<any>;
  tasks: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private viewCtrl: ViewController,
    private firebaseProvider: FirebaseDbProvider,
    private userProvider: UserProvider,
    private avisosProvider: AvisosProvider,
  ) {}

  usuarioBuscado:any;

  buscarUsuario(){
    var _self = this;
    if(typeof this.usuarioBuscado !='undefined' && this.usuarioBuscado){
      this.firebaseProvider.buscarContactos(this.usuarioBuscado).then(function(snapshot) {
        if(snapshot.val()){
          _self.people = _self.snapshotToArray(snapshot.val());
        }else{
          _self.avisosProvider.crearAlertaSimple('Error', "No se han encontrado resultados");
          _self.people = []

        }

      });
    }else{
      this.avisosProvider.crearAlertaSimple('Error', "Ingresa nombre usuario a buscar");

    }


  }

  private agregarContacto(contacto):void {
    let loading = this.avisosProvider.crearLoading("Agregando contacto...");
    loading.present();
    this.firebaseProvider.guardaContactoUsuario(this.userProvider.datosUsuario,contacto)
        .then(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Éxito', "Contacto agregado con correctamente");

        }).catch(()=>{
          loading.dismiss();
          this.avisosProvider.crearAlertaSimple('Error', "Se ha producido un error ");

          this.usuarioBuscado = "";
        })

  };

 /*****************************************************************************
 * Metodo utilitario que convierte un listado de objetos en un array         *
 *****************************************************************************/

  private snapshotToArray(snapshot):any[] {
    var returnArr = [];
    if(typeof snapshot !== 'undefined'){
        Object.keys(snapshot).forEach(function(key) {
            returnArr.push(snapshot[key]);
        });
        return  returnArr.sort(function(a, b) {
            var dateA = new Date(a.fechaIngreso), dateB = new Date(b.fechaIngreso);
            return +dateB - +dateA ;
        });
    }else{
        return returnArr;
    };
  };

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  omit_special_char(event, email){
    var k;
    k = event.charCode;
    var x = 64
    if(email)
    x=63
    return ((k > x && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57 || k == 45 || k == 46 || k == 95));
  }
}
