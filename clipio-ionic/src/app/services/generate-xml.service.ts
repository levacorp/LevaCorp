import { Injectable } from '@angular/core';
import { EnviarXMLService } from './enviar-xml.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateXMLService {

  constructor(
    private enviarXML : EnviarXMLService
  ) { }

  crearXMLInicioSesion(email: string, password: string) {

    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('Objects');
    xw.startElement('Object');
    xw.startElement('InfoItem');
    xw.writeAttribute('name', 'application');

    xw.startElement('InfoItem');
    xw.writeAttribute('name', 'name_app');
    xw.startElement('value');
    xw.writeAttribute('type', 'string');
    xw.text('Clipio');
    xw.endElement();
    xw.endElement();

    xw.startElement('InfoItem');
    xw.writeAttribute('name', 'user_app');
    xw.startElement('value');
    xw.writeAttribute('type', 'string');
    xw.text(email);
    xw.endElement();
    xw.endElement();

    xw.startElement('InfoItem');
    xw.writeAttribute('name', 'password_app');
    xw.startElement('value');
    xw.writeAttribute('type', 'string');
    xw.text(password);
    xw.endElement();
    xw.endElement();

    xw.endDocument();
    return xw;
    //console.log(xw.toString());
  }

  crearECA(json, infoAccion, infoEvento) {
    // console.log(json.value);
    json = json.value;
    console.log(json.nombre);
    console.log(infoEvento);
    console.log(infoAccion);
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter;
    xw.startDocument();
    let root = xw.startElement('Objects');
    root.startElement('Object');
    root.startElement('InfoItem').writeAttribute('name', 'preferencia');
    root.startElement('InfoItem').writeAttribute('name', 'name_preference');
    root.startElement('value').writeAttribute('type', 'string').text(json.nombre);  
    root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'state_preference');
    root.startElement('value').writeAttribute('type', 'string').text('on');  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'osid_object_event');
    root.startElement('value').writeAttribute('type', 'string').text(infoEvento.idDispositivo);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'ip_event_object');
    root.startElement('value').writeAttribute('type', 'string').text(infoEvento.ipDispositivo);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'name_event_object');
    root.startElement('value').writeAttribute('type', 'string').text(infoEvento.nombreDispositivo);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'id_event_resource');
    root.startElement('value').writeAttribute('type', 'string').text(infoEvento.datastream);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'name_event_resource');
    root.startElement('value').writeAttribute('type', 'string');  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'comparator_condition');
    root.startElement('value').writeAttribute('type', 'string').text(json.evento.comparador);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'variable_condition');
    root.startElement('value').writeAttribute('type', 'string').text(json.evento.valor);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'type_variable_condition');
    root.startElement('value').writeAttribute('type', 'string').text(infoEvento.dsFormat);  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'unit_condition');
    root.startElement('value').writeAttribute('type', 'string').text('None');  root.endElement();
    root.endElement();
    root.startElement('InfoItem').writeAttribute('name', 'meaning_condition');
    root.startElement('value').writeAttribute('type', 'string').text(json.evento.significado);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'osid_object_action');
        root.startElement('value').writeAttribute('type', 'string').text(infoAccion.idDispositivo);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'ip_action_object');
        root.startElement('value').writeAttribute('type', 'string').text(infoAccion.ipDispositivo);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'name_action_object');
        root.startElement('value').writeAttribute('type', 'string').text(infoAccion.nombreDispositivo);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'id_action_resource');
        root.startElement('value').writeAttribute('type', 'string').text(infoAccion.datastream);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'name_action_resource');
        root.startElement('value').writeAttribute('type', 'string');  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'comparator_action');
        root.startElement('value').writeAttribute('type', 'string').text(json.accion.comparador);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'variable_action');
        root.startElement('value').writeAttribute('type', 'string').text(json.accion.valor);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'type_variable_action');
        root.startElement('value').writeAttribute('type', 'string').text(infoAccion.dsFormat);  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'unit_action');
        root.startElement('value').writeAttribute('type', 'string').text('None');  root.endElement();
      root.endElement();
      root.startElement('InfoItem').writeAttribute('name', 'meaning_action');
        root.startElement('value').writeAttribute('type', 'string').text(json.accion.significado);  root.endElement();
      root.endElement();
    root.endDocument();

    console.log(xw.toString());
    return(xw.toString());
  }
  crearLivingThing(edificio, habitacion, livingThing) {
    console.log(livingThing);
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('Objects');
      xw.startElement('Object');
        xw.startElement('InfoItem').writeAttribute('name', 'Things');
          xw.startElement('InfoItem').writeAttribute('name', 'thing');
            xw.startElement('InfoItem').writeAttribute('name', 'name_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.nombre);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'type_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.tipo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'score_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.score);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'type_living_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.tipoViva[0].viva);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'specie_living_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.tipoViva[0].especie);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'food_living_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(livingThing.tipoViva[0].viva);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_building');
              xw.startElement('value').writeAttribute('type', 'string').text(edificio);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_part');
              xw.startElement('value').writeAttribute('type', 'string').text(habitacion);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_building_environment');
              xw.startElement('value').writeAttribute('type', 'string').text("");
              xw.endElement();
            xw.endElement();
          xw.endElement();
        xw.endElement();
      xw.endElement();
    xw.endElement();
    console.log(xw.toString());
  }
  crearNotLivingThing(edificio, habitacion, NotlivingThing) {
    console.log(NotlivingThing);
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('Objects');
      xw.startElement('Object');
        xw.startElement('InfoItem').writeAttribute('name', 'Things');
          xw.startElement('InfoItem').writeAttribute('name', 'thing');
            xw.startElement('InfoItem').writeAttribute('name', 'name_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(NotlivingThing.nombre);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'type_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(NotlivingThing.tipo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'score_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(NotlivingThing.score);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_building');
              xw.startElement('value').writeAttribute('type', 'string').text(edificio);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_part');
              xw.startElement('value').writeAttribute('type', 'string').text(habitacion);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_building_environment');
              xw.startElement('value').writeAttribute('type', 'string').text("");
              xw.endElement();
            xw.endElement();
          xw.endElement();
        xw.endElement();
      xw.endElement();
    xw.endElement();
    console.log(xw.toString());
  }
  crearAsociacionDispositivosHabitacion(edificio, habitacion , nombreDispositivo, idDispositivo, ipDispositivo)
  {
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('Objects');
      xw.startElement('Object');
        xw.startElement('InfoItem').writeAttribute('name', 'OOS');
          xw.startElement('InfoItem').writeAttribute('name', 'oos');
            xw.startElement('InfoItem').writeAttribute('name', 'name_object');
              xw.startElement('value').writeAttribute('type', 'string').text(nombreDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'id_object');
              xw.startElement('value').writeAttribute('type', 'string').text(idDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'ip_object');
              xw.startElement('value').writeAttribute('type', 'string').text(ipDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_house_part');
              xw.startElement('value').writeAttribute('type', 'string').text("");
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_building');
              xw.startElement('value').writeAttribute('type', 'string').text(edificio);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_part');
              xw.startElement('value').writeAttribute('type', 'string').text(habitacion);
              xw.endElement();
            xw.endElement();
          xw.endElement();
        xw.endElement();
      xw.endElement();
    xw.endElement();
    console.log(xw.toString());
  }
  crearAsociacionDispositivosElemento(nombreThing, nombreDispositivo, idDispositivo, ipDispositivo)
  {
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument();
    xw.startElement('Objects');
      xw.startElement('Object');
        xw.startElement('InfoItem').writeAttribute('name', 'OOS');
          xw.startElement('InfoItem').writeAttribute('name', 'oos');
            xw.startElement('InfoItem').writeAttribute('name', 'name_object');
              xw.startElement('value').writeAttribute('type', 'string').text(nombreDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'id_object');
              xw.startElement('value').writeAttribute('type', 'string').text(idDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'ip_object');
              xw.startElement('value').writeAttribute('type', 'string').text(ipDispositivo);
              xw.endElement();
            xw.endElement();
            xw.startElement('InfoItem').writeAttribute('name', 'name_thing');
              xw.startElement('value').writeAttribute('type', 'string').text(nombreThing);
              xw.endElement();
            xw.endElement();
          xw.endElement();
        xw.endElement();
      xw.endElement();
    xw.endElement();
    console.log(xw.toString());
  }

    
  //crea el XML para registrar un nuevo edificio
  setXMLRegistrarEdificio(json) {
    var XMLWriter = require('xml-writer');
    let xw = new XMLWriter;
    json = json.value;
    var nombre= json.nombre, piso = json.piso,  email = json.email;
    xw.startDocument();
    xw.startElement('Objects');
    xw.startElement('Object');

    xw.startElement('InfoItem').writeAttribute('name', 'BuildingEnvironment');
    xw.startElement('InfoItem').writeAttribute('name', 'Building');
    xw.startElement('InfoItem').writeAttribute('name', 'name_building');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(nombre).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'Flat');
    xw.startElement('InfoItem').writeAttribute('name', 'name_thing');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(piso).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'name_part');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text('Flat').endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'name_building');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(nombre).endElement('/InfoItem').endElement('/InfoItem');

    xw.endDocument();
    console.log("xmlRegistrar");
    console.log(xw.toString());
  }
  //crea el XML para el registrar el usuario en la aplicacion
  setXMLRegistrar(json) {
    var XMLWriter = require('xml-writer');
    let xw = new XMLWriter;
    json = json.value;
    var nombreApp = json.nombreApp, contraseña = json.contrasena,  email = json.email;
    xw.startDocument();
   // xw.Encoding= Encoding.UTF8;
    xw.startElement('Objects');
    xw.startElement('Object');

    xw.startElement('InfoItem').writeAttribute('name', 'application');
    xw.startElement('InfoItem').writeAttribute('name', 'name_app');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(nombreApp).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'user_app');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(email).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'password_app');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(contraseña).endElement('/InfoItem').endElement('/InfoItem');

    xw.endDocument();    
    console.log(xw.toString());
    
   this.enviarXML.registrarUsuario(email, xw.toString());
  }
  //crea el XML para el perfil del usuario
  setXMLPerfil(json) {
    var XMLWriter = require('xml-writer');
    let xw = new XMLWriter;
    json = json.value;
    var nombre = json.nombre, apellido = json.apellido, celular = json.celular, genero = json.genero, fechaNacimiento = json.fechaNacimiento;
    var facebook = json.facebook, lugarNacimiento = json.lugarNacimiento, email = json.email;
    xw.startDocument();
    xw.startElement('Objects');
    xw.startElement('Object');

    xw.startElement('InfoItem').writeAttribute('name', 'Person');
    xw.startElement('InfoItem').writeAttribute('name', 'name_person');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(nombre).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'surname');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(apellido).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'celullar');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(celular).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'gender');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(genero).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'date_of_birth');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(fechaNacimiento).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'facebook');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(facebook).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'place:of_birth');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(lugarNacimiento).endElement('/InfoItem').endElement('/InfoItem');

    xw.startElement('InfoItem').writeAttribute('name', 'email');
    xw.startElement('value').writeAttribute('type', 'string');
    xw.text(email);

    xw.endDocument();
   // console.log(xw.toString());
  }
}
