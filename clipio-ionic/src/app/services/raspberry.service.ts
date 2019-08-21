import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import 'rxjs/add/operator/timeout';

@Injectable({
  providedIn: 'root'
})
export class RaspberryService {

  datos: any = null;

  constructor(private http: HttpClient, private nativeHttp: HTTP,
              private plt: Platform, private loadingCtrl: LoadingController) {
      this.nativeHttp.setRequestTimeout(10);      // Tiempo máximo de espera 10 segundos
    }

  async getPC(dir) {
    // crea una espera
    const loading = await this.loadingCtrl.create({message: 'Consultando...'});
    await loading.present();
    // hace la peticion a la raspberry
    await this.http.get(dir, { responseType: 'text' }).timeout(3000)
    .toPromise()
    .then(data => {
      // Se parsea el xml a un objeto javascript para poder manejarlo más facil
      let js;
      const parseString = require('xml2js').parseString;
      parseString(data, function(err, result) {
        js = result;
      });
      this.datos = js;
      loading.dismiss();
      return js;
    })
    .catch(error => {
      loading.dismiss();
      this.datos = null;
      return {error: error.error};
    });
  }

  // Si se hace la peticion desde celular se hace una peticion con la librería nativeHttp
  async getSmartphone(dir) {
    const loading = await this.loadingCtrl.create({message: 'Consultando...'});
    await loading.present();
    await this.nativeHttp.get(dir, { responseType: 'text' }, { })
    .then(data => {
      // Se parsea el xml a un objeto javascript para poder manejarlo más facil
      let js;
      const parseString = require('xml2js').parseString;
      parseString(data.data, function(err, result) {
        js = result;
      });
      this.datos = js;
      loading.dismiss();
      return js;
    })
    .catch(error => {
      loading.dismiss();
      return { error: error.error };
    });
  }

  // Método para decidir si se hace la peticion http desde navegador o desde celular
  async requestRaspberry(dir) {
    this.datos = null;
    /* Si la plataforma es celular o desde PC */
    if (this.plt.is('cordova')) {
      await this.getSmartphone(dir);
      return this.datos;
    } else {
       await this.getPC(dir);
      return this.datos;
    }
  }
}
