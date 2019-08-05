import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.page.html',
  styleUrls: ['./mostrar.page.scss'],
})
export class MostrarPage implements OnInit {

  nombreECA = null;
  ECA = null;

  constructor(private dataUserService: DataUserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombreECA = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.ECA = this.dataUserService.getECA(this.nombreECA);
  }

  pushModificarECA() {
    this.router.navigate(['/preferencias/modificar', this.nombreECA]);
  }

}
