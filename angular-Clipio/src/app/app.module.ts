import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { PagClipioComponent } from './pag-InicioSesion/pag-clipio.component';
import { PagPrincipalComponent } from './pag-principal/pag-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    PagClipioComponent,
    PagPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
