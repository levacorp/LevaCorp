import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateXMLService } from '../../services/generate-xml.service';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { DataService } from '../../services/data.service';
import { DataUserService } from '../../services/data-user.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  myform: FormGroup;

  constructor(
    private authServices: AuthenticationService,
    private dataService: DataService,
    private dataUserService: DataUserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private encryptService: EncryptService,
    private generateXMLService: GenerateXMLService,
  ) {
    this.myform = this.formBuilder.group({
      dirIp: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  async login() {
    //this.myform.value.contrasena = this.encryptService.encrypt(this.myform.value.contrasena);
    //console.log('pass:', this.myform.value.contrasena);
    // Carga los datos a la clase que contiene los datos del entorno
    //this.dataService.getDatosInicioSesion(this.myform.value.email, this.myform.value.contrasena);
    await this.dataService.getXMLInicioSesion3(this.myform.value.email, this.myform.value.contrasena)
    .then(res => {
      if(res){
        this.authServices.login();
      }
      else{
        alert('E-mail o contraseña incorrecta');
      }
    });
  }

  verificarUsuario() {
    let usuarioExistente = false;
    if (this.dataUserService.datosUsuario["email"] === this.myform.value.email
        && this.dataUserService.datosUsuario['password'] === this.myform.value.contrasena) {
      usuarioExistente = true;
    }
    return usuarioExistente;
  }

  pushRegistro() {
    this.router.navigate(['/registrar']);
  }
}
