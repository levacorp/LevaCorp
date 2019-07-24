import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {IonSlides} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  argumento = null;

  elementos: Observable<any>;
  @ViewChild(IonSlides) slides: IonSlides;

  segment = 'Recursos';

  constructor(private activatedRoute: ActivatedRoute , private dataService: DataService ) { }

  ngOnInit() {
      this.argumento = this.activatedRoute.snapshot.paramMap.get('id');
      this.elementos = this.dataService.getElementos(); // Carga todos los elementos
  }
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

  }
