import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';

@Component({
  selector: 'app-crear-edificio',
  templateUrl: './crear-edificio.page.html',
  styleUrls: ['./crear-edificio.page.scss'],
})
export class CrearEdificioPage implements OnInit {
  nombre: null;
  piso: null;

  myform: FormGroup;
  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private generarXML: GenerateXMLService,
    public alertController: AlertController
  ) {
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.required],
      piso: ['', Validators.required]
    });

  }

  ngOnInit() {
  }
  //metodo que guarda y envia el formulario para crear el xml apra registrar un nuevo edificio
  saveData() {
    if (this.myform.valid) {
      this.generarXML.setXMLRegistrarEdificio(this.myform);
      console.log(this.myform.value);
      this.exitosoAlert();
    }
  }
  async exitosoAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'Se ha creado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async fracasoAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'No se ha podido crear el nuevo edificio.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
