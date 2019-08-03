import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateXMLService } from '../../services/generate-xml.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  public inicioSesionForm: FormGroup;

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(
    private authServices: AuthenticationService,
    private generateXMLService: GenerateXMLService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    alert('Bienvenido:' + this.email.value);
    console.log('XML Inicio Sesion:', this.generateXMLService.crearXMLInicioSesion(this.email.value, this.password.value).toString());
    this.authServices.login();
  }
   pushRegistro() {
    this.router.navigate(['/registrar']);

  }
}
