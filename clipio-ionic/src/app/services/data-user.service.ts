/* GUARDA TODA LA INFORMACION DEL ENTORNO */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  private ip: string;
  private mac: string;
  listaECA = [];
  listaHabitaciones = [];

  constructor() { }

  getIp() {
    return this.ip;
  }

  setIP(ip: string) {
    this.ip = ip;
  }

  getListaHabitaciones() {
    return this.listaECA;
  }

  setListaHabitaciones(lista) {
    this.listaECA = lista;
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
