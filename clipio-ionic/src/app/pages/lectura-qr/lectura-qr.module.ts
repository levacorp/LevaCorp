import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { LecturaQRPage } from './lectura-qr.page';

const routes: Routes = [
  {
    path: '',
    component: LecturaQRPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [LecturaQRPage]
})
export class LecturaQRPageModule {}
