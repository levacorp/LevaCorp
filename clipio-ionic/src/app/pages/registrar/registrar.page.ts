import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { EncryptService } from 'src/app/services/encrypt.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';


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
    private generarXML: GenerateXMLService,
    private encrypt: EncryptService,
    public alertController: AlertController
  ) {
    this.myform = this.formBuilder.group({
      nombreApp: ['Clipio', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmacionContrasena: ['', Validators.compose([Validators.required,Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }


  saveData() {
    if (this.myform.valid) {
      this.myform.value.contrasena = this.encrypt.encrypt(this.myform.value.contrasena);
      this.myform.value.confirmacionContrasena = this.encrypt.encrypt(this.myform.value.confirmacionContrasena);
      this.generarXML.setXMLRegistrar(this.myform);
      console.log(this.myform.value);
      this.exitosoAlert();
    }
  }

  checkPass() {
    //Store the password field objects into variables ...
    let objPass1 = <HTMLInputElement>document.getElementById('contrasena');
    let objPass2 = <HTMLInputElement>document.getElementById('confirmacionContrasena');
    let pass1 = (objPass1).value;
    let pass2 = (objPass2).value;
    //Store the Confimation Message Object ...
    let message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    let mensaje="";
    let goodColor = "#66cc66";
    let badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if (pass1 === pass2 && (pass1 !== "" || pass2 !=="")) {
      //The passwords match. 
      //Set the color to the good color and inform
      //the user that they have entered the correct password 
      message.style.color = goodColor;
      message.innerHTML = "*Contraseñas iguales";
    } else {
      //The passwords do not match.
      //Set the color to the bad color and
      //notify the user.
      message.style.color = badColor;
      message.innerHTML = "*Las contraseñas son incorrectas";
    }
    //console.log(pass1,pass2);

  }
  async exitosoAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'Se ha registrado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
  async fracasoAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'No se ha podido registrar.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
