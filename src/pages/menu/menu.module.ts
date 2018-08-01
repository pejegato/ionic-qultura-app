import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { MenuPage } from './menu';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
})
export class MenuPageModule {}
