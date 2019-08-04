import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateXMLService {

  constructor() { }

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
  crearHabitacion()
  {
    
  }
}
