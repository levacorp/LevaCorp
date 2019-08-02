import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { EmailValidator } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private authServices: AuthenticationService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDatosInicioSesion();
  }

  login() {
    this.authServices.login();
    console.log(this.email.value);
    console.log(this.password.value);
  }

}
