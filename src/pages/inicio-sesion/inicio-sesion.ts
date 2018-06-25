import {DashboardPage} from "./../dashboard/dashboard";
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {diccionarioErrores} from "../../providers/constants/errores";


/**
 * Generated class for the InicioSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html',
})
export class InicioSesionPage {
  user = { email: '', password: '' };
  dashboardPage: any  = DashboardPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private avisosProvider : AvisosProvider,
    private errores : diccionarioErrores) {
  }

  login() {
      let loading = this.avisosProvider.crearLoading("Iniciando sesión...");
    loading.present();

    this.auth.loginUser(this.user.email, this.user.password)
        .then((user) => {
      loading.dismiss();  
    })
    .catch(err => {      
      loading.dismiss();         
      this.avisosProvider.crearAlertaSimple("Error", this.errores.traducirError('LOGIN',err.code));      
    })
  }


  
}
