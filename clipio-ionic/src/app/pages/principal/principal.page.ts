import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {

  @ViewChild(IonSegment) segmentoelementos: IonSegment;
  elementos: Observable<any>;
  habitaciones: Observable<any>;
  filtro = '1';

  constructor(private dataService: DataService) { }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.segmentoelementos.value = '1'; // Elemento del segmento seleccionado por defecto
    this.elementos = this.dataService.getElementos(); // Carga todos los elementos
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido*/
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    this.filtro = segEscogido;
    console.log(segEscogido);
  }

}
