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

  //Obtiene los datos adicionales (username, mail, foto de perfil del usuario logueado)
  obtieneDatosUsuario(usuarioId): Observable<any> {
      return this.afDB.object(`usuarios/${usuarioId}`).valueChanges();
  }

  //Busca los datos de las Obra en la base de datos
  obtieneDatosObra(obraId): Observable<any> {
    return this.afDB.object(`obras/${obraId}`).valueChanges();
  }

  //Agrega los datos de la Obra escaneada al usuario en la base de datos
  updateDatosUsuarioObra(usuario, obra): Promise<any> {    
    return this.afDB.database.ref(`usuarios/${usuario.uid}/obras/${obra.uid}`).update(obra);
  }

  //Actualiza el puntaje del usuario en base a los datos de la Obra escaneada
  updateDatosUsuarioPuntaje(usuario, obra): Promise<any> {
    return this.afDB.database.ref(`usuarios/${usuario.uid}/puntos/${obra.uid}`).update(obra);
  }
}

