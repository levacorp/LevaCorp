import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dispositivos-elemento',
  templateUrl: './dispositivos-elemento.page.html',
  styleUrls: ['./dispositivos-elemento.page.scss'],
})
export class DispositivosElementoPage implements OnInit {
  argumento = null;
  constructor( private activatedRoute: ActivatedRoute) {   }

  ngOnInit() {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
