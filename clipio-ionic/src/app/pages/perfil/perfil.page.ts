import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroupName, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { EnviarXMLService } from 'src/app/services/enviar-xml.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfil: any[];
  myform: FormGroup;
  xmlRegistrarUsuario = null;
  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private generarXML: GenerateXMLService,
    public alertController: AlertController,
    private utilidades: UtilitiesService,
    private authservice: AuthenticationService
  ) {
    // componentes del formulario myform
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      apellido: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      celular: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('[0-9]*')])],
      genero: ['', Validators.compose([Validators.maxLength(10)])],
      email: '',
      fechaNacimiento: ['', Validators.compose([Validators.maxLength(10)])],
      lugarNacimiento: ['', Validators.compose([Validators.maxLength(20)])],
      facebook: ['', Validators.compose([Validators.maxLength(45)])]

    });

  }

  async ngOnInit() {
    await this.dataservice.getPerfilUsuario().then(res => {
      this.perfil = res;
      console.log(this.perfil);
      this.myform.get('nombre').setValue(this.perfil[0]);
      this.myform.get('apellido').setValue(this.perfil[1]);
      this.myform.get('celular').setValue(this.perfil[2]);
      this.myform.get('genero').setValue(this.perfil[3]);
      this.myform.get('email').setValue(this.perfil[7]);
      this.myform.get('fechaNacimiento').setValue(this.perfil[4]);
      this.myform.get('lugarNacimiento').setValue(this.perfil[6]);
      this.myform.get('facebook').setValue(this.perfil[5]);
    });
  }
  //metodo que guarda y envia el formulario para crear el xml del perfil usuario
  async saveData() {
    let codigo;
    this.xmlRegistrarUsuario = this.generarXML.setXMLPerfil(this.myform);
    // if (this.myform.valid) {
    await this.dataservice.modificarPerfil(this.xmlRegistrarUsuario, this.myform.value.email)
      .then(async data => {
        codigo = await this.utilidades.alertEspecifica('Perfil', data);
        console.log(codigo);
        if (codigo === '1028' || codigo === '1044') {
        }
      });

    //}

  }

}
