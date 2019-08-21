import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataUserService } from './data-user.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform, private dataUserService: DataUserService    ) {
    /* Cuando inicie la aplicacion, comprobar el token */
    this.plt.ready().then(() => {
      storage.get(TOKEN_KEY).then((val) => {
        this.dataUserService.setIP(val[0]);
        this.dataUserService.setEmail(val[1]);
      });
      this.checkToken();
    });
  }

  login(ip , email) {
      const datos = [ip , email];
      return this.storage.set(TOKEN_KEY, datos).then(res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
}
