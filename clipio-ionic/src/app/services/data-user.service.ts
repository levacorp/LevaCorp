import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  listaECA = [];

  constructor() { }

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
