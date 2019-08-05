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
    this.urlServidor = 'http://10.0.0.20:8080/';
  }

  registrarUsuario(email, data) {
   // let macChar = "&mac=02:00:00:00:00:00";
    //console.log(macChar);
    /*let Url = this.urlServidor + "RegistroUsuario?email=" + email +
       "&mac=02:00:00:00:00:00" +"&data=" + data; //dATOS personales.
      const mac = '02:00:00:00:00:00';
      /*let Url = "http://"+ this.urlServidor + "/RegistroUsuario";*/     
      let Url = "http://10.0.0.20:8080/RegistroUsuario?email=c@d&mac=02:00:00:00:00:00&data=%3C?xml%20version=%221.0%22?%3E%20%3CObjects%3E%3CObject%3E%3CInfoItem%20name=%22application%22%3E%3CInfoItem%20name=%22name_app%22%3E%3Cvalue%20type=%22string%22%3EClipio%3C/value%3E%3C/InfoItem%3E%3CInfoItem%20name=%22user_app%22%3E%3Cvalue%20type=%22string%22%3Ec@d%3C/value%3E%3C/InfoItem%3E%3CInfoItem%20name=%22password_app%22%3E%3Cvalue%20type=%22string%22%3E7hxHq6HnpHK7ZCA2DflLYg==%3C/value%3E%3C/InfoItem%3E%3C/InfoItem%3E%3C/Object%3E%3C/Objects%3E"
      alert(Url);
      this.dataservice.postRegistrarUsuario(Url);
  }
  consultarDatosPersonales(){
    
  }


}