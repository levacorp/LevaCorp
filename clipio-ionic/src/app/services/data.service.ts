import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataUserService } from 'src/app/services/data-user.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  datosPost: Observable<any>;

  /* Email y mac estaticos para todas las peticiones */
  email = null;
  mac = null;
  urlServidor = null;


  constructor(
    private http: HttpClient,
    private dataUserService: DataUserService,
    private authService: AuthenticationService,
    private utilidades: UtilitiesService
  ) {
  }

  ngOnInit() {
  }
  // obtiene el email, la mac y la ip del dispositivo
  capturarDatosUsuario() {
    this.email = this.dataUserService.getEmail();
    this.urlServidor = 'http://' + this.dataUserService.getIP() + ':8080';
    this.mac = this.dataUserService.getMAC();
  }
  // hace la peticion a la verificacion de usuario del servidor
  async getVerificarUsuario(email: string, pass: string) {
    let resultado = 0;
    let json;
    const url = this.getURLInicioSesion(email, pass);
    await this.http.get(url, { responseType: 'text' }).timeout(3000).toPromise()
    .then(data => {
      const parseString = require('xml2js').parseString;
      parseString(data, function (err, result) {
        if (err) {
          alert('error');
        } else {
          json = result;
        }
      });
      if (json.Objects.Object[0].InfoItem[0].value[0]._ === '1028') {
        resultado = 1;
      }
    })
    .catch(error => {
      alert('error en servidor,es posible que la ip sea incorrecta');
      resultado = -1;
    });
    return resultado;
  }
  // obtiene la url de inicio de sesion
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
      for (let i = 0; i < elementosHabitacion.length; i++) {
        if (elementosHabitacion[i].InfoItem[0].value[0]._) {
          /* Obtiene el nombre del elemento */
          nombreElemento = elementosHabitacion[i].InfoItem[0].value[0]._;
          listaElementos.push(nombreElemento);
        }
      }
    }
    this.dataUserService.setListaElementosPorHabitacion(listaElementos);
    return listaElementos;
  }
  /* Obtiene el nombre de todos los edificios */
  async getListaEdificios() {
    const listaEdificios = [];    /* Se crea una lista que solamente contendra los nombres de los edificios */
    await this.getEdificios()
      .then(infoEdificios => {
        if (infoEdificios.length !== 0) {
          for (let i = 0; i < infoEdificios.length; i++) {
            listaEdificios.push(infoEdificios[i].InfoItem[0].value[0]._);   // Se agrega el nombre de cada edificio a la lista 
          }
        }
        this.dataUserService.setListaEdificios(listaEdificios);
      });
    return(listaEdificios);
  }
  /*Obtiene el json de todas las habitaciones*/
  async getListaHabitaciones(nombreEdificio: string) {
    const infoEdificio =  await this.getEdificio(nombreEdificio);
    const habitaciones = [];
    if (infoEdificio) {
      /* Se recorre el edificio para buscar las habitaciones */
      for (let i = 0; i < infoEdificio.length; i++) {
        if (infoEdificio[i].$.name === 'house_parts') {
          if (infoEdificio[i].InfoItem.length) {
            for (let j = 0; j < infoEdificio[i].InfoItem.length; j++) {
              let auxjs = [];
              auxjs.push(infoEdificio[i].InfoItem[j].InfoItem[0].value[0]._);
              auxjs.push(infoEdificio[i].InfoItem[j].InfoItem[1].value[0]._);
              habitaciones.push(auxjs);
            }
          }
        }
      }
    }
    this.dataUserService.setListaHabitaciones(habitaciones);
    return habitaciones;
  }
  /* Retorna la informacion de toda una habitacion */
  async getElementosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let elementosHabitacion = [];
    const habitaciones = await this.getHabitaciones(nombreEdificio);
    /* Se recorre la informacion de todas las habitaciones */
    for (let i = 0; i < habitaciones.length; i++) {
      if (habitaciones[i].InfoItem[0].value[0]._ === nombreHabitacion) {
        /* Se recorre cada InfoItem de la habitacion hasta encontrar uno que contenga Things */
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
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].InfoItem[0].value[0]._ === nombreElemento) {
        for (let j = 0; j < elementos[i].InfoItem.length; j++ ) {
          if (elementos[i].InfoItem[j].$.name === 'Objetos') {
            dispositivosElemento = elementos[i].InfoItem[j].InfoItem;
          }
        }
      }
    }
    return dispositivosElemento;
  }
  /* Retorna los dispositivos de una habitacion */
  async getDispositivosPorHabitacion(nombreEdificio: string, nombreHabitacion: string) {
    let dispositivosHabitacion = [];
    const habitaciones = await this.getHabitaciones(nombreEdificio);
    /* Se recorre la informacion de todas las habitaciones */
    for (let i = 0; i < habitaciones.length; i++) {
      if (habitaciones[i].InfoItem[0].value[0]._ === nombreHabitacion) {
        /* Se recorre cada InfoItem de la habitacion hasta encontrar uno que contenga Objetos */
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
    for (let i = 0; i < infoEdificios.length; i++) {
      /* Se recorre InfoItem para cada edificio */
      if (infoEdificios[i].InfoItem.length) {
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
  // url Building
  getURLBuildingEnvironment() {
    const url = this.urlServidor + '/ConsultarObjetosRelated?email=' + this.email + '&mac=' + this.mac;
    return url;
  }
  /* Obtiene el XML BuildingEnviroment y lo retorna como objeto */
  async getXMLBuildingEnvironment() {
    let xmlBuilding;
    const url = this.getURLBuildingEnvironment(); // Crea la URL para la peticion del XML Building environment
    await this.http.get(url, { responseType: 'text' }).timeout(3000).toPromise()
    .then(data => {
       xmlBuilding = this.parsear(data); // Parsea a objeto javascript
    })
    .catch(error => {
      this.utilidades.pararLoading();
      alert('error en servidor,es posible que la ip sea incorrecta, Cerrando Sesion...');
      this.authService.logout();
      return {error: error.error};
    }); // Hace la peticion
    return xmlBuilding;
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
  // parsea el xml a json
  parsear(xml) {
    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let json;
    const parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
      json = result;
    });
    return json;
  }
  // obtiene los datos del perfil de usuario
  async getPerfilUsuario() {

    const url = this.urlServidor + '/ConsultarDatosPersonales?email=' + this.email + '&mac=' + this.mac;
    const data = await this.http.get(url, { responseType: 'text' }).toPromise();
    const usuario = this.parsear(data);

    const datos = [];
    for (let i = 0; i < usuario.Objects.Object[0].InfoItem[0].InfoItem.length; i++) {
      if (usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === undefined
        || usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === ''
        || usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._ === 'None') {
        datos.push('');
      } else {
        datos.push(usuario.Objects.Object[0].InfoItem[0].InfoItem[i].value[0]._);
      }
    }
    return datos;
  }
  // Se obtiene la infromacion basica de la raspberry
  getInfoBasicaDispositivo(xml) {
    return xml.Objects.Object[0].InfoItem[0].MetaData[0].InfoItem;
  }
  // crea un nuevo elemento
  async crearElemento(xml) {
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
  // crea un nuevo eca
  async crearECA(xml: string) {
    const eca = xml;
    let datos = null;
    xml = encodeURIComponent(xml);
    const url = this.urlServidor + '/RegistrarPreferencia?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    datos = await this.http.get(url, { responseType: 'text' }).toPromise();


    let js = null;
    const parseString = require('xml2js').parseString;
    parseString(datos, function (err, result) {
      if (err) {
        alert('error');
      } else {
        js = result;
        // Actualizar lista de Preferencias
      }
    });
    await this.listarECAs();

    return js;
  }
  // modifica un eca
  async modificarECA(xml: string) {
    xml = encodeURIComponent(xml);
    const url = this.urlServidor + '/ModificarPreferencia?email=' + this.email + '&mac=' + this.mac + '&data=' + xml;
    await this.http.get(url, { responseType: 'text' })
      .subscribe(data => {

      }, error => {
        alert(error);
      });

    // Actualizar lista de Preferencias
    await this.listarECAs();
  }
  // obtiene todos los ecas
  async listarECAs() {
    const lista = [];

    const url = this.urlServidor + '/ConsultarPreferencias?email=' + this.email + '&mac=' + this.mac;
    await this.http.get(url, { responseType: 'text' })
      .subscribe(data => {
        let js;
        const parseString = require('xml2js').parseString;
        parseString(data, function (err, result) {
          js = result;
        });
        if (js.Objects.Object[0].InfoItem[0].$.name === 'Preferencias') {
          // json.Objects.Object[0].InfoItem--->Preferencias
          let jsObject = js.Objects.Object[0].InfoItem[0].InfoItem;
          for (let i = 0; i < jsObject.length; i++) {
            let jsonAux = {};
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
        }
        this.dataUserService.setListaECA(lista);
        return lista;
      }, error => {
        alert(error);
      }
      );
  }
  // registra un usuario en el servidor
  async registrarUsuario(xml: string, email) {
    xml = encodeURIComponent(xml);
    let js = null;
    const url = this.urlServidor + '/RegistroUsuario?email=' + email + '&mac=' + this.mac + '&data=' + xml;
    await this.http.get(url, { responseType: 'text' }).timeout(3000).toPromise()
     .then(data => {
      const parseString = require('xml2js').parseString;
      parseString(data, function (err, result) {
        if (err) {
          alert('error');
        } else {
          js = result;
        }
      });
    })
    .catch(error => {
      alert('error en servidor,es posible que la ip sea incorrecta');
      return {error: error.error};
    });    
    return js;
  }
  // modifica el perfil de usuario
  async modificarPerfil(xml: string, email: string) {
    xml = encodeURIComponent(xml);
    let datos = null;
    const url = this.urlServidor + '/ModificarDatosPersonales?email=' + email + '&mac=' + this.mac + '&data=' + xml;
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
  // registra un edificio
  async registrarEdificio(xml: string) {
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
