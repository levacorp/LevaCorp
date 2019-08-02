import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'principal/:edificio', loadChildren: './pages/principal/principal.module#PrincipalPageModule', canActivate: [AuthGuardService]},
  // tslint:disable-next-line: max-line-length
  { path: 'preferencias', loadChildren: './pages/preferencias/preferencias.module#PreferenciasPageModule', canActivate: [AuthGuardService] },
  // { path: 'elementos-habitacion', loadChildren: './elementos-habitacion/elementos-habitacion.module#ElementosHabitacionPageModule' },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule', canActivate: [AuthGuardService] },
  // tslint:disable-next-line: max-line-length
  { path: 'crear-edificio', loadChildren: './pages/crear-edificio/crear-edificio.module#CrearEdificioPageModule', canActivate: [AuthGuardService] },
  // { path: 'elementos-por-habitacion', loadChildren: './pages/elementos-por-habitacion/elementos-por-habitacion.module#ElementosPorHabitacionPageModule' },
  // { path: 'dispositivos-elemento/:id', loadChildren: './pages/dispositivos-elemento/dispositivos-elemento.module#DispositivosElementoPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'informacion-edificio', loadChildren: './pages/informacion-edificio/informacion-edificio.module#InformacionEdificioPageModule', canActivate: [AuthGuardService] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuardService] },

  // tslint:disable-next-line: max-line-length
  { path: 'asociacion-elemento-dispositivo', loadChildren: './pages/asociacion-elemento-dispositivo/asociacion-elemento-dispositivo.module#AsociacionElementoDispositivoPageModule', canActivate: [AuthGuardService] },
  { path: 'elementos-por-habitacion',
    // tslint:disable-next-line: max-line-length
    loadChildren: './pages/elementos-por-habitacion/elementos-por-habitacion.module#ElementosPorHabitacionPageModule', canActivate: [AuthGuardService] },
  { path: 'dispositivos-elemento/:id',
   // tslint:disable-next-line: max-line-length
   loadChildren: './pages/dispositivos-elemento/dispositivos-elemento.module#DispositivosElementoPageModule', canActivate: [AuthGuardService] },
  // tslint:disable-next-line: max-line-length
  { path: 'dispositivo/:id', loadChildren: './pages/dispositivo/dispositivo.module#DispositivoPageModule', canActivate: [AuthGuardService] },
  // tslint:disable-next-line: max-line-length
  { path: 'crear-elemento/:elemento', loadChildren: './pages/crear-elemento/crear-elemento.module#CrearElementoPageModule', canActivate: [AuthGuardService] },
  { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
