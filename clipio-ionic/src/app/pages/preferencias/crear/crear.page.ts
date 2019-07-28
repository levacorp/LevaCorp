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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  direccionLeidaEvento(dir: string) {
    this.router.navigate(['/lectura-qr', '1', dir]);
  }

  direccionLeidaAccion(dir: string) {
    this.router.navigate(['/lectura-qr', '2', dir]);
  }

  eliminarEvento() {
    this.direccionEvento = null;
  }

  eliminarAccion() {
    this.direccionAccion = null;
  }

  asignarEvento(evento: string) {
    this.direccionEvento = evento;
  }
  asignarAccion(accion: string) {
    this.direccionAccion = accion;
  }
}
