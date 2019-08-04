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
    this.urlServidor = 'http://10.0.0.17:8080/';
  }

  registrarUsuario(email, data) {
   // let macChar = "&mac=02:00:00:00:00:00";
    //console.log(macChar);
    let Url = this.urlServidor + "RegistroUsuario?email=" + email+
       "&mac=02:00:00:00:00:00" +"&data=" + data; //dATOS personales.
      const mac = '02:00:00:00:00:00';
      /*let Url = "http://"+ this.urlServidor + "/RegistroUsuario";*/     
      console.log(Url);
      this.dataservice.postRegistrarUsuario(Url, email, mac, data);

  }
}