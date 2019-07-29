import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  onReadEvent = new EventEmitter();
  onReadAction = new EventEmitter();

  direccionEvento = null;
  direccionAccion = null;

  datastreamEvento = null;
  datastreamAccion = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  guardarDireccionEvento(dir: string) {
    this.direccionEvento = dir;
  }

  guardarDireccionAccion(dir: string) {
    this.direccionAccion = dir;
  }

  eliminarEvento() {
    this.datastreamEvento = null;
    this.direccionEvento = null;
  }

  eliminarAccion() {
    this.datastreamAccion = null;
    this.direccionAccion = null;
  }

  asignarEvento(evento: string) {
    this.datastreamEvento = evento;
  }
  asignarAccion(accion: string) {
    this.datastreamAccion = accion;
  }
  
}
