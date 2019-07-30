import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.page.html',
  styleUrls: ['./crear-elemento.page.scss'],
})
export class CrearElementoPage implements OnInit {
  public myForm: FormGroup;
  argumento = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder) {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('elemento');
    this.myForm = formBuilder.group({
    nombre: ['', Validators.required],
    tipo: [''],
    tipoViva: [''],
    especie: ['', Validators.required],
    comida: ['', Validators.required],
  });
}
  ngOnInit() {
  }
  saveData() {
    console.log(this.myForm.value);
    this.router.navigate(['elementos-por-habitacion']);
  }

}
