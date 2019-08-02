import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-crear-dispositivo',
  templateUrl: './crear-dispositivo.page.html',
  styleUrls: ['./crear-dispositivo.page.scss'],
})
export class CrearDispositivoPage implements OnInit {

  dataStreams: Observable<any>;
  InformacionBasica: Observable<any>;
  habitacion;
  dispositivo;

  @ViewChild(IonSlides) slides: IonSlides;
  segment = 'Recursos';
  slideOpts = {
    speed: 200
  };
  constructor(private activatedRoute: ActivatedRoute, public router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.dispositivo = this.activatedRoute.snapshot.paramMap.get('dispositivo');
    this.activatedRoute.snapshot.paramMap.get('dir');
    this.dataStreams = this.dataService.getEstadoDataStreams(); // Carga todos los elementos
    this.InformacionBasica = this.dataService.getInfoBasicaDispositivo();  }
  segmentButtonClicked(event) {
    const segEscogido = event.detail.value;
    if (segEscogido === 'Recursos') {
      this.slides.slideTo(0);
    } else {
           this.slides.slideTo(1);
    }
  }

  slideChanged() {
    this.slides.getActiveIndex().then(data => {
      if ( data === 1) {
        this.segment = 'Informacion';
      } else {
         this.segment = 'Recursos';
      }
      });
    }
  pushCrearDispositivo(){
        this.router.navigate(['dispositivos-elemento', this.habitacion , this.dispositivo]);
    }

}
