import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.page.html',
  styleUrls: ['./mostrar.page.scss'],
})
export class MostrarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pushModificarECA() {
    this.router.navigate(['/preferencias/modificar']);
  }

}
