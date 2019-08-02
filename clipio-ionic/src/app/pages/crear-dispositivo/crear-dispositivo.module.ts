import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearDispositivoPage } from './crear-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDispositivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearDispositivoPage]
})
export class CrearDispositivoPageModule {}
