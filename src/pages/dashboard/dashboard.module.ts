import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { DashboardPage } from './dashboard';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
