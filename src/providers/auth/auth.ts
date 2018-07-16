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
  updatePerfilUsuario(user:any, mail:string):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      //El login debe hacerse ingresando los datos 
      this.loginUser(mail, user.password).then(()=>{
        firebase.auth().currentUser.updateProfile({
          displayName: user.username,
          photoURL: user.imgUrl
        })
        .then(()=> {
          firebase.auth().currentUser.updateEmail(user.email)
        })
        .then(()=> {
          resolve();
        })
      })
      .catch((err)=>{
        reject (err);  
      })
    })
  }

  /******************************************************************************
   * actualiza password de usuario en firebase                                              *
   *****************************************************************************/
  updatePasswordUsuario(user, nuevoPassword:string):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      console.log(user);
      console.log(nuevoPassword);
      this.loginUser(user.email, user.password).then(()=>{
        firebase.auth().currentUser.updatePassword(nuevoPassword)        
        .then(()=> {
          resolve();
        })
      })
      .catch((err)=>{
        reject (err);  
      })
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
