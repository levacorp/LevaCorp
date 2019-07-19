import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ElementosHabitacionPage } from './elementos-habitacion.page';

const routes: Routes = [
  {
    path: '',
    component: ElementosHabitacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ElementosHabitacionPage]
})
export class ElementosHabitacionPageModule {}
