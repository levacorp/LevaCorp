import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asociacion-elemento-dispositivo',
  templateUrl: './asociacion-elemento-dispositivo.page.html',
  styleUrls: ['./asociacion-elemento-dispositivo.page.scss'],
})
export class AsociacionElementoDispositivoPage implements OnInit {

  direccionEvento = null;
  direccionAccion = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  direccionLeidaEvento(dir: string) {
    this.direccionEvento = dir;
    this.router.navigate(['/lectura-qr', '3', dir]);
  }
}
