import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateXMLService } from '../../services/generate-xml.service';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { DeviceServicesService } from '../../services/device-services.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  myform: FormGroup;

  constructor(
    private authServices: AuthenticationService,
    private generateXMLService: GenerateXMLService,
    public formBuilder: FormBuilder,
    private router: Router,
    private encryptService: EncryptService
  ) {
    this.myform = this.formBuilder.group({
      dirIp: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  login() {
    // this.password.value = this.encryptService.encrypt(this.password.value);
    this.myform.value.contrasena = this.encryptService.encrypt(this.myform.value.contrasena);
    this.authServices.login();
    console.log('XML Inicio Sesion:', this.generateXMLService.crearXMLInicioSesion(this.myform.value.contrasena, this.myform.value.contrasena.password).toString());
  }

  pushRegistro() {
    this.router.navigate(['/registrar']);
  }

}
