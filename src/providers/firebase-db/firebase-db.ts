import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class FirebaseDbProvider {
  /***********************************
   * Variables globales del servicio
  ************************************/

  constructor(public afDB: AngularFireDatabase) {
  }

  guardaInfoAdicionalUsuario(usuario): Promise<any> {
      return this.afDB.database.ref(`usuarios/'${usuario.uid}`).set(usuario);
  }


    obtieneDatosUsuario(usuarioId): Observable<any> {
        return this.afDB.object(`usuarios/'${usuarioId}`).valueChanges();
  }
}

