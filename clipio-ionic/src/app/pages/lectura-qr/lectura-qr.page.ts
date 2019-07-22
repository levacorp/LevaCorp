import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lectura-qr',
  templateUrl: './lectura-qr.page.html',
  styleUrls: ['./lectura-qr.page.scss'],
})
export class LecturaQRPage implements OnInit {

  direccion: string;
  dataActuadores: any = null;
  dataDispositivo: any = null;
  dataActuadoresYSensores: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.direccion = this.route.snapshot.paramMap.get('dir');
    let id = this.route.snapshot.paramMap.get('id');
    if (id === '2') {
      this.getActuadores();
    } else if (id === '1') {
      this.getActuadoresYSensores();
    } else if (id === '3') {
      this.getDispositivo();
    }
  }


  getActuadores() {
    // this.http.get(this.direccion).subscribe(datosDispositivo => (this.dataActuadores = datosDispositivo));

    this.dataActuadores = this.direccion;
  }


  getActuadoresYSensores() {
    // this.http.get(this.direccion).subscribe(apiData => (this.dataActuadoresYSensores = apiData));

    this.dataActuadoresYSensores = this.direccion;
  }


  getDispositivo() {
    // this.http.get(this.direccion).subscribe(apiData => (this.dataDispositivo = apiData));

    this.dataDispositivo = this.direccion;
  }

}
