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
}
