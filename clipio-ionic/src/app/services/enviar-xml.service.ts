import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarXMLService {

  private urlServidor = null;
  constructor() {
    this.urlServidor = '192.168.0.105';
  }

  registrarUsuario(email, data) {
    /*let Url = this.urlServidor + "RegistroUsuario?email=" + email
      + "&mac=" +mac+
      "&data=" + data; //dATOS personales.
    return Url;*/
  }
}