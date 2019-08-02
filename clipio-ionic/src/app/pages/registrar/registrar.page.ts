import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor( private dataservice : DataService) { }

  ngOnInit() {

    

    console.log(this.dataservice.setXMLPerson());
  }
  
}
