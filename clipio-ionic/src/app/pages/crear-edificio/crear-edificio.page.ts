import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';

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
      console.log(codigo);

      if (codigo === '1028') {
        this.myform.reset();
        await this.dataservice.getListaEdificios();
        this.route.navigate(['/edificio']);
      }
      /*await this.dataservice.registrarEdificio(this.xmlRegistrarEdificio)
      .then(async data => {
        codigo = await this.utilidades.alertEspecifica( "Registro Edificio ", data);
        console.log(codigo);

        if (codigo === '1028') {
          this.myform.reset();
          await this.dataservice.getListaEdificios();
          this.route.navigate(['/edificio']);
        }
      });*/
    }
  }
}
