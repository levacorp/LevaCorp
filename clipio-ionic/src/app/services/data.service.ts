import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  /*Obtiene el json de todos los elementos*/
  getElementos() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getInformacionEdificio() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  /*Obtiene el json de todas las habitaciones*/
  getHabitaciones(nombreEdificio: string) {
    const infoEdificio = this.getEdificio(this.getEdificios(), nombreEdificio);
    console.log(infoEdificio);
    const habitaciones = [];
    /* Se recorre el edificio para buscar las habitaciones */
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificio.length; i++) {
      if (infoEdificio[i].$.name === 'house_parts') {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < infoEdificio[i].InfoItem.length; j++) {
          habitaciones.push(infoEdificio[i].InfoItem[j].InfoItem[0].value[0]._);
        }
      }
    }
    return habitaciones;
  }

  getHouseParts(infoEdificio) {
    const houseParts = [];
    // tslint:disable-next-line: prefer-for-of
    console.log(infoEdificio);
    // console.log('nombre:', infoEdificio.InfoItem.name);
  }

  /*Obtiene la informacion de un solo edificio. Params: xml con la info de todos los edificios, nombre del edificio a buscar*/
  getEdificio(infoEdificios, nombreEdificio: string) {
    let infoEdificioBuscado = [];
    /* Se recorren todos los edificios */
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificios.length; i++) {
      /* Se recorre InfoItem para cada edificio */
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < infoEdificios[i].InfoItem.length; j++) {
        /* Si es el infoItem que contiene el nombre del edificio */
        if (infoEdificios[i].InfoItem[j].$.name === 'name_building') {
          /* Si el nombre del edificio es igual al que entra por parametro */
          if (infoEdificios[i].InfoItem[j].value[0]._ === nombreEdificio) {
            infoEdificioBuscado = infoEdificios[i].InfoItem; /* Se ecuentra el edificio */
          }
        }
      }
    }
    return infoEdificioBuscado;
  }

  /*Obtiene la informacion de todos los edificios*/
  getEdificios() {
    let json = this.getXMLBuildingEnviroment();   /*Se obtiene el xml del entorno*/
    const infoEdificios = json.Objects.Object[0].InfoItem[0].InfoItem;    /*Se obtiene solamente la lista de edificios*/
    return infoEdificios;
  }
  /* Obtiene el nombre de todos los edificios */
  getListaEdificios() {
    const listaEdificios = [];    /* Se crea una lista que solamente contendra los nombres de los edificios */
    const infoEdificios = this.getEdificios();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificios.length; i++) {
      listaEdificios.push(infoEdificios[i].InfoItem[0].value[0]._);   /* Se agrega el nombre de cada edificio a la lista */
    }
    return listaEdificios;
  }
  /* Obtiene el XML BuildingEnviroment y lo retorna como objeto */
  getXMLBuildingEnviroment() {
    let json;
    // tslint:disable-next-line: max-line-length
    const xml = '<?xml version="1.0" encoding="ISO-8859-1"?><Objects><Object><InfoItem name="BuildingEnvironment"><InfoItem name="Building"><InfoItem name="name_building"><value type="string">casa</value></InfoItem><InfoItem name="flats_building"><value type="int">1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.103</value></InfoItem><InfoItem name="id_object"><value type="string">1650241840</value></InfoItem><InfoItem name="name_object"><value type="string">NodoCoordinador</value></InfoItem></InfoItem></InfoItem><InfoItem name="house_parts"><InfoItem name="part"><InfoItem name="name_part"><value type="string">cocina</value></InfoItem><InfoItem name="type_part"><value type="string">Kitchen</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.107</value></InfoItem><InfoItem name="id_object"><value type="string">1931642039</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Humedad en Planta</value></InfoItem></InfoItem></InfoItem></InfoItem><InfoItem name="part"><InfoItem name="name_part"><value type="string">cuarto Santiago</value></InfoItem><InfoItem name="type_part"><value type="string">Bedroom</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.105</value></InfoItem><InfoItem name="id_object"><value type="string">78091938</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Luz</value></InfoItem></InfoItem></InfoItem></InfoItem><InfoItem name="part"><InfoItem name="name_part"><value type="string">sala</value></InfoItem><InfoItem name="type_part"><value type="string">LivingRoom</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.106</value></InfoItem><InfoItem name="id_object"><value type="string">708637323</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Temperatura</value></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></Object></Objects>';
    const parseString = require('xml2js').parseString;

    parseString(xml, function (err, result) {
      if (err) {
        alert('error');
      } else {
        json = result;
      }

    });
    return json;
  }

  getXML() {

    console.log(xml2js);
    console.log(xml2js.parseString);

    let res;

    // setting the explicitArray option prevents an array structure
    // where every node/element is always wrapped inside an array
    // set it to true, and see for yourself what changes
    xml2js.parseString(this.http.get('/assets/dispositivo.xml'), { explicitArray: false }, (error, result) => {

      if (error) {
        alert('error');
        console.log('error');


      } else {
        res = result;
      }

    });

    console.log(res);


    return res;
  }
  getEstadoDataStreams() {
    // tslint:disable-next-line: max-line-length
    const xml = '<Objects><Object><id>708637323</id><send_state><InfoItem name="calefactor"><value type="bool">1</value></InfoItem><InfoItem name="temperatura"><value type="float">24.7048950195</value></InfoItem><InfoItem name="ventilador"><value type="bool">0</value></InfoItem><InfoItem name="Reloj"><value type="string">27/07/2019 18:44</value></InfoItem><InfoItem name="proximidad"><value type="float">0</value></InfoItem></send_state></Object></Objects>';
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let jason;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      jason = result;
    });
    return jason.Objects.Object[0].send_state[0].InfoItem;
  }
  getInfoBasicaDispositivo() {
    // tslint:disable-next-line: max-line-length
    const xml = '<Objects> <Object> <id>708637323</id> <InfoItem name="708637323"> <MetaData> <InfoItem name="id"> <value type="string">708637323</value> </InfoItem> <InfoItem name="title"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="description"> <value type="string"> Es un servicio que permite mantener la temperatura deseada por el usuario en el entorno de la sala de estar. Cuenta con un sensor de temperatura, un calefactor para incrementarla y un ventilador para decrementarla. </value> </InfoItem> <InfoItem name="lon"> <value type="string">-76.5981505</value> </InfoItem> <InfoItem name="lat"> <value type="string">2.4471309</value> </InfoItem> <InfoItem name="ele"> <value type="string">None</value> </InfoItem> <InfoItem name="name"> <value type="string">None</value> </InfoItem> <InfoItem name="domain"> <value type="string">0</value> </InfoItem> <InfoItem name="created"> <value type="string">07/07/2015 22:03:46</value> </InfoItem> <InfoItem name="creator"> <value type="string">https://personal.xively.com/users/manzamb</value> </InfoItem> <InfoItem name="feed"> <value type="string">https://api.xively.com/v2/feeds/708637323.json</value> </InfoItem> <InfoItem name="private"> <value type="string">false</value> </InfoItem> <InfoItem name="status"> <value type="string">0</value> </InfoItem> <InfoItem name="title"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="updated"> <value type="string">06/16/2017 00:52:30</value> </InfoItem> <InfoItem name="version"> <value type="string">None</value> </InfoItem> <InfoItem name="website"> <value type="string">None</value> </InfoItem> <InfoItem name="tags"> <value type="string">Temperature Regulation Functionality</value> <value type="string">Entidad Sala</value> <value type="string">Temperature Regulator</value> <value type="string">Living Room</value> <value type="string">Entity Living Room</value> <value type="string">Funcionalidad de regulacion de temperatura</value> </InfoItem> <InfoItem name="ip_object"> <value type="string">192.168.127.16</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="calefactor"> <MetaData> <InfoItem name="label"> <value type="string">bool</value> </InfoItem> <InfoItem name="symbol"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">calefactor</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">actuador</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">1.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">bool</value> </InfoItem> <InfoItem name="tags"> <value type="string">Entity Living Room</value> <value type="string">calefactor</value> <value type="string">Entidad Sala</value> <value type="string">Heater</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Actuador</value> <value type="string">Actuator</value> <value type="string">Funcionalidad de medida de encedido o apagado</value> <value type="string">Feature Temperature</value> <value type="string">On OFF functionality</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="Reloj"> <MetaData> <InfoItem name="label"> <value type="string">T</value> </InfoItem> <InfoItem name="symbol"> <value type="string">T</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">Reloj</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">None</value> </InfoItem> <InfoItem name="max_value"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">string</value> </InfoItem> <InfoItem name="tags"> <value type="string"> Funcionalidad de notificación de hora y fecha actual </value> <value type="string">Time Sensor</value> <value type="string">Sensor</value> <value type="string">Feature Time</value> <value type="string">sensor de hora y fecha</value> <value type="string">time Notification Functionality</value> <value type="string">Caracteristica Tiempo</value> <value type="string">Entity Time</value> <value type="string">Entidad Tiempo</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="temperatura"> <MetaData> <InfoItem name="label"> <value type="string">Centigrados</value> </InfoItem> <InfoItem name="symbol"> <value type="string">°C</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">-192.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">4095.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">float</value> </InfoItem> <InfoItem name="tags"> <value type="string">Entity Living Room</value> <value type="string"> Funcionalidad de notificacion de medida de temperatura </value> <value type="string">Entidad Sala</value> <value type="string">Sensor</value> <value type="string">Temperature Measurement Notification Functionality</value> <value type="string">Sensor de temperatura</value> <value type="string">Temperature Sensor</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Feature Temperature</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="proximidad"> <MetaData> <InfoItem name="label"> <value type="string">Personas</value> </InfoItem> <InfoItem name="symbol"> <value type="string">P</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">proximidad</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">float</value> </InfoItem> <InfoItem name="tags"> <value type="string">user presence Notification Functionality</value> <value type="string">Entity Living Room</value> <value type="string">User Sensor</value> <value type="string">Caracteristica Usuario</value> <value type="string">Feature User</value> <value type="string"> Funcionalidad de notificación de presencia de usuario </value> <value type="string">Entidad Sala</value> <value type="string">Sensor</value> <value type="string">sensor de presencia de usuario</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="ventilador"> <MetaData> <InfoItem name="label"> <value type="string">bool</value> </InfoItem> <InfoItem name="symbol"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">ventilador</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">actuador</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">1.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">bool</value> </InfoItem> <InfoItem name="tags"> <value type="string">Ventilator</value> <value type="string">Entity Living Room</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Actuador</value> <value type="string">Entidad Sala</value> <value type="string">Ventilador</value> <value type="string">Actuator</value> <value type="string">Feature Temperature</value> <value type="string">Fan</value> <value type="string">On Off Functionality</value> <value type="string">Funcinalidad de encendido apagado</value> </InfoItem> </MetaData> </InfoItem> </Object> </Objects>';
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let jason;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      jason = result;
    });
    // json.Objects.Object[0].InfoItem--->Informacion general del dispositivo + informacion de datastreams
    return jason.Objects.Object[0].InfoItem[0].MetaData[0].InfoItem;
  }


  crearECA(xml: string) {
    // ToDo: Mirar que retorna el Servidor PU
    // const url =  this.urlServidor + "RegistrarPreferencia?email=" + email + "&mac=" + mac + "&data=" + xml;
  }
}
