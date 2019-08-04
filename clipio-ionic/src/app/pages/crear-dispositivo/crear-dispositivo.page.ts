import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';


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

  @ViewChild(IonSlides) slides: IonSlides;
  segment = 'Recursos';
  slideOpts = {
    speed: 200
  };
  constructor(private activatedRoute: ActivatedRoute, public router: Router, private dataService: DataService
    ,private generateXml: GenerateXMLService) { }

  ngOnInit() {
    alert(this.activatedRoute.snapshot.paramMap.get('dir'));


    if (this.activatedRoute.snapshot.paramMap.keys.length === 3) {
      this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
      this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
      this.tipoAsociacion = 'dispositivoHabitacion';
    } else {
      this.nombreThing = this.activatedRoute.snapshot.paramMap.get('nameThing');
      this.tipoAsociacion = 'dispositivoElemento';
    }
    this.dataStreams = this.dataService.getEstadoDataStreams(); // Carga todos los elementos
    this.InformacionBasica = this.dataService.getInfoBasicaDispositivo();
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
