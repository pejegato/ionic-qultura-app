import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ListaContactosPage } from './lista-contactos';

@NgModule({
  declarations: [
    ListaContactosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaContactosPage),
  ],
})
export class ListaContactosPageModule {}
