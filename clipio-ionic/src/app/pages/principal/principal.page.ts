import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSegment, PopoverController, IonList } from '@ionic/angular';
import { PopoverEdificiosInicioComponent } from '../../componentes/popover-edificios-inicio/popover-edificios-inicio.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {

  @ViewChild('listaNotificaciones') listaNotificaciones: IonList;
  @ViewChild(IonSegment) segmentoelementos: IonSegment;
  elementos: any[];
  habitaciones: any[];
  notificaciones: any[];
  filtro = 'cocina';
  argumento = null;

  constructor(
    private dataService: DataService,
    public popoverController: PopoverController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataUserService: DataUserService) { }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    console.log('MAC: ', this.dataUserService.getMAC());
    this.notificaciones = ['Daniel ha llegado a casa', 'Forero salio de casa', 'Daniel Gomez ha llegado a casa', 'Vanesa salió de casa'];
    this.argumento = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.dataService.getListaEdificios();
    this.dataService.getListaHabitaciones(this.argumento);
    this.dataService.getListaElementosPorHabitacion(this.argumento, this.filtro);
    this.dataService.listarECAs();
    this.habitaciones = this.dataUserService.getListaHabitaciones();
    this.cargarElementosPorHabitacion();
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido y carga los elementos para el filtro*/
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    this.filtro = segEscogido;
    this.dataService.getListaElementosPorHabitacion(this.argumento, this.filtro);
    this.cargarElementosPorHabitacion();
  }

  cargarElementosPorHabitacion() {
    this.elementos = this.dataUserService.getListaElementosPorHabitacion();
  }

  pushElemento(elemento) {
    console.log('params: ', this.filtro, '+', elemento);
    this.router.navigate(['dispositivos-elemento', this.filtro, elemento]);
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
      this.router.navigate(['/principal', data.edificio]);
    }
  }

  delete(item) {
    const index = this.notificaciones.indexOf(item);
    console.log('index: ', index);
    if (index > -1) {
      this.notificaciones.splice(index, 1);
    }
    console.log(this.notificaciones);
    this.comprobarNotificaciones();
  }

  comprobarNotificaciones() {
    if (this.notificaciones.length === 0) {
      const nodo = document.getElementById('cartaNotificaciones');
      if (nodo.parentNode) {
        nodo.parentNode.removeChild(nodo);
      }
    }
  }

}
