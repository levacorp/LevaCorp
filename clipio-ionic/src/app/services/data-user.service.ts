/* GUARDA TODA LA INFORMACION DEL ENTORNO */
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  private ip: string;
  private mac: string;
  nombreEdificioActual: string;
  nombreHabitacionActual: string;

  datosUsuario = [];
  listaECA = [];
  listaHabitaciones = [];
  listaEdificios = [];
  elementosPorHabitacion = [];

  constructor() { }

  getIp() {
    return this.ip;
  }

  setIP(ip: string) {
    this.ip = ip;
  }

  getDatosUsuario() {
    return this.datosUsuario;
  }

  setDatosUsuario(lista) {
    this.datosUsuario = lista;
  }

  getListaElementosPorHabitacion() {
    return this.elementosPorHabitacion;
  }

  setListaElementosPorHabitacion(lista) {
    this.elementosPorHabitacion = lista;
  }

  getListaEdificios() {
    return this.listaEdificios;
  }

  setListaEdificios(lista) {
    this.listaEdificios = lista;
  }

  getListaHabitaciones() {
    return this.listaHabitaciones;
  }

  setListaHabitaciones(lista) {
    this.listaHabitaciones = lista;
  }

  setListaECA(lista) {
    this.listaECA = lista;
  }
  getListaECA() {
    return this.listaECA;
  }

  getECA(nombre: string) {
    for (let i = 0; i < this.listaECA.length; i++) {
      if (this.listaECA[i].nombreECA === nombre) {
        return this.listaECA[i];
      }
    }
    return null;
  }
}
