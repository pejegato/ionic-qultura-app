import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  path: string = 'https://randomuser.me/api/?results=25';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }

  

  

}
