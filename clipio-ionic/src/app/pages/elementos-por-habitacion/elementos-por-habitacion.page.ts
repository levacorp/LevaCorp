import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { EscanerComponent } from 'src/app/componentes/escaner/escaner.component';
import { DataUserService } from 'src/app/services/data-user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { filter, pairwise } from 'rxjs/operators';

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
  previusURL = '';
  segment;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(EscanerComponent) scanner: EscanerComponent;
  slideOpts = {
    speed: 200
  };

  constructor(private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router,
              private dataUser: DataUserService, private utilidades: UtilitiesService) {
                this.router.events
                .pipe(filter((e: any) => e instanceof RoutesRecognized),
                    pairwise()
                ).subscribe((e: any) => {
                  this.previusURL = (e[0].urlAfterRedirects); // previous url
                });
  }

  /* Inicializa los atributos a utilizar */
  async ngOnInit() {
    this.utilidades.loading('Cargando informacion de la habitacion');
    this.segment = 'elementos'; // Inicializa la pestaña en la opcion elemento;
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio'); // obtiene el parametro edifcio enviado por la ruta
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente'); // obtiene el parametro ambiente enviado por la ruta
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion'); // obtiene el parametro habitacion enviado por la ruta
    this.elementos = await this.dataService.getElementosPorHabitacion(this.edificio, this.habitacion); // Carga todos los elementos de la habitacion
    this.dispositivos = await this.dataService.getDispositivosPorHabitacion(this.edificio, this.habitacion); // carga todos los dispositivos de la habitacion
    this.utilidades.pararLoading();
  }
  async ionViewWillEnter()  {
    if (this.previusURL.indexOf('crear-elemento') !== -1)  {
      // Carga todos los elementos de la habitacion
      this.utilidades.loading('Cargando elementos de la habitacion');
      this.elementos = await this.dataService.getElementosPorHabitacion(this.edificio, this.habitacion);
      this.utilidades.pararLoading();
    } else if (this.previusURL.indexOf('crear-dispositivo') !== -1)    {
      this.utilidades.loading('Cargando dispositivos de la habitacion');
       // carga todos los dispositivos de la habitacion
      this.dispositivos = await this.dataService.getDispositivosPorHabitacion(this.edificio, this.habitacion);
      this.utilidades.pararLoading();
    }


  }
  async crearElementoOAsociarDispositivo() {
    // se averigua en que segment se encuenra actualmente
    if (this.segment === 'dispositivos') {
      // si esta en dispositivos se abre el scanner y redirige a la pagina crearDispositio
      //const dir = await this.scanner.leerCodigo();
      const dir = "http://10.0.0.20/Identificator?osid=708637323";
      /* Si la direccion leída no contiene los siguientes caracteres se considera inválida */
      if (dir.indexOf('/Identificator?osid=') === -1) {
        alert('Direccion no valida');
      } else {
        // redirige a la creacion
        this.router.navigate(['crear-dispositivo', this.edificio, this.ambiente, this.habitacion , dir]);
      }
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
  routeDispositivo(id) {
    this.router.navigate(['dispositivo', this.dataUser.getIP() , id]);
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
