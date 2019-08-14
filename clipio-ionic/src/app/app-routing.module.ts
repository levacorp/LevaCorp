import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule', canActivate: [AuthGuardService]},
  { path: 'principal/:edificio', loadChildren: './pages/principal/principal.module#PrincipalPageModule', canActivate: [AuthGuardService]},
  { path: 'preferencias', loadChildren: './pages/preferencias/preferencias.module#PreferenciasPageModule', canActivate: [AuthGuardService] },
  { path: 'edificio', loadChildren: './pages/edificio/edificio.module#EdificioPageModule', canActivate: [AuthGuardService] },
  { path: 'crear-edificio', loadChildren: './pages/crear-edificio/crear-edificio.module#CrearEdificioPageModule', canActivate: [AuthGuardService] },
  { path: 'informacion-edificio/:argumento', loadChildren: './pages/informacion-edificio/informacion-edificio.module#InformacionEdificioPageModule', canActivate: [AuthGuardService] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuardService] },
  { path: 'dispositivo/:ip/:id', loadChildren: './pages/dispositivo/dispositivo.module#DispositivoPageModule' },
  { path: 'crear-elemento/:edificio/:ambiente/:habitacion', loadChildren: './pages/crear-elemento/crear-elemento.module#CrearElementoPageModule' },
  { path: 'registrar', loadChildren: './pages/registrar/registrar.module#RegistrarPageModule' },
  { path: 'informacion-edificio',
   loadChildren: './pages/informacion-edificio/informacion-edificio.module#InformacionEdificioPageModule', canActivate: [AuthGuardService] },
  { path: 'asociacion-elemento-dispositivo',
   loadChildren: './pages/asociacion-elemento-dispositivo/asociacion-elemento-dispositivo.module#AsociacionElementoDispositivoPageModule'},
  { path: 'elementos-por-habitacion/:edificio/:ambiente/:habitacion',
    loadChildren: './pages/elementos-por-habitacion/elementos-por-habitacion.module#ElementosPorHabitacionPageModule',
     canActivate: [AuthGuardService]},
  { path: 'dispositivos-elemento/:elemento/:edificio/:ambiente/:habitacion',
   loadChildren: './pages/dispositivos-elemento/dispositivos-elemento.module#DispositivosElementoPageModule' },
  { path: 'crear-dispositivo/:nameThing/:edificio/:ambiente/:habitacion/:dir',
   loadChildren: './pages/crear-dispositivo/crear-dispositivo.module#CrearDispositivoPageModule' },
   { path: 'crear-dispositivo/:edificio/:ambiente/:habitacion/:dir',
   loadChildren: './pages/crear-dispositivo/crear-dispositivo.module#CrearDispositivoPageModule' },
   { path: 'inicio-sesion', loadChildren: './pages/inicio-sesion/inicio-sesion.module#InicioSesionPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'crear-habitacion/:edificio/:ambiente', loadChildren: './pages/crear-habitacion/crear-habitacion.module#CrearHabitacionPageModule' },
  { path: 'ambiente-edificio/:edificio', loadChildren: './pages/ambiente-edificio/ambiente-edificio.module#AmbienteEdificioPageModule' }




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
