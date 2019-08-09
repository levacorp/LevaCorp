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
  nombreDispositivo = null;
  isDisabled = false;

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
    // hace una peticion a la raspberry pidiendo  la informacion
    const xmlDatos = await this.raspService.requestRaspberry(peticionDispositivo);
    if (xmlDatos === null) {
    } else {
      // obtiene la infromacion basica
       this.InformacionBasica = this.dataService.getInfoBasicaDispositivo(xmlDatos);
      // hace una peticion a las raspberry piedno sus estados
      const xmlDataStreams = this.raspService.requestRaspberry('http://' + ipDispositivo + '/SendState?osid=' + idDispositivo);
      //obtiene sus estados
      this.dataStreams = this.dataService.getEstadoDataStreams(xmlDatos);
      this.nombreDispositivo = this.InformacionBasica[1].value[0]._;
    }
    }
 // Evento cuando se da click en un segmento
 segmentButtonClicked(event) {
  // Se obtiene el valor del segmento clickeado
  const segEscogido = event.detail.value;
  // Se decide que slide mostrar
  if (segEscogido === 'Recursos') {
    this.slides.slideTo(0);
  } else {
         this.slides.slideTo(1);
  }
}
 // Evento cuando se desplaza un slide
 slideChanged() {
  this.slides.getActiveIndex().then(data => {
    // Se cambia la opcion del segmento dependiento de la pagina a la que se deslizo
    if ( data === 1) {
      this.segment = 'Informacion';
    } else {
       this.segment = 'Recursos';
    }
    });
  }
  // Hace la peticion de cambio de estado del actuador
  async estadoActuador(event) {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Espere por favor...',
      translucent: true,
    });
    await loading.present();
    loading.lastElementChild.insertAdjacentHTML( 'afterbegin', '<ion-spinner name="circles" color="danger" ></ion-spinner> ');
    if (event.detail.checked) {

    } else {
    }
    this.loadingController.dismiss();
  }
}
