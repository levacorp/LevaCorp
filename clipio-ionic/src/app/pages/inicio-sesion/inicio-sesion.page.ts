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

  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('ip') ip;

  constructor(
    private authServices: AuthenticationService,
    private generateXMLService: GenerateXMLService,
    public formBuilder: FormBuilder,
    private router: Router,
    private encryptService: EncryptService,
    private deviceServices: DeviceServicesService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.password.value = this.encryptService.encrypt(this.password.value);
    this.authServices.login();

    /*let url = this.urlServidor + "ValidarUsuarioApp?email=" + email
                + "&user_name=" + userName + "&mac=" + this.mac +
                "&name_app=Clipio&password=" + contra;
        return url;*/
    console.log('IP:', this.ip.value);
    alert('MAC:' + this.deviceServices.getMAC());
    //console.log('XML Inicio Sesion:', this.generateXMLService.crearXMLInicioSesion(this.email.value, this.password.value).toString());
  }

    pushRegistro() {
    this.router.navigate(['/registrar']);

  }
}
