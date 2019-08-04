import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ElementosPorHabitacionPage } from './elementos-por-habitacion.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/componentes/componentesglobales.module';

const routes: Routes = [
  {
    path: '',
    component: ElementosPorHabitacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule
  ],
  declarations: [ElementosPorHabitacionPage]
})
export class ElementosPorHabitacionPageModule {}
