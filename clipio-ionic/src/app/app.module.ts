import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ComponentsModule } from './componentes/componentesglobales.module';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';


=======
import { PipesModule } from './pipes/pipes.module';

import { HttpClientModule } from '@angular/common/http';
>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule, HttpClientModule, PipesModule],
=======
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    ComponentsModule,
    HttpClientModule
  ],
>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
