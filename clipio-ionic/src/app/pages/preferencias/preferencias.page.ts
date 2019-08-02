import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataUserService } from 'src/app/services/data-user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit {

  listaECAs = [];
  constructor(private router: Router, public alertController: AlertController,
    private dataUserService: DataUserService, private dataService: DataService) { }

  ngOnInit() {
    this.listaECAs = this.dataUserService.getListaECA();
    console.log(this.listaECAs);
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
