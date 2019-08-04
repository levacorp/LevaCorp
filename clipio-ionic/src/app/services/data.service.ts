import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { DataUserService } from 'src/app/services/data-user.service';
import { EnviarXMLService } from './enviar-xml.service';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  datosPost: Observable<any>;
  constructor(private https: HTTP,
    private http: HttpClient,
    private dataUserService: DataUserService,
    ) { }

  getXMLInicioSesion() {
    let json;
    // tslint:disable-next-line: max-line-length
    const xml = '<?xml version="1.0" encoding="UTF-8"?><Objects><Object><InfoItem name="application"><InfoItem name="name_app"><value type="string">Clipio</value></InfoItem><InfoItem name="user_app"><value type="string">julian@gmail.com</value></InfoItem><InfoItem name="password_app"><value type="string">7TRVtu3p9mXTwnEzGdYeIw==</value></InfoItem></InfoItem></Object></Objects>';
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

  /* Obtiene los datos de inicio de sesion. Retorna un arreglo con [{email:email,contraseña:contraseña}] */
  getDatosInicioSesion() {
    const datosInicioSesion = [];
    const infoInicioSesion = this.getXMLInicioSesion().Objects.Object[0].InfoItem[0].InfoItem;
    // tslint:disable-next-line: prefer-for-of
    if (infoInicioSesion.length >= 3) {
      datosInicioSesion.push({ email: infoInicioSesion[1].value[0]._ });
      datosInicioSesion.push({ password: infoInicioSesion[2].value[0]._ });
    }
    this.dataUserService.setDatosUsuario(datosInicioSesion);
    // return datosInicioSesion;
  }

  /* Obtiene los nombres de los elementos de una habitacion. Retorna: [nombreHabitacion1, nombreHabitacion2,...] */
  getListaElementosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    const listaElementos = [];
    let nombreElemento;
    /* Obtiene la informacion de toda la habitacion */
    const elementosHabitacion = this.getElementosPorHabitacion(nombreEdificio, nombreHabitacion);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elementosHabitacion.length; i++) {
      /* Obtiene el nombre del elemento */
      nombreElemento = elementosHabitacion[i].InfoItem[0].InfoItem[0].value[0]._;
      listaElementos.push(nombreElemento);
    }
    this.dataUserService.setListaElementosPorHabitacion(listaElementos);
    //return listaElementos;
  }
  /* Obtiene el nombre de todos los edificios */
  getListaEdificios() {
    const listaEdificios = [];    /* Se crea una lista que solamente contendra los nombres de los edificios */
    const infoEdificios = this.getEdificios();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < infoEdificios.length; i++) {
      listaEdificios.push(infoEdificios[i].InfoItem[0].value[0]._);   /* Se agrega el nombre de cada edificio a la lista */
    }
    this.dataUserService.setListaEdificios(listaEdificios);
    //return listaEdificios;
  }

  /*Obtiene el json de todas las habitaciones*/
  getListaHabitaciones(nombreEdificio: string) {
    const infoEdificio = this.getEdificio(this.getEdificios(), nombreEdificio);
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
    this.dataUserService.setListaHabitaciones(habitaciones);
    //return habitaciones;
  }
  /* Retorna la informacion de toda una habitacion */
  getElementosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let elementosHabitacion = [];
    const habitaciones = this.getHabitaciones(nombreEdificio);
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
  /* Retorna los dispositivos de una habitacion */
  getDispositivosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let dispositivosHabitacion = [];
    const habitaciones = this.getHabitaciones(nombreEdificio);
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

  getInformacionEdificio() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getElementos() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  /* Obtiene la informacion de todas las habitaciones */
  getHabitaciones(nombreEdificio: string) {
    const infoEdificio = this.getEdificio(this.getEdificios(), nombreEdificio);
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

  /* Obtiene el XML BuildingEnviroment y lo retorna como objeto */
  getXMLBuildingEnviroment() {
    let json;
    // tslint:disable-next-line: max-line-length
    const xml = '<?xml version="1.0" encoding="UTF-8"?><Objects><Object><InfoItem name="BuildingEnvironment"><InfoItem name="Building"><InfoItem name="name_building"><value type="string">casa</value></InfoItem><InfoItem name="flats_building"><value type="int">1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">10.0.0.16</value></InfoItem><InfoItem name="id_object"><value type="string">708637323</value></InfoItem><InfoItem name="name_object"><value type="string">NodoCoordinador</value></InfoItem></InfoItem></InfoItem><InfoItem name="house_parts"><InfoItem name="part"><InfoItem name="name_part"><value type="string">cocina</value></InfoItem><InfoItem name="type_part"><value type="string">Kitchen</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">10.0.0.16/</value></InfoItem><InfoItem name="id_object"><value type="string">708637323</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Humedad en Planta</value></InfoItem></InfoItem></InfoItem><InfoItem name="Things"><InfoItem name="Thing"><InfoItem name="Living_Thing"><InfoItem name="name_thing"><value type="string">Planta</value></InfoItem><InfoItem name="type_thing"><value type="string">living_thing</value></InfoItem><InfoItem name="score_thing"><value type="string">98.0</value></InfoItem><InfoItem name="type_living_thing"><value type="string">Planta</value></InfoItem><InfoItem name="specie_living_thing"><value type="string">Flor</value></InfoItem><InfoItem name="food_living_thing"><value type="string">agua</value></InfoItem></InfoItem></InfoItem><InfoItem name="Thing"><InfoItem name="Non_Living_Thing"><InfoItem name="name_thing"><value type="string">Carro</value></InfoItem><InfoItem name="type_thing"><value type="string">non_living_thing</value></InfoItem><InfoItem name="score_thing"><value type="string">98.0</value></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem><InfoItem name="part"><InfoItem name="name_part"><value type="string">cuarto Santiago</value></InfoItem><InfoItem name="type_part"><value type="string">Bedroom</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.105</value></InfoItem><InfoItem name="id_object"><value type="string">78091938</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Luz</value></InfoItem></InfoItem></InfoItem><InfoItem name="Things"><InfoItem name="Thing"><InfoItem name="Living_Thing"><InfoItem name="name_thing"><value type="string">Gato</value></InfoItem><InfoItem name="type_thing"><value type="string">living_thing</value></InfoItem><InfoItem name="score_thing"><value type="string">100.0</value></InfoItem><InfoItem name="type_living_thing"><value type="string">Planta</value></InfoItem><InfoItem name="specie_living_thing"><value type="string">Flor</value></InfoItem><InfoItem name="food_living_thing"><value type="string">agua</value></InfoItem></InfoItem></InfoItem><InfoItem name="Thing"><InfoItem name="Non_Living_Thing"><InfoItem name="name_thing"><value type="string">Moto</value></InfoItem><InfoItem name="type_thing"><value type="string">non_living_thing</value></InfoItem><InfoItem name="score_thing"><value type="string">100.0</value></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem><InfoItem name="part"><InfoItem name="name_part"><value type="string">sala</value></InfoItem><InfoItem name="type_part"><value type="string">LivingRoom</value></InfoItem><InfoItem name="flat_number"><value type="string">Piso No. 1</value></InfoItem><InfoItem name="Objetos"><InfoItem name="oos"><InfoItem name="ip_object"><value type="string">192.168.123.106</value></InfoItem><InfoItem name="id_object"><value type="string">708637323</value></InfoItem><InfoItem name="name_object"><value type="string">Regulador de Temperatura</value></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></InfoItem></Object></Objects>';
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
  postRegistrarUsuario(url: string, data) {
    this.datosPost = this.http.get("/registroUsuario");
  }
  getEstadoDataStreams(xml) {
    return xml.Objects.Object[0].send_state[0].InfoItem;
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
  getPerfilUsuario() {
    const usuario = this.getXMLPerfilUsuario().Objects.Object[0].InfoItem[0];
    let datos = [];
    for (let i = 0; i < usuario.InfoItem.length; i++) {
      if (usuario.InfoItem[i].value[0]._ === 'None') {
        datos.push('');
      }
      else {
        datos.push(usuario.InfoItem[i].value[0]._);
      }
    }
    return datos;
  }

  getInfoBasicaDispositivo(xml) {
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    // json.Objects.Object[0].InfoItem--->Informacion general del dispositivo + informacion de datastreams
    return xml.Objects.Object[0].InfoItem[0].MetaData[0].InfoItem;
  }
  crearElemento(elemento) {
    console.log(elemento);
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/xml');
    headers = headers.append('Accept', 'text/xml');
    let body = '<request>'
    '<username>Username</username>'
    '<password>Password</password>'
    '</request>';

    return this.http.post('https://66.128.132.126:8002/?event=account_login', body, { headers: headers, responseType: 'text' });
  }
  a(elemento) {
    console.log(elemento);
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/xml');
    headers = headers.append('Accept', 'text/xml');
    let body = '<request>'
    '<username>Username</username>'
    '<password>Password</password>'
    '</request>';

    return this.http.post('https://66.128.132.126:8002/?event=account_login', body, { headers: headers, responseType: 'text' });
  }
  perfil() {
    alert('entra');
    this.https.get('http://10.0.0.17/RegistroUsuario?email?=andrea@unicauca.edu.co&mac=02:00:00:00:00:00&data', {}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);
  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
  }

  crearECA(xml: string) {
    // ToDo: Mirar que retorna el Servidor PU
    // const url =  this.urlServidor + "RegistrarPreferencia?email=" + email + "&mac=" + mac + "&data=" + xml;
    this.listarECAs();
  }


  listarECAs() {
    // ToDo: Traer xml del servidor
    // const url = this.urlServidor + "ConsultarPreferencias?email=" + email + "&mac=" + mac ;
    const xml = '<?xml version=\'1.0\' encoding=\'utf-8\'?> <Objects> <Object> <InfoItem name="Preferencias"> <InfoItem name="preferencia"> <InfoItem name="name_preference"> <value type="string">apagarriego</value> </InfoItem> <InfoItem name="state_preference"> <value type="string">on</value> </InfoItem> <InfoItem name="osid_object_event"> <value type="string">708637323</value> </InfoItem> <InfoItem name="ip_event_object"> <value type="string">192.168.123.100</value> </InfoItem> <InfoItem name="name_event_object"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="id_event_resource"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="name_event_resource"> <value type="string" /> </InfoItem> <InfoItem name="comparator_condition"> <value type="string">menor</value> </InfoItem> <InfoItem name="variable_condition"> <value type="string">29</value> </InfoItem> <InfoItem name="type_variable_condition"> <value type="string">float</value> </InfoItem> <InfoItem name="unit_condition"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_condition"> <value type="string">hace frio</value> </InfoItem> <InfoItem name="osid_object_action"> <value type="string">1931642039</value> </InfoItem> <InfoItem name="ip_action_object"> <value type="string">192.168.123.101</value> </InfoItem> <InfoItem name="name_action_object"> <value type="string">Regulador de Humedad en Planta</value> </InfoItem> <InfoItem name="id_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="name_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="comparator_action"> <value type="string">igual</value> </InfoItem> <InfoItem name="variable_action"> <value type="string">0</value> </InfoItem> <InfoItem name="type_variable_action"> <value type="string">bool</value> </InfoItem> <InfoItem name="unit_action"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_action"> <value type="string">apagar riego</value> </InfoItem> </InfoItem> <InfoItem name="preferencia"> <InfoItem name="name_preference"> <value type="string">encenderriego</value> </InfoItem> <InfoItem name="state_preference"> <value type="string">on</value> </InfoItem> <InfoItem name="osid_object_event"> <value type="string">708637323</value> </InfoItem> <InfoItem name="ip_event_object"> <value type="string">192.168.123.100</value> </InfoItem> <InfoItem name="name_event_object"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="id_event_resource"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="name_event_resource"> <value type="string" /> </InfoItem> <InfoItem name="comparator_condition"> <value type="string">mayor</value> </InfoItem> <InfoItem name="variable_condition"> <value type="string">29</value> </InfoItem> <InfoItem name="type_variable_condition"> <value type="string">float</value> </InfoItem> <InfoItem name="unit_condition"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_condition"> <value type="string">hace calor</value> </InfoItem> <InfoItem name="osid_object_action"> <value type="string">1931642039</value> </InfoItem> <InfoItem name="ip_action_object"> <value type="string">192.168.123.101</value> </InfoItem> <InfoItem name="name_action_object"> <value type="string">Regulador de Humedad en Planta</value> </InfoItem> <InfoItem name="id_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="name_action_resource"> <value type="string">riego</value> </InfoItem> <InfoItem name="comparator_action"> <value type="string">igual</value> </InfoItem> <InfoItem name="variable_action"> <value type="string">1</value> </InfoItem> <InfoItem name="type_variable_action"> <value type="string">bool</value> </InfoItem> <InfoItem name="unit_action"> <value type="string">None</value> </InfoItem> <InfoItem name="meaning_action"> <value type="string">encender riego</value> </InfoItem> </InfoItem> </InfoItem> </Object> </Objects>';

    const lista = [];

    let js;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      js = result;
    });

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
    this.dataUserService.setListaECA(lista);
  }




}
