/* GUARDA TODA LA INFORMACION DEL ENTORNO */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  private IP: string;
  private MAC = '02:00:00:00:00:00';
  private Email: string;
  nombreEdificioActual: string;
  nombreHabitacionActual: string;

  datosUsuario = [];
  listaECA = [];
  listaHabitaciones = [];
  listaEdificios = [];
  elementosPorHabitacion = [];

  constructor() { }

  getIP() {
    return this.IP;
  }

  setIP(IP: string) {
    this.IP = IP;
    console.log(this.IP);
  }

  getMAC() {
    return this.MAC;
  }

  setMAC(MAC: string) {
    this.MAC = MAC;
  }

  getEmail() {
    return this.Email;
  }

  setEmail(Email: string) {
    this.Email = Email;
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
