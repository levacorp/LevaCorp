import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async handlerEliminarECA() {
    const alert = await this.alertController.create({
      header: 'Atención',
      // subHeader: 'Subtitle',
      message: '¿Está seguro que desea eliminar esta preferencia? Esta acción no se puede deshacer',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          console.log('Eliminado');
        }
      }]
    });

    await alert.present();
  }

  pushMostrar() {
    this.router.navigate(['/preferencias/mostrar']);
  }
}
