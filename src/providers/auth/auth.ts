import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";


@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {}

   /*****************************************************************************
   * Crea usuario en firebase con email y password                              *
   *****************************************************************************/
  registerUser(newUser):Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
  }

  /******************************************************************************
   * actualiza usuario en firebase                                              *
   *****************************************************************************/
  updatePerfilUsuario(username: string, photoURL:string):Promise<any>{
    return firebase.auth().currentUser.updateProfile({
      displayName: username,
      photoURL: photoURL
    })
  }

  /******************************************************************************
   * Logea usuario en FB con email y pass                                       *
   *****************************************************************************/
  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

 /******************************************************************************
  * Deslogea usuario conectado                                                 *
  *****************************************************************************/
  logout(): Promise<any> {
        return this.afAuth.auth.signOut();
  }

 /******************************************************************************
  * Verifica usuario actual logueado                                           *
  *****************************************************************************/
  get currentUser(){
    return firebase.auth().currentUser;
  }



}
