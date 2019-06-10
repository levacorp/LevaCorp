import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag-clipio',
  templateUrl: './pag-clipio.component.html',
  styleUrls: ['./pag-clipio.component.css']
})
export class PagClipioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  clickInicioSesion(){
    alert("INICIA");
  }
}
