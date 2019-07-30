import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { DispositivosElementoPage } from './dispositivos-elemento.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivosElementoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [DispositivosElementoPage]
})
export class DispositivosElementoPageModule {}
