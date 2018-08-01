import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { PerfilPage } from './perfil';

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
  ],
})
export class PerfilPageModule {}
