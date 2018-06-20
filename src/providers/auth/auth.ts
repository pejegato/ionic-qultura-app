import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {}

  // Registro de usuario
  registerUser(newUser) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(user => function(){        
          user.updateProfile({
            displayName: newUser.username,
            photoURL: newUser.photoURL,
            name: newUser.nombre
          })
      })
      .catch(err => Promise.reject(err))
  }

  // Login de usuario
  loginUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => Promise.resolve(response))
      .catch(err => Promise.reject(err))
  }
  
  logout() {
    this.afAuth.auth.signOut()
    .then(response =>  Promise.resolve(response))
    .catch(err => Promise.reject(err))
  }
  
  get session() {
    return this.afAuth.authState;
  }

 
  

  


}
