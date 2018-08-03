import {DashboardPage} from "../dashboard/dashboard";
import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {AvisosProvider} from "../../providers/avisos/avisos";
import {diccionarioErrores} from "../../providers/constants/errores";
import { UserProvider } from "../../providers/user/user";


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
    public auth: AuthProvider,
    private avisosProvider : AvisosProvider,
    private errores : diccionarioErrores,
    private userProvider: UserProvider) {
  }

/*****************************************************************************
* metodo que llama al logueo de usuario y trae su info adicional si el logueo
* es correcto
******************************************************************************/

  login() {

    let loading = this.avisosProvider.crearLoading("Iniciando sesión...");
    loading.present();

    this.auth.loginUser(this.user.email, this.user.password)
    .then((response) => {
      this.userProvider.getUserData(response.user)      
    })
    .then(()=> {
      loading.dismiss();       
    })
    .catch(err => {
      loading.dismiss();
      this.avisosProvider.crearAlertaSimple("Error", this.errores.traducirError('LOGIN',err.code));
    })
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
