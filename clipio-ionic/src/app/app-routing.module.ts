import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'preferencia', loadChildren: './pages/preferencia/preferencia.module#PreferenciaPageModule' }
=======
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule' },
  { path: 'preferencias', loadChildren: './pages/preferencias/preferencias.module#PreferenciasPageModule' },
  { path: 'lectura-qr/:id/:dir', loadChildren: './pages/lectura-qr/lectura-qr.module#LecturaQRPageModule' }



>>>>>>> bb08a0abb600e1843624000c078a2fc9fd178422
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
