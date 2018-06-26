import {Injectable} from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseDbProvider } from "../firebase-db/firebase-db";
import { PhotoProvider } from "../photo/photo";
import { AvisosProvider } from "../avisos/avisos";
import { NavController } from "ionic-angular";
import { DashboardPage } from "../../pages/dashboard/dashboard";
import { LoginPage } from "../../pages/login/login";

/*
 Generated class for the UserProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UserProvider {

    public datosUsuario: any
    constructor(
        private firebaseProvider: FirebaseDbProvider,
        private photoProvider: PhotoProvider,
        private avisosProvider: AvisosProvider,


    ) {}

    public getUserData(user){
        return new Promise<any>(
            (resolve, reject) => this.firebaseProvider.obtieneDatosUsuario(user.uid).subscribe(response => {
                this.photoProvider.downloadImageUrl(response.img)
                .then(url => {
                    response.imgUrl = url;
                    resolve(response);
                })
                .catch((error)=>  reject(error));
             }, error => reject(error))
        );
    }

}
