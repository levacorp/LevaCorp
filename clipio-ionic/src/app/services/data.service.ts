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
  
  /*Obtiene el json de todas las habitaciones*/
  getHabitaciones() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  getInformacionEdificio(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  /*Obtiene el json de todos los edificios*/

  getEdificios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getInformacionEdificio() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
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

}
