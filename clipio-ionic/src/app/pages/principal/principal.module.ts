import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import { ComponentsModule } from '../../componentes/componentesglobales.module';
<<<<<<< HEAD
import { PipesModule } from '../../pipes/pipes.module';
=======
<<<<<<< HEAD
import { PipesModule } from '../../pipes/pipes.module';
=======
>>>>>>> 47eb0d2e6be32ad98a29d60360c2b5a444aff34c
>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
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
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {

}
