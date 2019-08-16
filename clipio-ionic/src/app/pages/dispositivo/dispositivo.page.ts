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
  ipDispositivo = null;
  idDispositivo = null;
  descripcion = null;
  nombreDispositivo = null;
  tags = [];

  @ViewChild(IonSlides) slides: IonSlides;
  segment = 'Recursos';
  slideOpts = {
    speed: 200
  };
  constructor(public loadingController: LoadingController, private raspService : RaspberryService , private activatedRoute: ActivatedRoute , private dataService: DataService ) { }

  async ngOnInit() {
    this.ipDispositivo = this.activatedRoute.snapshot.paramMap.get('ip');
    this.idDispositivo = this.activatedRoute.snapshot.paramMap.get('id');
    const peticionDispositivo = 'http://' + this.ipDispositivo + '/Identificator?osid=' + this.idDispositivo;
    // hace una peticion a la raspberry pidiendo  la informacion
    const xmlDatos = await this.raspService.requestRaspberry(peticionDispositivo);
    if (xmlDatos === null) {
      alert('error');
    } else {
      // obtiene la infromacion basica
      this.InformacionBasica = this.dataService.getInfoBasicaDispositivo(xmlDatos);
      this.nombreDispositivo = this.InformacionBasica[1].value[0]._;
      this.descripcion = this.InformacionBasica[2].value[0]._;
      this.tags = this.InformacionBasica[17].value;
      // hace una peticion a las raspberry pidiedod sus estados
      const xmlDataStreams = await this.raspService.requestRaspberry('http://' + this.ipDispositivo + '/SendState?osid=' + this.idDispositivo);
      console.log(this.dataStreams);
      if(xmlDataStreams === null) {}
      else{
          // obtiene sus estados
      this.dataStreams = this.dataService.getEstadoDataStreams(xmlDataStreams);
      console.log(this.dataStreams);
      }
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
    let option;
    if(event.target.checked) {
    
      event.target.checked = false;
         option= "off";
  }else if(!event.target.checked) {
      event.target.checked = true;
         option= "on";
  }
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Espere por favor...',
      translucent: true,
    });
    await loading.present();
    loading.lastElementChild.insertAdjacentHTML( 'afterbegin', '<ion-spinner name="circles" color="danger" ></ion-spinner> ');
    const url = 'http://'+this.ipDispositivo +'/SetDatastream?osid='+this.idDispositivo+'&idDataStream='+event.target.id+'&comando='+option;
    const datos = await this.raspService.requestRaspberry(url);
    console.log(url);
    console.log(datos);
    if(datos === null){}
    else{
      if(option === 'on'){
        event.target.checked = true;
      }
      else{
        event.target.checked = false;
      }
    }
    this.loadingController.dismiss();
  }
}
