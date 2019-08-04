import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateXMLService } from '../../services/generate-xml.service';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { DeviceServicesService } from '../../services/device-services.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';

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
    public deviceServices: DeviceServicesService,
    private androidPermissions: AndroidPermissions,
    private uid: Uid) {
  }

  ngOnInit() {
  }

  login() {
    this.password.value = this.encryptService.encrypt(this.password.value);
    this.authServices.login();
    
    /*let url = this.urlServidor + "ValidarUsuarioApp?email=" + email
                + "&user_name=" + userName + "&mac=" + this.mac +
                "&name_app=Clipio&password=" + contra;
        return url;*/
    //console.log('XML Inicio Sesion:', this.generateXMLService.crearXMLInicioSesion(this.email.value, this.password.value).toString());
  }

  pushRegistro() {
    
    this.router.navigate(['/registrar']);

  }

  getID_UID(type) {
    if (type == "IMEI") {
      return this.uid.IMEI;
    } else if (type == "ICCID") {
      return this.uid.ICCID;
    } else if (type == "IMSI") {
      return this.uid.IMSI;
    } else if (type == "MAC") {
      return this.uid.MAC;
    } else if (type == "UUID") {
      return this.uid.UUID;
    }
  }

  getPermission() {
    let varResultado = false;
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {
        varResultado = true;
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert(res);
          varResultado = true;
        }).catch(error => {
          alert("Error! " + error);
        });
      }
    }).catch(error => {
      alert("Error! " + error);
    });
    alert('permisos?: ' + varResultado);
    return varResultado;
  }
}
