import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'principal/casa', pathMatch: 'full' },
  { path: 'principal/:edificio', loadChildren: './pages/principal/principal.module#PrincipalPageModule' },
  { path: 'preferencias', loadChildren: './pages/preferencias/preferencias.module#PreferenciasPageModule' },
  // { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'lectura-qr/:id/:dir', loadChildren: './pages/lectura-qr/lectura-qr.module#LecturaQRPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'asociacion-elemento-dispositivo', loadChildren: './pages/asociacion-elemento-dispositivo/asociacion-elemento-dispositivo.module#AsociacionElementoDispositivoPageModule' },
  { path: 'elementos-por-habitacion',
    loadChildren: './pages/elementos-por-habitacion/elementos-por-habitacion.module#ElementosPorHabitacionPageModule' },
  { path: 'dispositivos-elemento/:id',
   loadChildren: './pages/dispositivos-elemento/dispositivos-elemento.module#DispositivosElementoPageModule' },
  { path: 'dispositivo/:id', loadChildren: './pages/dispositivo/dispositivo.module#DispositivoPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
