import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.page.html',
  styleUrls: ['./crear-habitacion.page.scss'],
})
export class CrearHabitacionPage implements OnInit {

  formHabitacion: FormGroup;
  edificio = null;
  ambiente = null;
  piso = null;
  xmlRegistrarHabitacion = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder,
              private generarXML: GenerateXMLService, private dataService: DataService , private utilidades: UtilitiesService
    ) {
  }

  ngOnInit() {
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente');
    this.formHabitacion = this.formBuilder.group({
      nombre: ['', Validators.required],
      piso: ['', Validators.required] });
  }

  // metodo que guarda y envia el formulario para crear el xml para registrar un nueva habitacion
 async saveData() {
    // obtiene el xml de la habitacion
    this.xmlRegistrarHabitacion = this.generarXML.crearHabitacion(this.edificio, this.ambiente, this.formHabitacion.get('piso').value ,
                this.formHabitacion.get('nombre').value);
    let codigo;
    // cuando el form sea valido
    if (this.formHabitacion.valid) {
      // se registra la habitacion
      await this.dataService.registrarEdificio(this.xmlRegistrarHabitacion)
        .then(async data => {
          codigo = await this.utilidades.alertEspecifica( 'Creacion de habitacion', data);
          if (codigo === '1028') {
            // se resetea el formulario
            this.formHabitacion.reset();
          }
        });
      // retorna a las habitciones del edificio
      this.router.navigate(['informacion-edificio', this.edificio]);
    }
  }
}
