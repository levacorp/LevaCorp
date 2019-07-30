import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  direccionEvento = null;
  direccionAccion = null;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  direccionLeidaEvento(dir: string) {
    this.direccionEvento = dir;
    // this.router.navigate(['/lectura-qr', '1', dir]);
  }

  direccionLeidaAccion(dir: string) {
    this.direccionAccion = dir;
    // this.router.navigate(['/lectura-qr', '2', dir]);
  }

  eliminarEvento() {
    this.direccionEvento = null;
  }

  eliminarAccion() {
    this.direccionAccion = null;
  }
}
