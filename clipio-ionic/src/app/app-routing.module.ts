import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule' },
  { path: 'preferencias', loadChildren: './pages/preferencias/preferencias.module#PreferenciasPageModule' },
 // { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule' },
  { path: 'lectura-qr/:id/:dir', loadChildren: './pages/lectura-qr/lectura-qr.module#LecturaQRPageModule' },  { path: 'crear-edificio', loadChildren: './pages/crear-edificio/crear-edificio.module#CrearEdificioPageModule' }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
