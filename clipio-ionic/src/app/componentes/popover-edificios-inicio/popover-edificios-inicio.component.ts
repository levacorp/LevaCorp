import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PopoverController } from '@ionic/angular';
import { DataUserService } from '../../services/data-user.service';

@Component({
  selector: 'app-popover-edificios-inicio',
  templateUrl: './popover-edificios-inicio.component.html',
  styleUrls: ['./popover-edificios-inicio.component.scss'],
})
export class PopoverEdificiosInicioComponent implements OnInit {

  listaEdificios: any[] = [];

  constructor(private dataUserService: DataUserService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.listaEdificios = this.dataUserService.getListaEdificios();
  }

  /* Manda el valor que se obtuvo del popover a a clase que lo llamó */
  onClick(valor: any) {
    this.popoverCtrl.dismiss({
      edificio: valor
    });
  }

}
