import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioSesionPage } from './inicio-sesion.page';
import { ComponentsModule } from 'src/app/componentes/componentesglobales.module';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
