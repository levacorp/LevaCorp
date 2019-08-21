import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-crear-edificio',
  templateUrl: './crear-edificio.page.html',
  styleUrls: ['./crear-edificio.page.scss'],
})
export class CrearEdificioPage implements OnInit {
  nombre = null;
  piso = null;
  xmlRegistrarEdificio = null;

  myform: FormGroup;
  constructor(
    private dataservice: DataService,
    private dataUser: DataUserService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private generarXML: GenerateXMLService,
    public alertController: AlertController,
    private utilidades: UtilitiesService, private route: Router
  ) {
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      piso: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }
  // metodo que guarda y envia el formulario para crear el xml para registrar un nuevo edificio

  async saveData() {

    let codigo;
    this.xmlRegistrarEdificio = this.generarXML.setXMLRegistrarEdificio(this.myform);
    if (this.myform.valid) {
      const data = await this.dataservice.registrarEdificio(this.xmlRegistrarEdificio);
      codigo = await this.utilidades.alertEspecifica('Registro Edificio ', data);
      if (codigo === '1028') {
        this.myform.reset();
        let listaEdificios: any[];
        listaEdificios = await this.dataservice.getListaEdificios();
        if ( listaEdificios.length === 1) {
            this.dataUser.setEdificioActual(listaEdificios[0]);
            this.route.navigate(['/principal', listaEdificios[0]]);
        } else {
          this.route.navigate(['/edificio']);
        }
      }
    }
  }
}
