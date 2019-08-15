import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';


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
  constructor(
    private dataservice: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataUserService: DataUserService, private generateXml: GenerateXMLService) { }

  ngOnInit() {
    this.nombreEdificio = this.activatedRoute.snapshot.paramMap.get('argumento');
    this.informacionEdificio = this.dataUserService.getListaHabitaciones();
    this.argumento = this.activatedRoute.snapshot.paramMap.get('nombre');
  }

  pushElementoHabitacion(argumento, i) {
    this.ambiente = this.informacionEdificio[i][1];
    console.log(this.ambiente);
    this.router.navigate(['elementos-por-habitacion', this.nombreEdificio, this.ambiente , argumento]);
  }
  pushCrearHabitacion() {
    this.router.navigate(['ambiente-edificio', this.nombreEdificio]);
  }
  
}
