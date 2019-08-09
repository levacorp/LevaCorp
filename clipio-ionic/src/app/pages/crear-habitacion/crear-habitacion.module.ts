import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearHabitacionPage } from './crear-habitacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearHabitacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearHabitacionPage]
})
export class CrearHabitacionPageModule {}
