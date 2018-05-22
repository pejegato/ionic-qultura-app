import { Component } from '@angular/core';
import {NavParams } from 'ionic-angular';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navParams: NavParams) {
    this.lat= 51.678418;
    this.lng = 7.809007;
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
