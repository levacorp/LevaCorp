import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSegment, PopoverController } from '@ionic/angular';
import { PopoverEdificiosInicioComponent } from '../../componentes/popover-edificios-inicio/popover-edificios-inicio.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {

  @ViewChild(IonSegment) segmentoelementos: IonSegment;
  elementos: any[];
  habitaciones: any[];
  filtro = 'cocina';
  argumento = null;

  constructor(private dataService: DataService, public popoverController: PopoverController,
              private router: Router, private activatedRoute: ActivatedRoute, private dataUserService: DataUserService) { }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
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

}
