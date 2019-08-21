import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { pairwise, filter } from 'rxjs/operators';


@Component({
  selector: 'app-informacion-edificio',
  templateUrl: './informacion-edificio.page.html',
  styleUrls: ['./informacion-edificio.page.scss'],
})
export class InformacionEdificioPage implements OnInit {

  ambiente = null;
  informacionEdificio: any[];
  nombreEdificio = null;
  argumento = null;
  previusURL = '';
  constructor(
    private dataservice: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilidades: UtilitiesService) {
      this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
    ).subscribe((e: any) => {
      this.previusURL = (e[0].urlAfterRedirects); // previous url
    });
    }

  async ngOnInit() {
    this.utilidades.loading('Cargando habitaciones');
    this.nombreEdificio = this.activatedRoute.snapshot.paramMap.get('argumento');
    this.informacionEdificio = await this.dataservice.getListaHabitaciones(this.nombreEdificio);
    this.argumento = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.utilidades.pararLoading();
  }
  async ionViewWillEnter() {
    if ( this.previusURL.indexOf('crear-habitacion') !== -1) {
      this.utilidades.loading('Cargando habitaciones');
      this.informacionEdificio = await this.dataservice.getListaHabitaciones(this.nombreEdificio);
      this.utilidades.pararLoading();
    }
}
  pushElementoHabitacion(argumento, i) {
    this.ambiente = this.informacionEdificio[i][1];
    this.router.navigate(['elementos-por-habitacion', this.nombreEdificio, this.ambiente , argumento]);
  }
  pushCrearHabitacion() {
    this.router.navigate(['ambiente-edificio', this.nombreEdificio]);
  }
}
