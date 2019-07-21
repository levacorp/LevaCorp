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
<<<<<<< HEAD
    this.segmentoelementos.value = '1'; // Elemento del segmento seleccionado por defecto
    this.elementos = this.dataService.getElementos(); // Carga todos los elementos
    //this.dataService.getHabitaciones().subscribe(console.log);
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido*/
=======
    // this.segmentoelementos.value = '1'; // Elemento del segmento seleccionado por defecto
    // this.elementos = this.dataService.getElementos(); // Carga todos los elementos
    this.dataService.getHabitaciones().subscribe(console.log);
  }
  /* Cuando se requiere traer los elementos filtrados o sin filtrar iguala el atributo filtro
    al filtro escogido
>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    this.filtro = segEscogido;
    console.log(segEscogido);
<<<<<<< HEAD
  }
=======
  }*/
>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe

}
