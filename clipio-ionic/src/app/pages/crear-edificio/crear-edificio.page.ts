import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-edificio',
  templateUrl: './crear-edificio.page.html',
  styleUrls: ['./crear-edificio.page.scss'],
})
export class CrearEdificioPage implements OnInit {
  nombre: String;
  piso: String;
  constructor() { }

  ngOnInit() {
  }

}
