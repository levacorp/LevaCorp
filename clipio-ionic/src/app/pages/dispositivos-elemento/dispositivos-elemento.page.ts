import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DataUserService } from 'src/app/services/data-user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { filter, pairwise } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-dispositivos-elemento',
  templateUrl: './dispositivos-elemento.page.html',
  styleUrls: ['./dispositivos-elemento.page.scss'],
})
export class DispositivosElementoPage implements OnInit {
  habitacion = null;
  ambiente = null;
  edificio = null;
  elemento = null;
  dispositivos: any[];
  previusURL = '';

  constructor( private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router,
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
    this.utilidades.loading('Cargando dispositivos');
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.elemento = this.activatedRoute.snapshot.paramMap.get('elemento');
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente');
    // Carga todos los dispositivos del elemento
    this.dispositivos = await this.dataService.getDispositivosElemento(this.edificio, this.habitacion , this.elemento);
    this.utilidades.pararLoading();
  }

  async ionViewWillEnter()  {
    if (this.previusURL.indexOf('crear-dispositivo') !== -1)  {
      // Carga todos los dispositivos del elemento
      this.utilidades.loading('Cargando dispositivos del elemento');
      this.dispositivos = await this.dataService.getDispositivosElemento(this.edificio, this.habitacion , this.elemento);
      this.utilidades.pararLoading();
    }
  }
   /*Se encarga de redirigir el dispositivo seleccionado a la pagina donde se muestras su informacion*/
   routeDispositivo(id: string)   {
     this.router.navigate(['dispositivo', this.dataUser.getIP(), id]);
   }
   // se encarga de dirgir a la asociacion de un dispositivo
   async pushCrearDispositivo(dir: string) {
     /* Si la direccion leída no contiene los siguientes caracteres se considera inválida */
    if (dir.indexOf('/Identificator?osid=') === -1) {
      alert('Direccion no valida');
    } else {
      // redirige a la creacion
      this.router.navigate(['crear-dispositivo', this.elemento, this.edificio, this.ambiente, this.habitacion , dir]);
    }
  }
}
