import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-informacion-edificio',
  templateUrl: './informacion-edificio.page.html',
  styleUrls: ['./informacion-edificio.page.scss'],
})
export class InformacionEdificioPage implements OnInit {
  
  informacionEdificio: any[];
  nombreEdificio=null;
  argumento = null;
  constructor(private dataservice: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombreEdificio= this.activatedRoute.snapshot.paramMap.get('argumento');
    this.informacionEdificio = this.dataservice.getListaHabitaciones(this.nombreEdificio);
    this.argumento = this.activatedRoute.snapshot.paramMap.get('nombre');

  }

  pushElementoHabitacion(argumento) {
    this.router.navigate(['elementos-por-habitacion', argumento]);
  }
}
