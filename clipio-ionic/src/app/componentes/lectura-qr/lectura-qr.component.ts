import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { RaspberryService } from 'src/app/services/raspberry.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-lectura-qr',
  templateUrl: './lectura-qr.component.html',
  styleUrls: ['./lectura-qr.component.scss'],
})
export class LecturaQrComponent implements OnInit {

  @Input() dirInput: string;
  @Input() tipoInput: number;

  @Output() onReadEvent = new EventEmitter();
  @Output() onReadAction = new EventEmitter();

  dir: any = null;
  tipo: any = null;

  /* Evento */
  nombreDispositivoEvento: any = null;
  ipDispositivoEvento: any = null;
  idDispositivoEvento: any = null;

  /* Accion */
  nombreDispositivoAccion: any = null;
  ipDispositivoAccion: any = null;
  idDispositivoAccion: any = null;

  data: string[][] = [];
  datos: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private nativeHttp: HTTP,
    private plt: Platform, private loadingCtrl: LoadingController, private raspService: RaspberryService) { }

  async ngOnInit() {
    console.log(this.dirInput);
    this.dir = this.dirInput;
    this.tipo = this.tipoInput;
    this.datos = await this.raspService.requestRaspberry(this.dir);

    if (this.datos === null) {
      if (this.tipo === '1') {
        this.onReadEvent.emit(this.datos);
      } else if (this.tipo === '2') {
        this.onReadAction.emit(this.datos);
      }
    } else {
      this.getData();
    }
  }

  getData() {
    let auxFuncionalidad = '';
    let auxDSFormat = '';
    const jsObject = this.datos.Objects.Object[0].InfoItem;

    if (this.tipo === '1') {
      this.idDispositivoEvento = this.datos.Objects.Object[0].id[0];
      this.ipDispositivoEvento = this.dir.substring(7, this.dir.indexOf('/Identificator?osid='));
    } else if (this.tipo === '2') {
      this.idDispositivoAccion = this.datos.Objects.Object[0].id[0];
      this.ipDispositivoAccion = this.dir.substring(7, this.dir.indexOf('/Identificator?osid='));
    }

    for (let i = 0; i < jsObject.length; i++) {
      for (let j = 0; j < jsObject[i].MetaData[0].InfoItem.length; j++) {
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'title') {
          // Se obtiene el nombre del dispositivo
          if (this.tipo === '1') {
            this.nombreDispositivoEvento = jsObject[i].MetaData[0].InfoItem[j].value[0]._;
          } else if (this.tipo === '2') {
            this.nombreDispositivoAccion = jsObject[i].MetaData[0].InfoItem[j].value[0]._;
          }

          // Después de tener el nombre del dispositivo no se necesita más datos, por eso se elimina de la lista de datastreams
          jsObject.splice(i, 1);
        }
        // Para entre los tags el nombre de la funcionalidad
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'tags') {
          // Para sacar el nombre de la funcionalidad de cada datastream
          for (let m = 0; m < jsObject[i].MetaData[0].InfoItem[j].value.length; m++) {

            // Se busca el tag que tenga el nombre "Funcionalidad"
            if ((jsObject[i].MetaData[0].InfoItem[j].value[m]._).includes('Funcionalidad')) {
              auxFuncionalidad = jsObject[i].MetaData[0].InfoItem[j].value[m]._;
            }
          }
        }
        // Para sacar el datastream format y determinar si es actuador o sensor
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'datastream_format') {
          auxDSFormat = jsObject[i].MetaData[0].InfoItem[j].value[0]._;
        }
      }
      this.data.push([jsObject[i].$.name, auxFuncionalidad, auxDSFormat]);
      auxFuncionalidad = '';
      auxDSFormat = '';
    }
  }

  enviarEvento(nombreDatastream, dsFormat) {
    this.onReadEvent.emit({
      nombre: nombreDatastream,
      dsFormat: dsFormat,
      nombreDisp: this.nombreDispositivoEvento,
      idDisp: this.idDispositivoEvento,
      ipDisp: this.ipDispositivoEvento,
    });
  }
  enviarAccion(nombreDatastream, dsFormat) {
    this.onReadAction.emit({
      nombre: nombreDatastream,
      dsFormat: dsFormat,
      nombreDisp: this.nombreDispositivoAccion,
      idDisp: this.idDispositivoAccion,
      ipDisp: this.ipDispositivoAccion,
    });
  }

}
