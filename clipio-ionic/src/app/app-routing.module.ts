import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'preferencia', loadChildren: './pages/preferencia/preferencia.module#PreferenciaPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
