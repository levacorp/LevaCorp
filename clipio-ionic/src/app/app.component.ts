import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /* Al iniciar la aplicacion se comprueba si esta autenticado */
      this.authService.authenticationState.subscribe(state => {
        console.log('Auth: ', state); /* Imprime el estado actual. True=Autenticado, False=No autenticado; */
        if (state) {
          this.router.navigate(['principal/casa']); /* Si esta autenticado se redirige a la pagina principal por defecto */
        } else {
          this.router.navigate(['inicio-sesion']); /* Si no se redirige al inicio de sesion */
        }
      });
    });
  }
}
