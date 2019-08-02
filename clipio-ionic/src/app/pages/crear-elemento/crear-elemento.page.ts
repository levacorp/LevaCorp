import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.page.html',
  styleUrls: ['./crear-elemento.page.scss'],
})
export class CrearElementoPage implements OnInit {
  public formElemento: FormGroup;
  argumento = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder,
              private dataService: DataService) {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('elemento');
    this.formElemento = formBuilder.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required],
    score: [''] ,
    tipoViva: this.formBuilder.array([])
  });
}
esviva()
{
  let tipoViva = this.formElemento.get('viva') as FormArray;
  tipoViva.push(this.camposExtra());
}
camposExtra() {
    return this.formBuilder.group({
    viva: ['', Validators.required],
    especie: ['', Validators.required],
    comida: ['', Validators.required],
  });
}
  ngOnInit() {
  }
  saveData() {
    this.dataService.crearElemento(this.formElemento.value);
    this.router.navigate(['elementos-por-habitacion', this.argumento]);
  }

}
