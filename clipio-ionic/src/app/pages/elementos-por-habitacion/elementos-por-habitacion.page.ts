import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-elementos-por-habitacion',
  templateUrl: './elementos-por-habitacion.page.html',
  styleUrls: ['./elementos-por-habitacion.page.scss'],
})
export class ElementosPorHabitacionPage implements OnInit {
  elementos: Observable<any>;
  dispositivos: Observable<any>;
  habitacion: string;
  segment = 'elementos';
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    speed: 200
  };

  constructor(private activatedRoute: ActivatedRoute , private dataService: DataService , private router: Router) {
  }

  /* Inicializa los atributos a utilizar */
  ngOnInit() {
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.elementos = this.dataService.getElementos(); // Carga todos los elementos
    this.dispositivos = this.dataService.getElementos();
  }
  /*Se encarga de redirigir el elemento seleccionado a la pagina donde se muestras sus dispositivos asociados*/
  routeDispositivosElemento(elemento: string )  {
    this.router.navigate(['dispositivos-elemento', this.habitacion, elemento]);
  }
  routeCrearElemOdispositivo()  {
    if (this.segment === 'elementos') {
      this.router.navigate(['crear-elemento', this.habitacion]);
    } else{

    }
  }
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    if (segEscogido === 'elementos') {
      this.slides.slideTo(0);
    } else {
           this.slides.slideTo(1);
    }
  }

  slideChanged() {
    this.slides.getActiveIndex().then(data => {
      if ( data === 1) {
        this.segment = 'dispositivos';
      } else {
         this.segment = 'elementos';
      }
      });
    }
}
