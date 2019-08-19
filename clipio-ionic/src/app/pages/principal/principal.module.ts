import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import { ComponentsModule } from '../../componentes/componentesglobales.module';
import { PopoverEdificiosInicioComponent } from '../../componentes/popover-edificios-inicio/popover-edificios-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  }
];

@NgModule({
  entryComponents: [
    PopoverEdificiosInicioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {

}