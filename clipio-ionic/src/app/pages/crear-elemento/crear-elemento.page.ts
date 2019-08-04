import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.page.html',
  styleUrls: ['./crear-elemento.page.scss'],
})
export class CrearElementoPage implements OnInit {
  formElemento: FormGroup;
  valorInialScore = 0;
  edificio = null;
  habitacion = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder,
              private dataService: DataService , private generateXml: GenerateXMLService) {}

  ngOnInit() {
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.habitacion = this.activatedRoute.snapshot.paramMap.get('habitacion');
    this.formElemento = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required],
    score: [''] ,
    tipoViva: this.formBuilder.array([])
  });
  }

  tipoElemento(event) {
    const tipoEscogido = event.detail.value;
    if ( tipoEscogido === 'vivo') {
      const tipoViva = this.formElemento.get('tipoViva') as FormArray;
      tipoViva.push(this.camposTipoViva());
    } else {
      this.removerCamposTipoViva();
    }
  }
  camposTipoViva() {
      return this.formBuilder.group({
      viva: ['', Validators.required],
      especie: ['', Validators.required],
      comida: ['', Validators.required],
    });
  }

  get tipoViva() {
    return this.formElemento.get('tipoViva') as FormArray;
  }

  removerCamposTipoViva() {
    const tipoViva = this.formElemento.get('tipoViva') as FormArray;
    if (tipoViva.value.length !== 0) {
      tipoViva.removeAt(0);
    }
  }
  crearElemento() {
    if (this.formElemento.get('tipo').value === 'vivo') {
      this.generateXml.crearLivingThing(this.edificio, this.habitacion , this.formElemento.value);
    } else {
      this.generateXml.crearNotLivingThing(this.edificio, this.habitacion , this.formElemento.value);
    }
    this.router.navigate(['elementos-por-habitacion', this.edificio , this.habitacion]);
  }

}
