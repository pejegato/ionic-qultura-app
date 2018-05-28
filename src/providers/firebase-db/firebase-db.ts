import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class FirebaseDbProvider {

  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider
  ) {
    console.log('Hello FirebaseDbProvider Provider');
  }

}
