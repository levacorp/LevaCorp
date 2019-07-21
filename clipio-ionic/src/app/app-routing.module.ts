import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule' }


=======
<<<<<<< HEAD
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'preferencia', loadChildren: './pages/preferencia/preferencia.module#PreferenciaPageModule' },
  { path: 'lectura-qr/:id/:dir', loadChildren: './pages/lectura-qr/lectura-qr.module#LecturaQRPageModule' }



>>>>>>> bb08a0abb600e1843624000c078a2fc9fd178422
>>>>>>> 47eb0d2e6be32ad98a29d60360c2b5a444aff34c
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
