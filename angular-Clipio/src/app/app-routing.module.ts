import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';



const routes: Routes = [
  {path:'',component:MenuSliderComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
