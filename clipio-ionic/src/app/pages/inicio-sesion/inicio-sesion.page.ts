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
    this.dataUserService.setIP(this.myform.value.dirIp);
    this.dataUserService.setEmail(this.myform.value.email);
    this.myform.value.contrasena = btoa(this.encryptService.encrypt(this.myform.value.contrasena));
    await this.dataService.getVerificarUsuario(this.myform.value.email, this.myform.value.contrasena)
    .then(res => {
      if (res) {
        this.dataUserService.setIP(this.myform.value.dirIp);
        this.dataUserService.setEmail(this.myform.value.email);
        this.authServices.login();
      } else {
        alert('E-mail o contraseña incorrecta');
      }
    });
  }

  pushRegistro() {
    this.router.navigate(['/registrar']);
  }
}
