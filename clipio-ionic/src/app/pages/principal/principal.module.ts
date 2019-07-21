import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import { ComponentsModule } from '../../componentes/componentesglobales.module';
import { PipesModule } from '../../pipes/pipes.module';

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
