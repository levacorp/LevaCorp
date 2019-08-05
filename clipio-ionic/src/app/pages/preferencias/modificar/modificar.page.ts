import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/services/data-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  nombreECA = null;
  ECA = null;

  modificarECAForm: FormGroup;

  constructor(private dataUserService: DataUserService, private router: Router, private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) {

    this.modificarECAForm = this.formBuilder.group({
      nombreECA: ['', Validators.required],
      significadoEvento: ['', Validators.required],
      significadoAccion: ['', Validators.required],
      comparadorEvento: ['', Validators.required],
      valorEvento: ['', Validators.required],
      valorAccion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.nombreECA = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.ECA = this.dataUserService.getECA(this.nombreECA);

    /* Inicializar con los valores por defecto */
    this.modificarECAForm.get('nombreECA').setValue(this.ECA.nombreECA);
    this.modificarECAForm.get('significadoEvento').setValue(this.ECA.significadoEvento);
    this.modificarECAForm.get('significadoAccion').setValue(this.ECA.significadoAccion);
    this.modificarECAForm.get('comparadorEvento').setValue(this.ECA.comparadorEvento);
    this.modificarECAForm.get('valorEvento').setValue(this.ECA.valorEvento);
    this.modificarECAForm.get('valorAccion').setValue(this.ECA.valorAccion);
  }

  capturarDatos() {
    console.log(this.modificarECAForm.value);
  }

}
