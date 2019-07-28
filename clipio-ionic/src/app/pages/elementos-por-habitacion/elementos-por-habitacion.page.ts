import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elementos-por-habitacion',
  templateUrl: './elementos-por-habitacion.page.html',
  styleUrls: ['./elementos-por-habitacion.page.scss'],
})
export class ElementosPorHabitacionPage implements OnInit {
  elementos: Observable<any>;
  constructor(private dataService: DataService , private router: Router) { }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.elementos = this.dataService.getElementos(); // Carga todos los elementos
  }
  /*Se encarga de redirigir el elemento seleccionado a la pagina donde se muestras sus dispositivos asociados*/
  routeDispositivosElemento(id: string )  {
    this.router.navigate(['dispositivos-elemento', id]);
  }
}
