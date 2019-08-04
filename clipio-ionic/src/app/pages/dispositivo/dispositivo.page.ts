import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {IonSlides} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RaspberryService } from 'src/app/services/raspberry.service';




@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  argumento = null;
  dataStreams: Observable<any>;
  InformacionBasica: Observable<any>;

  @ViewChild(IonSlides) slides: IonSlides;
  segment = 'Recursos';
  slideOpts = {
    speed: 200
  };
  constructor(public loadingController: LoadingController, private raspService : RaspberryService , private activatedRoute: ActivatedRoute , private dataService: DataService ) { }

  async ngOnInit() {
    const ipDispositivo = this.activatedRoute.snapshot.paramMap.get('ip');
    const idDispositivo = this.activatedRoute.snapshot.paramMap.get('id');
    const peticionDispositivo = 'http://' + ipDispositivo + '/Identificator?osid=' + idDispositivo;
    const xmlDatos = await this.raspService.requestRaspberry(peticionDispositivo);
    if (xmlDatos === null) {
    } else {
      this.InformacionBasica = this.dataService.getInfoBasicaDispositivo(xmlDatos);
      const xmlDataStreams = this.raspService.requestRaspberry('http://' + ipDispositivo + '/SendState?osid=' + idDispositivo);
      this.dataStreams = this.dataService.getEstadoDataStreams(xmlDataStreams);
    }
    }
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    if (segEscogido === 'Recursos') {
      this.slides.slideTo(0);
    } else {
           this.slides.slideTo(1);
    }
  }

  slideChanged() {
    this.slides.getActiveIndex().then(data => {
      if ( data === 1) {
        this.segment = 'Informacion';
      } else {
         this.segment = 'Recursos';
      }
      });
    }
  estadoActuador1(event)  {
    console.log(event.target.id);
    if (event.detail.checked)    {
      console.log('1');

    } else {
      console.log('0');
    }
  }
  async estadoActuador() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Espere por favor...',
      translucent: true,
    });
    await loading.present();
    loading.lastElementChild.insertAdjacentHTML( 'afterbegin', '<ion-spinner name="circles" color="danger" ></ion-spinner> ');
    this.loadingController.dismiss();
  }
}
