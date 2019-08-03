import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  myform: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController
  ) {
    this.myform = this.formBuilder.group({
      nombreApp: ['Clipio', Validators.required],
      nombre: '',
      apellido: '',
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      confirmacionContraseña: ''
    });

  }

  ngOnInit() {

    console.log(this.dataservice.setXMLPerson());
  }
  saveData() {
    if (this.myform.valid) {
      this.dataservice.setXMLRegistrar(this.myform);
      console.log(this.myform.value);
    }

  }

}
