import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformacionEdificioPage } from './informacion-edificio.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionEdificioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InformacionEdificioPage]
})
export class InformacionEdificioPageModule { }
