import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagClipioComponent } from './pag-InicioSesion/pag-clipio.component';
import { PagPrincipalComponent } from './pag-principal/pag-principal.component';

const routes: Routes = [
  {path:'',component:PagClipioComponent},
  {path:'principal',component:PagPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
