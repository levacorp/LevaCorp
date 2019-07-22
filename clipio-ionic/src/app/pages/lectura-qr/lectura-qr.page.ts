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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.direccion = this.route.snapshot.paramMap.get('dir');
    let id = this.route.snapshot.paramMap.get('id');
    if (id === '1') {
      this.getActuadoresYSensores();
    } else if (id === '2') {
      this.getActuadores();
    } else if (id === '3') {
      this.getDispositivo();
    }
  }


  getActuadores() {
    //this.http.get(this.direccion).subscribe(datosDispositivo => (this.dataActuadores = datosDispositivo));

    // this.dataActuadores = this.direccion;
  }


  getActuadoresYSensores() {
    const request = require('request');
    request("http://www.google.com", function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });


    // this.http.get(this.direccion).subscribe(apiData => (this.dataActuadoresYSensores = apiData));

    // this.dataActuadoresYSensores = this.direccion;
  }


  getDispositivo() {
    // this.http.get(this.direccion).subscribe(apiData => (this.dataDispositivo = apiData));

    this.dataDispositivo = this.direccion;
  }

}
