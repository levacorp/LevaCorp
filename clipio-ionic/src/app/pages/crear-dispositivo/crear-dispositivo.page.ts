import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { RaspberryService } from 'src/app/services/raspberry.service';


@Component({
  selector: 'app-crear-dispositivo',
  templateUrl: './crear-dispositivo.page.html',
  styleUrls: ['./crear-dispositivo.page.scss'],
})
export class CrearDispositivoPage implements OnInit {

  dataStreams: Observable<any>;
  InformacionBasica: Observable<any>;
  tipoAsociacion = null;
  habitacion;
  edificio;
  ipDispositivo;
  idDispositivo;
  nombreDispositivo;
  nombreThing;
  datos: any = null;


  @ViewChild(IonSlides) slides: IonSlides;
  segment = 'Recursos';
  slideOpts = {
    speed: 200
  };
  constructor(private activatedRoute: ActivatedRoute, public router: Router, 
    private raspService : RaspberryService, private dataService: DataService
    ,private generateXml: GenerateXMLService) { }

  async ngOnInit() {
    let dir = this.activatedRoute.snapshot.paramMap.get('dir');
    const xmlDatos = await this.raspService.requestRaspberry(dir);
    
    if (xmlDatos === null) {
    } else {
      this.ipDispositivo = dir.substring(7, dir.indexOf('/Identificator?osid='));
      this.InformacionBasica = this.dataService.getInfoBasicaDispositivo(xmlDatos);
      this.idDispositivo = this.InformacionBasica[0].value[0]._;
      alert("IP: "+ this.ipDispositivo);
      alert("ID: "+ this.idDispositivo);
      const xmlDataStreams = await this.raspService.requestRaspberry('http://' + this.ipDispositivo + '/SendState?osid=' + this.idDispositivo);
      alert(xmlDataStreams);
      this.dataStreams = this.dataService.getEstadoDataStreams(xmlDataStreams);
    }
    if (this.activatedRoute.snapshot.paramMap.keys.length === 3) {
      this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
      this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
      this.tipoAsociacion = 'dispositivoHabitacion';
    } else {
      this.nombreThing = this.activatedRoute.snapshot.paramMap.get('nameThing');
      this.tipoAsociacion = 'dispositivoElemento';
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
  pushCrearDispositivo() {
        if (this.tipoAsociacion === 'dispositivoHabitacion' ) {
          //this.generateXml.crearAsociacionDispositivosHabitacion(this.edificio, this.habitacion,
           // this.nombreDispositivo, this.idDispositivo , this.ipDispositivo);
          this.router.navigate(['elementos-por-habitacion', this.edificio , this.habitacion]);
        } else {
          this.generateXml.crearAsociacionDispositivosElemento(this.nombreThing, this.nombreDispositivo,
             this.idDispositivo , this.ipDispositivo);
        }
    }
}
