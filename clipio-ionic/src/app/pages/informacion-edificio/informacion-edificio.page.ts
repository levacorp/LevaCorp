import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-edificio',
  templateUrl: './informacion-edificio.page.html',
  styleUrls: ['./informacion-edificio.page.scss'],
})
export class InformacionEdificioPage implements OnInit {
  informacionEdificio: Observable<any>;
  constructor(private dataservice: DataService, private router: Router) { }

  ngOnInit() {
    this.informacionEdificio = this.dataservice.getInformacionEdificio();

  }

}
