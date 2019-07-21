import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroElementosPipe } from './filtro-elementos.pipe';

@NgModule({
  declarations: [FiltroElementosPipe],
  exports: [
    FiltroElementosPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
