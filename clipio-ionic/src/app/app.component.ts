import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { DeviceServicesService } from './services/device-services.service';
import { DataUserService } from './services/data-user.service';

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
    private router: Router,
    private deviceServicesService: DeviceServicesService,
    private dataUserService: DataUserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /* Al iniciar la aplicacion se piden permisos para leer la direccion MAC */
      //this.deviceServicesService.getPermission();
      //this.dataUserService.setMAC(this.deviceServicesService.getID_UID('MAC'));
      if (this.dataUserService.getMAC() !== null) {
        /* Al iniciar la aplicacion se comprueba si esta autenticado */
        this.authService.authenticationState.subscribe(state => {
          console.log('Sesion Iniciada: ', state); /* Imprime el estado actual. True=Autenticado, False=No autenticado; */
          if (state) {
            this.router.navigate(['principal/casa']); /* Si esta autenticado se redirige a la pagina principal por defecto */
          } else {
            this.router.navigate(['inicio-sesion']); /* Si no se redirige al inicio de sesion */
          }
        });
      } else {
        alert('Se deben aceptar los permisos, reinicie la aplicacion');
      }
    });
  }
}
