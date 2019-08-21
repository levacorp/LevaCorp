import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSegment, PopoverController, IonList } from '@ionic/angular';
import { PopoverEdificiosInicioComponent } from '../../componentes/popover-edificios-inicio/popover-edificios-inicio.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {

  @ViewChild('listaNotificaciones') listaNotificaciones: IonList;
  @ViewChild(IonSegment) segmentoelementos: IonSegment;
  elementos: any[] = [];
  habitaciones: any[] = [];
  notificaciones: any[] = [];
  edificios: any[] = [];
  ambiente = null; // Ambiente para la habitacion escogida
  filtro = null; // Carga los elementos de una habitacion por defecto
  argumento = null; // Nombre del edificio que llega por parametro

  constructor(
    private dataService: DataService,
    public popoverController: PopoverController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataUserService: DataUserService,
    public utilidades: UtilitiesService
  ) { }

  async ngOnInit() {
  }
  /* Inicializa los atributos a utilizar */
  async ionViewWillEnter()  {
    // crea un alert de espera
    this.utilidades.loading('Cargando informacion del edificio');
    await this.inicializarAtributos();
    this.dataService.listarECAs();
    // se cierra el alert
    this.utilidades.pararLoading();
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido y carga los elementos para el filtro*/
  async segmentButtonClicked(event) {
     // crea un alert de espera
    this.utilidades.loading('Cargando elementos de la habitacion');
    let segEscogido = event.detail.value;
    segEscogido = segEscogido.split(',');
    this.filtro = segEscogido[0];
    this.ambiente = segEscogido[1];
    await this.dataService.getListaElementosPorHabitacion(this.argumento, this.filtro);
    this.cargarListaElementosPorHabitacion();
     // se cierra el alert
    this.utilidades.pararLoading();
    }

   cargarListaElementosPorHabitacion() {
    this.elementos =  this.dataUserService.getListaElementosPorHabitacion();
  }

   cargarListaEdificios() {
    this.edificios =  this.dataUserService.getListaEdificios();
  }

   cargarListaHabitaciones() {
    this.habitaciones =  this.dataUserService.getListaHabitaciones();
  }

  /* Inicializa el argumento, el ambiente, y el filtro */
  /* Importante el orden de los llamados */
   async inicializarAtributos() {
    this.dataService.capturarDatosUsuario();
    this.notificaciones = ['Daniel ha llegado a casa', 'Forero salio de casa', 'Daniel Gomez ha llegado a casa', 'Vanesa salió de casa'];

    await this.dataService.getListaEdificios();
    this.cargarListaEdificios();
    this.cargarEdificio();

    await this.dataService.getListaHabitaciones(this.argumento);
    this.cargarListaHabitaciones();

    this.cargarFiltro();
    this.cargarAmbiente();

    await this.dataService.getListaElementosPorHabitacion(this.argumento, this.filtro);
    this.cargarListaElementosPorHabitacion();
  }

  cargarEdificio() {
    if (this.activatedRoute.snapshot.paramMap.get('edificio') === null) { // obtiene el parametro edifcio enviado por la ruta
      if (this.edificios) {
        if (this.edificios[0]) {
          this.argumento = this.edificios[0];
          this.dataUserService.setEdificioActual(this.argumento);
        }
      }
    } else {
      this.argumento = this.activatedRoute.snapshot.paramMap.get('edificio');
    }
  }

  cargarFiltro() {
    if (this.habitaciones) {
      if (this.habitaciones[0]) {
        this.filtro = this.habitaciones[0][0];
      }
    }
  }

  cargarAmbiente() {
    if (this.habitaciones) {
      if (this.habitaciones[0]) {
        this.ambiente = this.habitaciones[0][1];
      }
    }
  }

  /* Carga todos los edificios en un popover y obtiene la respuesta del popover */
  async cargarEdificios(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverEdificiosInicioComponent,
      event: ev,
      translucent: true,
      cssClass: 'popoverEdificio', /* css necesario para el estilo del popover (se guarda en los estilos generales app.css)*/
      mode: 'md', /* Aplicar material design a todos los dispositivos */
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      if (data.edificio === 'nuevo') {
        this.router.navigate(['crear-edificio']);
      } else {
        this.dataUserService.setEdificioActual(data.edificio);
        this.router.navigate(['/principal', data.edificio]);
      }
    }
  }

  /* elimina un item de la lista de notificaciones */
  delete(item) {
    const index = this.notificaciones.indexOf(item);
    if (index > -1) {
      this.notificaciones.splice(index, 1);
    }
    this.comprobarNotificaciones();
  }

  /* comprueba si existen notificaciones */
  comprobarNotificaciones() {
    if (this.notificaciones.length === 0) {
      const nodo = document.getElementById('cartaNotificaciones');
      if (nodo.parentNode) {
        nodo.parentNode.removeChild(nodo);
      }
    }
  }

  pushElemento(elemento, i) {
    this.router.navigate(['dispositivos-elemento/', elemento, this.argumento, this.ambiente, this.filtro]);
  }

  pushCrearHabitacion() {
    this.router.navigate(['ambiente-edificio/', this.argumento]);
  }

  pushCrearEdificio() {
    this.router.navigate(['crear-edificio']);
  }

  pushCrearElementoHabitacion() {
    this.router.navigate(['crear-elemento/', this.argumento, this.ambiente, this.filtro]);
  }
}
