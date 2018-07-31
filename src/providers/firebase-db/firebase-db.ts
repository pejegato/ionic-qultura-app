import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase/app";


@Injectable()
export class FirebaseDbProvider {
  /***********************************
   * Variables globales del servicio
  ************************************/

  constructor(public afDB: AngularFireDatabase) {
  }

  guardaInfoAdicionalUsuario(usuario): Promise<any> {
      return this.afDB.database.ref(`usuarios/${usuario.uid}`).set(usuario);
  }

  obtieneDatosUsuario(usuarioId): Observable<any> {
      return this.afDB.object(`usuarios/${usuarioId}`).valueChanges();
  }

  //Obras

  obtieneDatosObra(obraId): Observable<any> {
    return this.afDB.object(`obras/${obraId}`).valueChanges();
  }

  updateDatosUsuarioObra(usuarioId, obra): Promise<any> {
    return this.afDB.database.ref(`usuarios/${usuarioId}/obras/${obra.uid}`).update(obra);
  }
}

