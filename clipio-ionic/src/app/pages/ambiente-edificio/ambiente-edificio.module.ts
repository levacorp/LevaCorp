import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbienteEdificioPage } from './ambiente-edificio.page';

const routes: Routes = [
  {
    path: '',
    component: AmbienteEdificioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbienteEdificioPage]
})
export class AmbienteEdificioPageModule {}
