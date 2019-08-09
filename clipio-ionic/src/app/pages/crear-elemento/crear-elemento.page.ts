import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.page.html',
  styleUrls: ['./crear-elemento.page.scss'],
})
export class CrearElementoPage implements OnInit {
  formElemento: FormGroup;
  valorInialScore = 0;
  edificio = null;
  ambiente = null;
  habitacion = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder,
              private generateXml: GenerateXMLService, private dataService: DataService) {}

  ngOnInit() {
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.ambiente =  this.activatedRoute.snapshot.paramMap.get('ambiente');
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.formElemento = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required],
    score: [''] ,
    tipoViva: this.formBuilder.array([]) // atributo que permite agregar o eliminar forms dinamicamente
  });
  }
 // Eliminar o añade campos al form dependiento del tipo de elemento
  tipoElemento(event) {
    const tipoEscogido = event.detail.value;
    if ( tipoEscogido === 'vivo') {
      // Añade los campos extras del elemento vivo
      const tipoViva = this.formElemento.get('tipoViva') as FormArray;
      tipoViva.push(this.camposTipoViva());
    } else {
      // remueve los campos extras en caso de seleccionar el tipo no vivo
      this.removerCamposTipoViva();
    }
  }
  // campos extras del form en caso de que el elemento sea vivo
  camposTipoViva() {
      return this.formBuilder.group({
      viva: ['', Validators.required],
      especie: ['', Validators.required],
      comida: ['', Validators.required],
    });
  }
  // obtiene los campos extras del form cuando el elemento es vivo
  get tipoViva() {
    return this.formElemento.get('tipoViva') as FormArray;
  }
  // quita del form los campos extras para el tipo vivo
  removerCamposTipoViva() {
    const tipoViva = this.formElemento.get('tipoViva') as FormArray;
    if (tipoViva.value.length !== 0) {
      tipoViva.removeAt(0);
    }
  }
  // crea un nuevo elemento
  crearElemento() {
    let xml;
    // si el tipo de elemento es vivo crea un xml tipo vivo
    if (this.formElemento.get('tipo').value === 'vivo') {
      xml = this.generateXml.crearLivingThing(this.edificio, this.ambiente, this.habitacion , this.formElemento.value);
    } else {
      // crea un xml no vivo
      xml = this.generateXml.crearNotLivingThing(this.edificio, this.ambiente, this.habitacion , this.formElemento.value);
    }
    this.dataService.crearElemento(xml);
    // devueve a la habitacion
    this.router.navigate(['elementos-por-habitacion', this.edificio , this.ambiente, this.habitacion]);
  }

}
