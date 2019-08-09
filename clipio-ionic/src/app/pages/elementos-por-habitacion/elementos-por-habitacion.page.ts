import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { EscanerComponent } from 'src/app/componentes/escaner/escaner.component';

@Component({
  selector: 'app-elementos-por-habitacion',
  templateUrl: './elementos-por-habitacion.page.html',
  styleUrls: ['./elementos-por-habitacion.page.scss'],
})
export class ElementosPorHabitacionPage implements OnInit {
  elementos: any[];
  dispositivos: any[];
  edificio: string;
  ambiente: string;
  habitacion: string;
  segment;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(EscanerComponent) scanner: EscanerComponent;
  slideOpts = {
    speed: 200
  };

  constructor(private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router) {
  }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.segment = 'elementos'; // Inicializa la pestaña en la opcion elemento;
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio'); // obtiene el parametro edifcio enviado por la ruta
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente'); // obtiene el parametro ambiente enviado por la ruta
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion'); // obtiene el parametro habitacion enviado por la ruta
    this.elementos = this.dataService.getElementosPorHabitacion(this.edificio, this.habitacion); // Carga todos los elementos de la habitacion
    this.dispositivos = this.dataService.getDispositivosPorHabitacion(this.edificio, this.habitacion); // carga todos los dispositivos de la habitacion
  }
  async crearElementoOAsociarDispositivo(){
    // se averigua en que segment se encuenra actualmente
    if (this.segment === 'dispositivos') {
      // si esta en dispositivos se abre el scanner y redirige a la pagina crearDispositio
      const dir = await this.scanner.leerCodigo();
      this.router.navigate(['crear-dispositivo', this.edificio, this.ambiente, this.habitacion , dir]);
    } else {
      // si esta en elementos redirige a la pagina crearElemento
      this.router.navigate(['crear-elemento', this.edificio, this.ambiente , this.habitacion]);
    }
  }
  /*Se encarga de redirigir el elemento seleccionado a la pagina donde se muestras sus dispositivos asociados*/
  routeDispositivosElemento(elemento: string )  {
    this.router.navigate(['dispositivos-elemento', elemento, this.edificio, this.ambiente, this.habitacion]);
  }
  /*Se encarga de redirigir el dispositivo seleccionado a la pagina dispositivo donde muestra toda su informacion*/
  routeDispositivo(ip, id) {
    this.router.navigate(['dispositivo', ip, id]);
  }
  // Evento cuando se da click en un segmento
  segmentButtonClicked(event) {
    // Se obtiene el valor del segmento clickeado
    const segEscogido = event.detail.value;
    // Se decide que slide mostrar
    if (segEscogido === 'elementos') {
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
        this.segment = 'dispositivos';
      } else {
         this.segment = 'elementos';
      }
      });
    }
}
