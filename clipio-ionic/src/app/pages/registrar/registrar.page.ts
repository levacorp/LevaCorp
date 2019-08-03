import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { EncryptService } from 'src/app/services/encrypt.service';

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
    public navCtrl: NavController,
    private encrypt: EncryptService
  ) {
    this.myform = this.formBuilder.group({
      nombreApp: ['Clipio', Validators.required],
      nombre: '',
      apellido: '',
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      confirmacionContraseña: ['', Validators.required]
    });
  }

  ngOnInit() {

    console.log(this.dataservice.setXMLPerson());
  }


  saveData() {
    if (this.myform.valid) {
      this.myform.value.contraseña = this.encrypt.encrypt(this.myform.value.contraseña);
      this.dataservice.setXMLRegistrar(this.myform);
      console.log(this.myform.value);
    }
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let contraseña = group.controls[passwordKey];
      let confirmacionContraseña = group.controls[confirmPasswordKey];

      if (contraseña.value !== confirmacionContraseña.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}
