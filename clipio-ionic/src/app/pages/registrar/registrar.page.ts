import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { EncryptService } from 'src/app/services/encrypt.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  myform: FormGroup;
  matching_passwords_group: FormGroup;  
  xmlRegistrarUsuario = null; 

  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private generarXML: GenerateXMLService,
    private encrypt: EncryptService,
    public alertController: AlertController,
    private utilidades : UtilitiesService, 
    private authservice : AuthenticationService
  ) {
    this.myform = this.formBuilder.group({
      nombreApp: ['Clipio', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmacionContrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  async saveData() {
      let codigo;

      this.myform.value.contrasena = btoa(this.encrypt.encrypt(this.myform.value.contrasena));
      this.myform.value.confirmacionContrasena = btoa(this.encrypt.encrypt(this.myform.value.confirmacionContrasena));
      this.xmlRegistrarUsuario = this.generarXML.setXMLRegistrar(this.myform);
      if (this.myform.valid) {
         await this.dataservice.registrarUsuario(this.xmlRegistrarUsuario, this.myform.get('email').value)
         .then(async data => {
            codigo = await this.utilidades.alertEspecifica( "Registro Usuario ", data);
            console.log(codigo);

            if (codigo === '1028' || codigo === '1044') {
              this.authservice.login();
            }
         });

      }

    }

  checkPass() {
    // Store the password field objects into variables ...
    const objPass1 = <HTMLInputElement>document.getElementById('contrasena');
    const objPass2 = <HTMLInputElement>document.getElementById('confirmacionContrasena');
    const pass1 = (objPass1).value;
    const pass2 = (objPass2).value;
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
