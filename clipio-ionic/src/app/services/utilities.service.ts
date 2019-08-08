import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    public alertController: AlertController
  ) { }

  async alert(mensaje) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
