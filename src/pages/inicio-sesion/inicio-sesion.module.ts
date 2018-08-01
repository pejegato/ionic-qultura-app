import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { InicioSesionPage } from './inicio-sesion';

@NgModule({
  declarations: [
    InicioSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioSesionPage),
  ],
})
export class InicioSesionPageModule {}
