import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonSegment, PopoverController } from '@ionic/angular';
import { PopoverEdificiosInicioComponent } from '../../componentes/popover-edificios-inicio/popover-edificios-inicio.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {

  @ViewChild(IonSegment) segmentoelementos: IonSegment;
  elementos: any[];
  habitaciones: any[];
  filtro = '1';
  argumento = null;

  constructor(private dataService: DataService, public popoverController: PopoverController,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.dataService.getXMLBuildingEnviroment();
    this.argumento = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.habitaciones = this.dataService.getListaHabitaciones(this.argumento);
    console.log(this.dataService.getHabitaciones('casa'));

    //document.getElementById("inp").innerHTML = myJSON;
    //console.log('elementos: ', this.dataService.getElementos('casa', 'cocina'));
    //console.log(json.Objects.Object[0].InfoItem[0].InfoItem[0].InfoItem[0]);
    // tslint:disable-next-line: forin
    // this.segmentoelementos.value = '1'; // Elemento del segmento seleccionado por defecto
    //this.elementos = this.dataService.getElementos(); // Carga todos los elementos
    //this.habitaciones = this.dataService.getHabitaciones();
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido*/
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    this.filtro = segEscogido;
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
      console.log('padre: ', data);
      this.router.navigate(['/principal/casa']);
    }
  }

}
