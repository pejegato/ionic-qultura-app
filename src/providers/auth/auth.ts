import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {}

  // Registro de usuario
  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => Promise.resolve(res))
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
  
  get Session() {
    return this.afAuth.authState;
  }

  getUser() {
    return this.afAuth.auth.currentUser.uid;
  }

  

  


}
