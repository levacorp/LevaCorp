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
import { PipesModule } from './pipes/pipes.module';

import { HttpClientModule } from '@angular/common/http';
=======
>>>>>>> 47eb0d2e6be32ad98a29d60360c2b5a444aff34c

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    ComponentsModule,
    HttpClientModule
  ],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule],
>>>>>>> 47eb0d2e6be32ad98a29d60360c2b5a444aff34c
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
