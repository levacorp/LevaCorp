import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';


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



  constructor( private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router) {   }
  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.elemento = this.activatedRoute.snapshot.paramMap.get('elemento');
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente');
    // Carga todos los elementos
    this.dispositivos = this.dataService.getDispositivosElemento(this.edificio, this.habitacion , this.elemento);
  }


   /*Se encarga de redirigir el dispositivo seleccionado a la pagina donde se muestras su informacion*/
   routeDispositivo(ip: string , id: string)   {
     this.router.navigate(['dispositivo', ip, id]);
   }

   pushCrearDispositivo(dir: string) {
    this.router.navigate(['crear-dispositivo', this.elemento, this.edificio, this.ambiente, this.habitacion , dir]);
  }
}
