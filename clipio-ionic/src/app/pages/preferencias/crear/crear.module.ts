import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [CrearPage]
})
export class CrearPageModule {}
