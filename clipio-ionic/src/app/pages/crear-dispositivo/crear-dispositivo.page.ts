import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { RaspberryService } from 'src/app/services/raspberry.service';
import { UtilitiesService } from 'src/app/services/utilities.service';


@Component({
  selector: 'app-crear-dispositivo',
  templateUrl: './crear-dispositivo.page.html',
  styleUrls: ['./crear-dispositivo.page.scss'],
})
export class CrearDispositivoPage implements OnInit {
  dataStreams: [];
  tags: [];
  InformacionBasica: Observable<any>;
  ipDispositivo = null;
  idDispositivo = null;
  descripcion = null;
  tipoAsociacion = null;
  habitacion = null;
  edificio = null;
  ambiente = null;
  nombreDispositivo = null;
  nombreThing = null;
  datos: any = null;
  segment = 'Recursos';

  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    speed: 200
  };
  constructor(private activatedRoute: ActivatedRoute, public router: Router,
              private raspService: RaspberryService, private dataService: DataService,
              private generateXml: GenerateXMLService , private utilidades: UtilitiesService) { }

  async ngOnInit() {
    const dir = this.activatedRoute.snapshot.paramMap.get('dir');
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente');
    // si la cantidad de parametros que le llegan es igual a tres significa que se agregara un dispositivo a una habitacion
    if (this.activatedRoute.snapshot.paramMap.keys.length === 4) {
      this.tipoAsociacion = 'dispositivoHabitacion';
    } else {
      // se agregara un dispositivo a un elemento
      this.nombreThing = this.activatedRoute.snapshot.paramMap.get('nameThing');
      this.tipoAsociacion = 'dispositivoElemento';
    }
    // Hace una peticion a la informacion de la raspberry
    const xmlDatos = await this.raspService.requestRaspberry(dir);
    if (xmlDatos === null) {
      // Si no se encuentra activa la rasperry retornar a la pagina anterior
      alert('Error,No se encuentra la raspberry');
      if (this.tipoAsociacion === 'dispositivoHabitacion' ) {
        this.router.navigate(['elementos-por-habitacion', this.edificio , this.ambiente, this.habitacion]);
      } else {
        this.router.navigate(['dispositivos-elemento', this.nombreThing, this.edificio, this.ambiente, this.habitacion]);
      }
    } else {
      // Si se encuentra obtiene la ip del dispositivo
      this.ipDispositivo = dir.substring(7, dir.indexOf('/Identificator?osid='));
      // Obtiene la informacion basica del dispositivo
      this.InformacionBasica = this.dataService.getInfoBasicaDispositivo(xmlDatos);
      this.dataStreams = this.dataService.getDataStreams(xmlDatos);
      this.idDispositivo = this.InformacionBasica[0].value[0]._;
      this.nombreDispositivo = this.InformacionBasica[1].value[0]._;
      this.descripcion = this.InformacionBasica[2].value[0]._;
      this.tags = this.InformacionBasica[17].value;
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
 // Añade un nuevo dispositivo
 async pushCrearDispositivo() {
        let xml;
        // Se decide que tipo de asociacion se va a hacer
        if (this.tipoAsociacion === 'dispositivoHabitacion' ) {
          // Si la asociacion es con una habitacion se genera el xml y redirige a la habitacion
          xml = this.generateXml.crearAsociacionDispositivosHabitacion(this.edificio, this.ambiente, this.habitacion,
          this.nombreDispositivo, this.idDispositivo , this.ipDispositivo);
        } else {
            // Si la asociacion es con una dispositivo se genera el xml y redirige a la habitacion
             xml = this.generateXml.crearAsociacionDispositivosElemento(this.nombreThing, this.nombreDispositivo,
             this.idDispositivo , this.ipDispositivo);
          }
        // se hace la peticion al servidor de añadir dispositivo
        await this.dataService.asociarDispositivo(xml)
          .then(async data => {
             await this.utilidades.alertEspecifica( 'Registro Dispositivo', data);
          });
        // retorna a la pagina anterior
        if (this.tipoAsociacion === 'dispositivoHabitacion' ) {
                this.router.navigate(['elementos-por-habitacion', this.edificio , this.ambiente, this.habitacion]);
              } else {
                this.router.navigate(['dispositivos-elemento', this.nombreThing, this.edificio, this.ambiente, this.habitacion]);
              }
    }
}
