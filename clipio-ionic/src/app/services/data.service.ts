import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { DataUserService } from 'src/app/services/data-user.service';
import { Observable } from 'rxjs';
import { RaspberryService } from './raspberry.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  datosPost: Observable<any>;

  /* Email y mac estaticos para todas las peticiones */
  email = 'danielfer@unicauca.edu.co';
  mac = '02:00:00:00:00:00';
  urlServidor = 'http://10.0.0.20:8080';
  //email = null;
  //mac = null;
  //urlServidor = null;

  constructor(
    private http: HttpClient,
    private dataUserService: DataUserService,
    private requestRaspberryService: RaspberryService
  ) {
  }

  ngOnInit() {
    /*this.email = this.dataUserService.getEmail();
    this.urlServidor = 'http://' + this.dataUserService.getIP() + ':8080';
    this.mac = this.dataUserService.getMAC();*/
  }

  capturarDatosUsuario() {
    this.email = this.dataUserService.getEmail();
    this.urlServidor = 'http://' + this.dataUserService.getIP() + ':8080';
    this.mac = this.dataUserService.getMAC();
  }

  async getVerificarUsuario(email: string, pass: string) {
    let resultado = false;
    let json;
    const url = this.getURLInicioSesion(email, pass);
    const result = await this.http.get(url, { responseType: 'text' }).toPromise();
    const parseString = require('xml2js').parseString;
    parseString(result, function (err, result) {
      if (err) {
        alert('error');
      } else {
        json = result;
      }
    });
    if (json.Objects.Object[0].InfoItem[0].value[0]._ === '1028') {
      resultado = true;
    }
    return resultado;
  }

  getURLInicioSesion(email: string, pass: string) {
    pass = encodeURIComponent(pass);
    const url = this.urlServidor + '/ValidarUsuarioApp?email=' + email
      + '&user_name=' + email + '&mac=' + this.mac +
      '&name_app=Clipio&password=' + pass;
    return url;
  }

  /* Obtiene los nombres de los elementos de una habitacion. Retorna: [nombreHabitacion1, nombreHabitacion2,...] */
  async getListaElementosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    const listaElementos = [];
    let nombreElemento;
    /* Obtiene la informacion de toda la habitacion */
    const elementosHabitacion = await this.getElementosPorHabitacion(nombreEdificio, nombreHabitacion);
    if (elementosHabitacion) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < elementosHabitacion.length; i++) {
        console.log(elementosHabitacion);
        if (elementosHabitacion[i].InfoItem[0].value[0]._) {
          /* Obtiene el nombre del elemento */
          nombreElemento = elementosHabitacion[i].InfoItem[0].value[0]._;
          listaElementos.push(nombreElemento);
        }
      }
    }
    this.dataUserService.setListaElementosPorHabitacion(listaElementos);
    //return listaElementos;
  }
  /* Obtiene el nombre de todos los edificios */
  async getListaEdificios() {
    const listaEdificios = [];    /* Se crea una lista que solamente contendra los nombres de los edificios */
    await this.getEdificios()
      .then(infoEdificios => {
        if (infoEdificios.length !== 0) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < infoEdificios.length; i++) {
            listaEdificios.push(infoEdificios[i].InfoItem[0].value[0]._);   // Se agrega el nombre de cada edificio a la lista 
          }
        }
        this.dataUserService.setListaEdificios(listaEdificios);
      });
    // tslint:disable-next-line: prefer-for-of
    /*for (let i = 0; i < infoEdificios.length; i++) {
      listaEdificios.push(infoEdificios[i].InfoItem[0].value[0]._);   // Se agrega el nombre de cada edificio a la lista 
    }
    this.dataUserService.setListaEdificios(listaEdificios);
    //return listaEdificios;*/
  }

  /*Obtiene el json de todas las habitaciones*/
  async getListaHabitaciones(nombreEdificio: string) {
    const infoEdificio =  await this.getEdificio(nombreEdificio);
    const habitaciones = [];
    if (infoEdificio) {
      /* Se recorre el edificio para buscar las habitaciones */
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < infoEdificio.length; i++) {
        if (infoEdificio[i].$.name === 'house_parts') {
          if (infoEdificio[i].InfoItem.length) {
            // tslint:disable-next-line: prefer-for-of
            for (let j = 0; j < infoEdificio[i].InfoItem.length; j++) {
              let auxjs = [];
              auxjs.push(infoEdificio[i].InfoItem[j].InfoItem[0].value[0]._);
              auxjs.push(infoEdificio[i].InfoItem[j].InfoItem[1].value[0]._);
              console.log('lista habitacion: ', auxjs);
              habitaciones.push(auxjs);
            }
          }
        }
      }
    }
    this.dataUserService.setListaHabitaciones(habitaciones);
    //return habitaciones;
  }
  /* Retorna la informacion de toda una habitacion */
  async getElementosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let elementosHabitacion = [];
    const habitaciones = await this.getHabitaciones(nombreEdificio);
    /* Se recorre la informacion de todas las habitaciones */
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < habitaciones.length; i++) {
      if (habitaciones[i].InfoItem[0].value[0]._ === nombreHabitacion) {
        /* Se recorre cada InfoItem de la habitacion hasta encontrar uno que contenga Things */
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < habitaciones[i].InfoItem.length; j++) {
          if (habitaciones[i].InfoItem[j].$.name === 'Things') {
            /* Se añade el elemento que contiene las Things */
            elementosHabitacion = habitaciones[i].InfoItem[j].InfoItem;
            break;
          }
        }
        break;
      }
    }
    return elementosHabitacion;
  }
  async getDispositivosElemento(nombreEdificio: string, nombreHabitacion: string , nombreElemento) {
    let dispositivosElemento = [];
    const elementos = await this.getElementosPorHabitacion(nombreEdificio, nombreHabitacion);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].InfoItem[0].value[0]._ === nombreElemento) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < elementos[i].InfoItem.length; j++ ) {
          if (elementos[i].InfoItem[j].$.name === 'Objetos') {
            dispositivosElemento = elementos[i].InfoItem[j].InfoItem;
          }
        }
      }
    }
    return dispositivosElemento;
  }
  async getData(data) {
    const url = this.urlServidor + "/RegistrarBuilding?email=" + this.email + "&mac=" + this.mac + "&data=" + data;
    let result = await this.http.get(url).toPromise();
    return result
  }
  /* Retorna los dispositivos de una habitacion */
  async getDispositivosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let dispositivosHabitacion = [];
    const habitaciones = await this.getHabitaciones(nombreEdificio);
    /* Se recorre la informacion de todas las habitaciones */
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < habitaciones.length; i++) {
      if (habitaciones[i].InfoItem[0].value[0]._ === nombreHabitacion) {
        /* Se recorre cada InfoItem de la habitacion hasta encontrar uno que contenga Objetos */
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < habitaciones[i].InfoItem.length; j++) {
          if (habitaciones[i].InfoItem[j].$.name === 'Objetos') {
            /* Se añade el elemento que contiene las Things */
            dispositivosHabitacion = habitaciones[i].InfoItem[j].InfoItem;
            break;
          }
        }
        break;
      }
    }
    return dispositivosHabitacion;
  }

  /* Obtiene la informacion de todas las habitaciones */
  async getHabitaciones(nombreEdificio: string) {
    const infoEdificio = await this.getEdificio(nombreEdificio);
    const habitaciones = [];
    /* Se recorre el edificio para buscar las habitaciones */
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificio.length; i++) {
      if (infoEdificio[i].$.name === 'house_parts') {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < infoEdificio[i].InfoItem.length; j++) {
          habitaciones.push(infoEdificio[i].InfoItem[j]);
        }
      }
    }
    return habitaciones;
  }

  /*Obtiene la informacion de un solo edificio. Params: xml con la info de todos los edificios,
   nombre del edificio a buscar*/
  async getEdificio(nombreEdificio: string) {
    const infoEdificios = await this.getEdificios();
    let infoEdificioBuscado = [];
      /* Se recorren todos los edificios */
      // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificios.length; i++) {
      /* Se recorre InfoItem para cada edificio */
      if (infoEdificios[i].InfoItem.length) {
            // tslint:disable-next-line: prefer-for-of
            for (let j = 0; j < infoEdificios[i].InfoItem.length; j++) {
              /* Si es el infoItem que contiene el nombre del edificio */
              if (infoEdificios[i].InfoItem[j].$.name === 'name_building') {
                /* Si el nombre del edificio es igual al que entra por parametro */
                alert('aqui');
                if (infoEdificios[i].InfoItem[j].value[0]._ === nombreEdificio) {
                  infoEdificioBuscado = infoEdificios[i].InfoItem; /* Se ecuentra el edificio */
                }
              }
            }
          }
        }
    return infoEdificioBuscado;
    // return edificio;
  }

  /*Obtiene la informacion de todos los edificios*/
  async getEdificios() {
    const edificios = await this.getXMLBuildingEnvironment()
      .then(json => {
        if (json.Objects.Object[0].InfoItem[0].InfoItem) { // Si existen edificios
          const infoEdificios = json.Objects.Object[0].InfoItem[0].InfoItem;    // Se obtiene solamente la lista de edificios
          return infoEdificios;
        } else {
          return [];
        }
      });   // Se obtiene el xml del entorno
    return edificios;
  }

  getURLBuildingEnvironment() {
    const url = this.urlServidor + '/ConsultarObjetosRelated?email=' + this.email + '&mac=' + this.mac;
    return url;
  }
  /* Obtiene el XML BuildingEnviroment y lo retorna como objeto */
  async getXMLBuildingEnvironment() {
    const url = this.getURLBuildingEnvironment(); // Crea la URL para la peticion del XML Building environment
    const data = await this.http.get(url, { responseType: 'text' }).toPromise(); // Hace la peticion
    const xmlBuilding = this.parsear(data); // Parsea a objeto javascript
    return xmlBuilding;
  }

  getXML() {
    let res;
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

  async postRegistrarUsuario(url) {
    let datos = await this.requestRaspberryService.requestRaspberry(url);

    if (datos === null) {
      alert('Error en la consulta: null');
    } else {

    }
  }
  // retorna los estados del datastream
  getEstadoDataStreams(xml) {
    return xml.Objects.Object[0].send_state[0].InfoItem;
  }
  // retorna los dataStreams
  getDataStreams(xml) {
    let dataStreams: [];
    dataStreams = xml.Objects.Object[0].InfoItem;
    dataStreams.shift();
    return  dataStreams;
  }
  getXMLPerfilUsuario() {

    const xml = '<?xml version="1.0" encoding="UTF-8"?><Objects><Object><InfoItem name="Person"><InfoItem name="name_person"><value type="string">Andrea</value></InfoItem><InfoItem name="surname"><value type="string">Pabon</value></InfoItem><InfoItem name="celullar"><value type="string">None</value></InfoItem><InfoItem name="gender"><value type="string">Hombre</value></InfoItem><InfoItem name="date_of_birth"><value type="string">2017-9-18</value></InfoItem><InfoItem name="facebook"><value type="string">None</value></InfoItem><InfoItem name="place_of_birth"><value type="string">Popayan</value></InfoItem><InfoItem name="email"><value type="string">andrea@unicauca.edu.co</value></InfoItem></InfoItem></Object></Objects>';
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let json;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      json = result;
    });
    return json;
  }


  parsear(xml) {
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let json;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      json = result;
    });
    return json;
  }

  async getPerfilUsuario() {

    const url = this.urlServidor + '/ConsultarDatosPersonales?email=' + this.email + '&mac=' + this.mac;
    const data = await this.http.get(url, { responseType: 'text' }).toPromise();
    const usuario = this.parsear(data);

    const datos = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < usuario.Objects.Object[0].InfoItem[0].InfoItem.length; i++) {
      if (usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === undefined
        || usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === ''
        || usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === 'None') {
        datos.push('');
      } else {
        console.log('datos: ', usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._);
        datos.push(usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._);
      }
    }
    return datos;
  }

  getInfoBasicaDispositivo(xml) {
    // Se pobtiene la infromacion basica de la raspberry
    return xml.Objects.Object[0].InfoItem[0].MetaData[0].InfoItem;
  }
  async crearElemento(xml) {
    // ToDo: Mirar que retorna el Servidor PU
    xml = encodeURIComponent(xml);
    let datos = null;
    const url = this.urlServidor + '/RegistrarThing?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();
    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
      }
    });
    return js;
  }
  // asocia el dispositivo con una habitacion o elemento
  async asociarDispositivo(xml) {
    xml = encodeURIComponent(xml);
    let datos = null;
    const url = this.urlServidor + "/RegistrarObject?email=" + this.email + "&mac=" + this.mac + "&data=" + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();
    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
      }
    });
    return js;
  }

  perfil() {
    this.http.get('http://10.0.0.17/RegistroUsuario?email?=andrea@unicauca.edu.co&mac=02:00:00:00:00:00&data', { responseType: 'text'})
      .subscribe(data => {
      });
  }

  async crearECA(xml: string) {
    // ToDo: Mirar que retorna el Servidor PU
    const eca = xml;
    let datos = null;
    xml = encodeURIComponent(xml);
    console.log(xml);
    const url = this.urlServidor + '/RegistrarPreferencia?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();


    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        console.log('Registrada preferencia');
        js = result;
        // Actualizar lista de Preferencias
      }
    });
    this.listarECAs();

    return js;
  }

  async consultarObjetosRelacionados() {
    // ToDo: Mirar que retorna el Servidor PU
    const url = this.urlServidor + '/ConsultarObjetosRelated?email=' + this.email + '&mac=' + this.mac;
    await this.http.get(url, { responseType: 'text' })
      .subscribe(data => {
        //alert(data);
      }, error => {
        alert(error);
      });
  }

  async modificarECA(xml: string) {
    xml = encodeURIComponent(xml);
    // ToDo: Mirar que retorna el Servidor PU
    // const url =  this.urlServidor + "ModificarPreferencia?email=" + email + "&mac=" + mac + "&data=" + xml;
    const url = this.urlServidor + '/ModificarPreferencia?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    await this.http.get(url, { responseType: 'text' })
      .subscribe(data => {

      }, error => {
        alert(error);
      });

    // Actualizar lista de Preferencias
    this.listarECAs();
  }

  async listarECAs() {
    // ToDo: Traer xml del servidor

    const lista = [];

    const url = this.urlServidor + '/ConsultarPreferencias?email=' + this.email + '&mac=' + this.mac;
    await this.http.get(url, { responseType: 'text' })
      .subscribe(data => {

        // console.log(data);
        // const xml = '<?xml version=\'1.0\' encoding=\'utf-8\'?> <Objects> <Object> <InfoItem name="Preferencias"> <InfoItem name="preferencia"> <InfoItem name="name_preference"> <value type="string">apagarriego</value> </InfoItem> <InfoItem name="state_preference"> <value type="string">on</value> </InfoItem> <InfoItem name="osid_object_event"> <value type="string">708637323</value> </InfoItem> <InfoItem name="ip_event_object"> <value type="string">192.168.123.100</value> </InfoItem> <InfoItem name="name_event_object"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="id_event_resource"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="name_event_resource"> <value type="string" /> </InfoItem> <InfoItem name="comparator_condition"> <value type="string">menor</value> </InfoItem> <InfoItem name="variable_condition"> <value type="string">29</value> </InfoItem> <InfoItem name="type_variable_condition"> <value type="string">float</value> </InfoItem> <InfoItem name="unit_condition"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_condition"> <value type="string">hace frio</value> </InfoItem> <InfoItem name="osid_object_action"> <value type="string">1931642039</value> </InfoItem> <InfoItem name="ip_action_object"> <value type="string">192.168.123.101</value> </InfoItem> <InfoItem name="name_action_object"> <value type="string">Regulador de Humedad en Planta</value> </InfoItem> <InfoItem name="id_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="name_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="comparator_action"> <value type="string">igual</value> </InfoItem> <InfoItem name="variable_action"> <value type="string">0</value> </InfoItem> <InfoItem name="type_variable_action"> <value type="string">bool</value> </InfoItem> <InfoItem name="unit_action"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_action"> <value type="string">apagar riego</value> </InfoItem> </InfoItem> <InfoItem name="preferencia"> <InfoItem name="name_preference"> <value type="string">encenderriego</value> </InfoItem> <InfoItem name="state_preference"> <value type="string">on</value> </InfoItem> <InfoItem name="osid_object_event"> <value type="string">708637323</value> </InfoItem> <InfoItem name="ip_event_object"> <value type="string">192.168.123.100</value> </InfoItem> <InfoItem name="name_event_object"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="id_event_resource"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="name_event_resource"> <value type="string" /> </InfoItem> <InfoItem name="comparator_condition"> <value type="string">mayor</value> </InfoItem> <InfoItem name="variable_condition"> <value type="string">29</value> </InfoItem> <InfoItem name="type_variable_condition"> <value type="string">float</value> </InfoItem> <InfoItem name="unit_condition"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_condition"> <value type="string">hace calor</value> </InfoItem> <InfoItem name="osid_object_action"> <value type="string">1931642039</value> </InfoItem> <InfoItem name="ip_action_object"> <value type="string">192.168.123.101</value> </InfoItem> <InfoItem name="name_action_object"> <value type="string">Regulador de Humedad en Planta</value> </InfoItem> <InfoItem name="id_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="name_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="comparator_action"> <value type="string">igual</value> </InfoItem> <InfoItem name="variable_action"> <value type="string">1</value> </InfoItem> <InfoItem name="type_variable_action"> <value type="string">bool</value> </InfoItem> <InfoItem name="unit_action"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_action"> <value type="string">encender riego</value> </InfoItem> </InfoItem> </InfoItem> </Object> </Objects>';

        let js;
        const parseString = require('xml2js').parseString;
        parseString(data, function (err, result) {
          js = result;
        });

        console.log(js);
        if (js.Objects.Object[0].InfoItem[0].$.name === 'Preferencias') {
          // json.Objects.Object[0].InfoItem--->Preferencias
          let jsObject = js.Objects.Object[0].InfoItem[0].InfoItem;
          for (let i = 0; i < jsObject.length; i++) {
            let jsonAux = {};
            console.log(jsObject[i]);
            jsonAux['nombreECA'] = jsObject[i].InfoItem[0].value[0]._;
            jsonAux['estadoECA'] = jsObject[i].InfoItem[1].value[0]._;

            jsonAux['idEventECA'] = jsObject[i].InfoItem[2].value[0]._;
            jsonAux['ipEventECA'] = jsObject[i].InfoItem[3].value[0]._;
            jsonAux['nombreEventObjeto'] = jsObject[i].InfoItem[4].value[0]._;
            jsonAux['datastreamEvent'] = jsObject[i].InfoItem[5].value[0]._;
            jsonAux['nombreEventoRecurso'] = jsObject[i].InfoItem[6].value[0]._;
            jsonAux['comparadorEvento'] = jsObject[i].InfoItem[7].value[0]._;
            jsonAux['valorEvento'] = jsObject[i].InfoItem[8].value[0]._;
            jsonAux['dsFormatEvento'] = jsObject[i].InfoItem[9].value[0]._;
            jsonAux['unitCondition'] = jsObject[i].InfoItem[10].value[0]._;
            jsonAux['significadoEvento'] = jsObject[i].InfoItem[11].value[0]._;

            jsonAux['idActionECA'] = jsObject[i].InfoItem[12].value[0]._;
            jsonAux['ipActionECA'] = jsObject[i].InfoItem[13].value[0]._;
            jsonAux['nombreActionObjeto'] = jsObject[i].InfoItem[14].value[0]._;
            jsonAux['datastreamAction'] = jsObject[i].InfoItem[15].value[0]._;
            jsonAux['nombreActionRecurso'] = jsObject[i].InfoItem[16].value[0]._;
            jsonAux['comparadorAction'] = jsObject[i].InfoItem[17].value[0]._;
            jsonAux['valorAccion'] = jsObject[i].InfoItem[18].value[0]._;
            jsonAux['dsFormatAccion'] = jsObject[i].InfoItem[19].value[0]._;
            jsonAux['unitAction'] = jsObject[i].InfoItem[20].value[0]._;
            jsonAux['significadoAccion'] = jsObject[i].InfoItem[21].value[0]._;

            lista.push(jsonAux);
          }
        } else {
          console.log('No hay ECAs');
        }

        console.log('Actualizando Lista ECAS...');

        this.dataUserService.setListaECA(lista);
      }, error => {
        alert(error);
      }
      );
  }
  async registrarUsuario(xml: string, email) {
    // ToDo: Mirar que retorna el Servidor PU
    xml = encodeURIComponent(xml);
    let respuesta;
    let datos = null;
    console.log(xml);
    const url = this.urlServidor + '/RegistroUsuario?email=' + email + '&mac=' + this.mac + '&data=' + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();
    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
      }
    });
    console.log('Registrado Usuario');

    return js;
  }

  async modificarPerfil(xml: string, email: string) {
    // ToDo: Mirar que retorna el Servidor PU
    xml = encodeURIComponent(xml);
    let respuesta;
    let datos = null;
    console.log(xml);
    const url = this.urlServidor + '/ModificarDatosPersonales?email=' + email + '&mac=' + this.mac + '&data=' + xml;
    console.log('url', url);
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();

    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
      }
    });
    console.log('Modificado Usuario');
    return js;
  }

  async registrarEdificio(xml: string) {
    // ToDo: Mirar que retorna el Servidor PU
    xml = encodeURIComponent(xml);
    let datos = null;
    const url = this.urlServidor + '/RegistrarBuilding?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();
    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
      }
    });

    return js;

  }
}
