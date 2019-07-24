import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsociacionElementoDispositivoPage } from './asociacion-elemento-dispositivo.page';
import { ComponentsModule } from '../../componentes/componentesglobales.module';

const routes: Routes = [
  {
    path: '',
    component: AsociacionElementoDispositivoPage
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
  declarations: [AsociacionElementoDispositivoPage]
})
export class AsociacionElementoDispositivoPageModule {}
