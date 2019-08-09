import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    public alertController: AlertController
  ) { }

  async alert(mensaje ) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async alertEspecifica(mensaje, respuesta) {
    console.log(respuesta);
    const nombre = respuesta.Objects.Object[0].InfoItem[0].$.name;
    const codigo = respuesta.Objects.Object[0].InfoItem[0].value[0]._;

    let tipoMensaje = " ";
    switch (codigo ) {
      case '1025': {
        tipoMensaje = " Id incorrecto";
        break;
      }
      case '1026': {
        tipoMensaje = " Data stream no existe";
        break;
      }
      case '1027': {
        tipoMensaje = " No implementado";
        break;
      }
      case '1028': {
        tipoMensaje = " Exitoso";
        break;
      }
      case '1042': {
        tipoMensaje = " Usuario existente";
        break;
      }
      case '1043': {
        tipoMensaje = " Usuario no existente ";
        break;
      }
      case '1044': {
        tipoMensaje=" Ontologia creada";
        break;
      }
      case '1045': {
        tipoMensaje=" Error";
        break;
      }
      case '1046': {
        tipoMensaje=" Credenciales incorrectas";
        break;
      }
      case '1047': {
        tipoMensaje=" No hay registros";
        break;
      }
      case '1048': {
        tipoMensaje=" Ontologia no existente o datos incorrectos";
        break;
      }
    }
    const alert = await this.alertController.create({
      header: nombre,
      message: mensaje + tipoMensaje,
      buttons: ['OK']
    });
    await alert.present();

    return codigo;
  }
}
