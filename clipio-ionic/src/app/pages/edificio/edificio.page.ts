import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.page.html',
  styleUrls: ['./edificio.page.scss'],
})
export class EdificioPage implements OnInit {

  edificios: any[];
  argumento = null;
  constructor(
    private dataservice: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataUserservice: DataUserService ) { }

  ngOnInit() {
    this.edificios = this.dataUserservice.getListaEdificios();
    console.log(this.edificios);
    this.argumento = this.activatedRoute.snapshot.paramMap.get('nombre');
  }
  pushCrearEdificio() {
    this.router.navigate(['/crear-edificio']);

  }
  pushInformacionEdificio(argumento) {
    this.router.navigate(['/informacion-edificio/',argumento]);
  }

}
