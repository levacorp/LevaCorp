import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-lectura-qr',
  templateUrl: './lectura-qr.page.html',
  styleUrls: ['./lectura-qr.page.scss'],
})
export class LecturaQRPage implements OnInit {

  @Output() onReadEvent = new EventEmitter();
  @Output() onReadAction = new EventEmitter();

  direccion: string;
  id: string;

  data: string[][] = [];
  nombreDispositivo: any = null;


  constructor(private route: ActivatedRoute, private http: HttpClient, private nativeHttp: HTTP,
    private plt: Platform, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.direccion = this.route.snapshot.paramMap.get('dir');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEverywhere();
  }

  // Si se hace la peticion desde navegador se usa el get http convencional (No funciona desde navegador las peticiones)
  async getStandard() {
    const xml = '<Objects> <Object> <id>708637323</id> <InfoItem name="708637323"> <MetaData> <InfoItem name="id"> <value type="string">708637323</value> </InfoItem> <InfoItem name="title"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="description"> <value type="string"> Es un servicio que permite mantener la temperatura deseada por el usuario en el entorno de la sala de estar. Cuenta con un sensor de temperatura, un calefactor para incrementarla y un ventilador para decrementarla. </value> </InfoItem> <InfoItem name="lon"> <value type="string">-76.5981505</value> </InfoItem> <InfoItem name="lat"> <value type="string">2.4471309</value> </InfoItem> <InfoItem name="ele"> <value type="string">None</value> </InfoItem> <InfoItem name="name"> <value type="string">None</value> </InfoItem> <InfoItem name="domain"> <value type="string">0</value> </InfoItem> <InfoItem name="created"> <value type="string">07/07/2015 22:03:46</value> </InfoItem> <InfoItem name="creator"> <value type="string">https://personal.xively.com/users/manzamb</value> </InfoItem> <InfoItem name="feed"> <value type="string">https://api.xively.com/v2/feeds/708637323.json</value> </InfoItem> <InfoItem name="private"> <value type="string">false</value> </InfoItem> <InfoItem name="status"> <value type="string">0</value> </InfoItem> <InfoItem name="title"> <value type="string">Regulador de Temperatura</value> </InfoItem> <InfoItem name="updated"> <value type="string">06/16/2017 00:52:30</value> </InfoItem> <InfoItem name="version"> <value type="string">None</value> </InfoItem> <InfoItem name="website"> <value type="string">None</value> </InfoItem> <InfoItem name="tags"> <value type="string">Temperature Regulation Functionality</value> <value type="string">Entidad Sala</value> <value type="string">Temperature Regulator</value> <value type="string">Living Room</value> <value type="string">Entity Living Room</value> <value type="string">Funcionalidad de regulacion de temperatura</value> </InfoItem> <InfoItem name="ip_object"> <value type="string">192.168.127.16</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="calefactor"> <MetaData> <InfoItem name="label"> <value type="string">bool</value> </InfoItem> <InfoItem name="symbol"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">calefactor</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">actuador</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">1.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">bool</value> </InfoItem> <InfoItem name="tags"> <value type="string">Entity Living Room</value> <value type="string">calefactor</value> <value type="string">Entidad Sala</value> <value type="string">Heater</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Actuador</value> <value type="string">Actuator</value> <value type="string">Funcionalidad de medida de encedido o apagado</value> <value type="string">Feature Temperature</value> <value type="string">On OFF functionality</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="Reloj"> <MetaData> <InfoItem name="label"> <value type="string">T</value> </InfoItem> <InfoItem name="symbol"> <value type="string">T</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">Reloj</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">None</value> </InfoItem> <InfoItem name="max_value"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">string</value> </InfoItem> <InfoItem name="tags"> <value type="string"> Funcionalidad de notificación de hora y fecha actual </value> <value type="string">Time Sensor</value> <value type="string">Sensor</value> <value type="string">Feature Time</value> <value type="string">sensor de hora y fecha</value> <value type="string">time Notification Functionality</value> <value type="string">Caracteristica Tiempo</value> <value type="string">Entity Time</value> <value type="string">Entidad Tiempo</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="temperatura"> <MetaData> <InfoItem name="label"> <value type="string">Centigrados</value> </InfoItem> <InfoItem name="symbol"> <value type="string">°C</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">temperatura</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">-192.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">4095.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">float</value> </InfoItem> <InfoItem name="tags"> <value type="string">Entity Living Room</value> <value type="string"> Funcionalidad de notificacion de medida de temperatura </value> <value type="string">Entidad Sala</value> <value type="string">Sensor</value> <value type="string">Temperature Measurement Notification Functionality</value> <value type="string">Sensor de temperatura</value> <value type="string">Temperature Sensor</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Feature Temperature</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="proximidad"> <MetaData> <InfoItem name="label"> <value type="string">Personas</value> </InfoItem> <InfoItem name="symbol"> <value type="string">P</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">proximidad</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">sensor</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">float</value> </InfoItem> <InfoItem name="tags"> <value type="string">user presence Notification Functionality</value> <value type="string">Entity Living Room</value> <value type="string">User Sensor</value> <value type="string">Caracteristica Usuario</value> <value type="string">Feature User</value> <value type="string"> Funcionalidad de notificación de presencia de usuario </value> <value type="string">Entidad Sala</value> <value type="string">Sensor</value> <value type="string">sensor de presencia de usuario</value> </InfoItem> </MetaData> </InfoItem> <InfoItem name="ventilador"> <MetaData> <InfoItem name="label"> <value type="string">bool</value> </InfoItem> <InfoItem name="symbol"> <value type="string">None</value> </InfoItem> <InfoItem name="datastream_id"> <value type="string">ventilador</value> </InfoItem> <InfoItem name="datastream_type"> <value type="string">actuador</value> </InfoItem> <InfoItem name="min_value"> <value type="string">0.0</value> </InfoItem> <InfoItem name="max_value"> <value type="string">1.0</value> </InfoItem> <InfoItem name="datastream_format"> <value type="string">bool</value> </InfoItem> <InfoItem name="tags"> <value type="string">Ventilator</value> <value type="string">Entity Living Room</value> <value type="string">Caracteristica Temperatura</value> <value type="string">Actuador</value> <value type="string">Entidad Sala</value> <value type="string">Ventilador</value> <value type="string">Actuator</value> <value type="string">Feature Temperature</value> <value type="string">Fan</value> <value type="string">On Off Functionality</value> <value type="string">Funcinalidad de encendido apagado</value> </InfoItem> </MetaData> </InfoItem> </Object> </Objects>';


    // Se parsea el xml a un objeto javascript para poder manejarlo más facil
    let js;
    const parseString = require('xml2js').parseString;
    parseString(xml, function(err, result) {
      js = result;
    });

    let auxFuncionalidad = '';
    let auxDSFormat = '';

    // json.Objects.Object[0].InfoItem--->Informacion general del dispositivo + informacion de datastreams
    let jsObject = js.Objects.Object[0].InfoItem;


    for (let i = 0; i < jsObject.length; i++) {
      for (let j = 0; j < jsObject[i].MetaData[0].InfoItem.length; j++) {
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'title') {
          // Se obtiene el nombre del dispositivo
          this.nombreDispositivo = jsObject[i].MetaData[0].InfoItem[j].value[0]._;

          // Después de tener el nombre del dispositivo no se necesita más datos, por eso se elimina de la lista de datastreams
          jsObject.splice(i, 1);
        }
        // Para entre los tags el nombre de la funcionalidad
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'tags') {
          // Para sacar el nombre de la funcionalidad de cada datastream
          for (let m = 0; m < jsObject[i].MetaData[0].InfoItem[j].value.length; m++) {

            // Se busca el tag que tenga el nombre "Funcionalidad"
            if ((jsObject[i].MetaData[0].InfoItem[j].value[m]._).includes('Funcionalidad')) {
              auxFuncionalidad = jsObject[i].MetaData[0].InfoItem[j].value[m]._;
            }
          }
        }
        // Para sacar el datastream format y determinar si es actuador o sensor
        if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'datastream_format') {
          auxDSFormat = jsObject[i].MetaData[0].InfoItem[j].value[0]._;
        }
      }
      this.data.push([jsObject[i].$.name, auxFuncionalidad, auxDSFormat]);
      auxFuncionalidad = '';
      auxDSFormat = '';
    }
    


    /*let loading = await this.loadingCtrl.create({message: 'Please wait...'});
    await loading.present();

    this.http.get('http://192.168.0.23/Identificator?osid=708637323', { headers: {'Allow-Control-Allow-Origin': '*'}, responseType: 'text' }).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
        this.data = data['results'];
      }, err => {
        console.log('JS Call error', err);
      });*/
  }

  // Si se hace la peticion desde celular se hace una peticion con la librería nativeHttp
  async getNativeHttp() {
    let loading = await this.loadingCtrl.create({message: 'Consultando...'});
    await loading.present();

    let nativeCall = this.nativeHttp.get(this.direccion, { responseType: 'text' }, {
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
        // Se parsea el xml a un objeto javascript para poder manejarlo más facil
        let js;
        const parseString = require('xml2js').parseString;
        parseString(data.data, function(err, result) {
          js = result;
        });

        let auxFuncionalidad = '';
        let auxDSFormat = '';

        // json.Objects.Object[0].InfoItem--->Informacion general del dispositivo + informacion de datastreams
        let jsObject = js.Objects.Object[0].InfoItem;


        for (let i = 0; i < jsObject.length; i++) {
          for (let j = 0; j < jsObject[i].MetaData[0].InfoItem.length; j++) {
            if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'title') {
              // Se obtiene el nombre del dispositivo
              this.nombreDispositivo = jsObject[i].MetaData[0].InfoItem[j].value[0]._;

              // Después de tener el nombre del dispositivo no se necesita más datos, por eso se elimina de la lista de datastreams
              jsObject.splice(i, 1);
            }
            // Para entre los tags el nombre de la funcionalidad
            if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'tags') {
              // Para sacar el nombre de la funcionalidad de cada datastream
              for (let m = 0; m < jsObject[i].MetaData[0].InfoItem[j].value.length; m++) {

                // Se busca el tag que tenga el nombre "Funcionalidad"
                if ((jsObject[i].MetaData[0].InfoItem[j].value[m]._).includes('Funcionalidad')) {
                  auxFuncionalidad = jsObject[i].MetaData[0].InfoItem[j].value[m]._;
                }
              }
            }
            // Para sacar el datastream format y determinar si es actuador o sensor
            if (jsObject[i].MetaData[0].InfoItem[j].$.name === 'datastream_format') {
              auxDSFormat = jsObject[i].MetaData[0].InfoItem[j].value[0]._;
            }
          }
          this.data.push([jsObject[i].$.name, auxFuncionalidad, auxDSFormat]);
          auxFuncionalidad = '';
          auxDSFormat = '';
        }

      }, err => {
        console.log('JS Call error', err);
      });
  }

  // Método para decidir si se hace la peticion http desde navegador o desde celular
  getEverywhere() {
    if (this.plt.is('cordova')) {
      this.getNativeHttp();
    } else {
      this.getStandard();
    }
  }

  enviarEvento(nombreDatastream) {
    console.log("Click");
    this.onReadEvent.emit(nombreDatastream);
  }
  enviarAccion(nombreDatastream) {
    console.log("Click");
    this.onReadAction.emit(nombreDatastream);
  }

}
