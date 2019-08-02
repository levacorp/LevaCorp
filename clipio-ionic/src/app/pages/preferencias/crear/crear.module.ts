import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPage } from './crear.page';
import { ComponentsModule } from 'src/app/componentes/componentesglobales.module';

const routes: Routes = [
  {
    path: '',
    component: CrearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [CrearPage]
})
export class CrearPageModule {}
