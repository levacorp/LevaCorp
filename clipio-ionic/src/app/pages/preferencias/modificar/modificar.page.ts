import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/services/data-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { DataService } from 'src/app/services/data.service';

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
    public formBuilder: FormBuilder, private xmlService: GenerateXMLService, private dataService: DataService) {

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

    const xmlModificacion = this.xmlService.crearECA({
      /* Informacion General del ECA */
      nombreECA: this.modificarECAForm.get('nombreECA').value,
      estadoECA: this.ECA.estadoECA,
    }, {
      /* Informacion evento del ECA */
      idDisp: this.ECA.idEventECA,
      ipDisp: this.ECA.ipEventECA,
      nombreDispositivo: this.ECA.nombreEventObjeto,
      datastream: this.ECA.datastreamEvent,
    }, {
      /* Informacion condicion del ECA */
      comparador: this.modificarECAForm.get('comparadorEvento').value,
      valor: this.modificarECAForm.get('valorEvento').value,
      dsFormat: this.ECA.dsFormatEvento,
      significado: this.modificarECAForm.get('significadoEvento').value,
    }, {
      /* Informacion accion del ECA */
      idDisp: this.ECA.idActionECA,
      ipDisp: this.ECA.ipActionECA,
      nombreDispositivo: this.ECA.nombreActionObjeto,
      datastream: this.ECA.datastreamAction,
      comparador: this.ECA.comparadorAction,
      valor: this.modificarECAForm.get('valorAccion').value,
      dsFormat: this.ECA.dsFormatAccion,
      significado: this.modificarECAForm.get('significadoAccion').value,
    });

    this.dataService.modificarECA(xmlModificacion);
  }

}
