import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EnviarXMLService {

  private urlServidor = null;
  constructor(
    private dataservice:DataService
  ) {
    this.urlServidor = '10.0.0.17';
  }

  registrarUsuario(email, data) {
    let Url = this.urlServidor + "/RegistroUsuario?email=" + email+
      + "&mac=" +"02:00:00:00:00:00"+
      "&data=" + data; //dATOS personales.
    console.log(Url);
    this.dataservice.postRegistrarUsuario(Url,data);

  }
}