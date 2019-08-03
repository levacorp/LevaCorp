import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-edificio',
  templateUrl: './crear-edificio.page.html',
  styleUrls: ['./crear-edificio.page.scss'],
})
export class CrearEdificioPage implements OnInit {
  nombre: null;
  piso: null;

  myform: FormGroup;
  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController
  ) { 
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.required],
      piso: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

}
