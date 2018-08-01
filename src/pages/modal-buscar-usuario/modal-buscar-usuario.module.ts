import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ModalBuscarUsuarioPage } from './modal-buscar-usuario';

@NgModule({
  declarations: [
    ModalBuscarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBuscarUsuarioPage),
  ],
})
export class ModalBuscarUsuarioPageModule {}
