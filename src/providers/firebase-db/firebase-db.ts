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
      return this.afDB.database.ref(`usuarios/${usuario.uid}`).set(usuario);
  }

  guardaObraEscaneada(usuario, obra): Promise<any> {
    return this.afDB.database.ref(`usuarios/${usuario.uid}/obras/${obra.uid}`).set(obra);
  }

  obtieneDatosUsuario(usuarioId): Observable<any> {
      return this.afDB.object(`usuarios/${usuarioId}`).valueChanges();
  }

  obtieneDatosObra(obraId): Observable<any> {
    return this.afDB.object(`obras/${obraId}`).valueChanges();
  }
}

