import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dispositivos-elemento',
  templateUrl: './dispositivos-elemento.page.html',
  styleUrls: ['./dispositivos-elemento.page.scss'],
})
export class DispositivosElementoPage implements OnInit {
  argumento = null;
  elementos: Observable<any>;



  constructor( private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router) {   }
  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('id');
    this.elementos = this.dataService.getElementos(); // Carga todos los elementos
  }


   /*Se encarga de redirigir el elemento seleccionado a la pagina donde se muestras sus dispositivos asociados*/
   routeDispositivo(id: string )   {
     this.router.navigate(['dispositivo', id]);
   }
   pushCrearElemento()   {

   }

  
}
