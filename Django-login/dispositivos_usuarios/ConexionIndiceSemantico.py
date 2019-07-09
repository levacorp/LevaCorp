

#from suds.client import Client
#from suds.xsd.doctor import Import, ImportDoctor

from zeep import Client

import json

import pprint  ##Para que imprima con formato los diccionarios y las listas
import time

import sys



##Clase que se conecta con el indice semantico y proporciona
##metodos para obtener los metadatos de los objetos
class ConexionIndiceSemantico:
    url = 'http://facfiet.unicauca.edu.co/SemanticSearchIoT/WSSemanticSearch/WSSemanticSearch.asmx?WSDL'
    
    name_space = 'http://www.unicauca.edu.co/'
    ##JSON que retorna el indice semantico
    jsonObjeto = {}

    Conceptos = []

    ##Al crear una instancia de Conexion Indice Semantico, se consulta al indice semantico
    ##por los metadatos del objeto y se guardan en el diccionario jsonObjeto
    def __init__(self, idObjeto):
        try:
            #imp = Import('http://www.w3.org/2001/XMLSchema',
            #             location='http://www.w3.org/2001/XMLSchema.xsd')
            #imp.filter.add(self.name_space)
            client = Client(self.url)
            feedId = idObjeto
            response = client.service.RetornarJsonSensorLocal(idObjeto)
            
            self.jsonObjeto = json.loads(response)
            if self.jsonObjeto is None:
                self.jsonObjeto = {}
            else:
                self.Conceptos = self.jsonObjeto['Conceptos']
                self.jsonObjeto = self.jsonObjeto[
                    'feed']  ##Esto se hace por que el nuevo método RetornarJsonSensorLocal lo retorna en otro formato
        except Exception as e:
            print("Problemas Con El Indice Semantico")
            print(e)

    def getJSON(self):
        return self.jsonObjeto

    ################################ Metodos retornan strings    #############################################
    ##Retornar el id
    def getId(self):
        if "id" in self.jsonObjeto:             # if self.jsonObjeto.has_key("id"):
            return self.jsonObjeto['id']
        else:
            return None

        ##Retornar la descripcion

    def getDescription(self):
        if "description" in self.jsonObjeto:            # if self.jsonObjeto.has_key("description"):
            return self.jsonObjeto['description']
        else:
            return None

        ###Retorna si el Feed es private(true) o si es public(false)

    def getPrivate(self):
        if "private" in self.jsonObjeto:                # if self.jsonObjeto.has_key("private"):
            return self.jsonObjeto['private']
        else:
            return None

        ###Retorna el tittle (Un nombre descriptivo para el Feed

    def getTitle(self):
        if "title" in self.jsonObjeto:                  # if self.jsonObjeto.has_key("title"):
            return self.jsonObjeto['title']
        else:
            return None

        ###Retorna la url del feed (.json)

    def getFeed(self):
        if "feed" in self.jsonObjeto:                   # if self.jsonObjeto.has_key("feed"):
            return self.jsonObjeto['feed']
        else:
            return None

        ###Retorna live si el Feed ha sido actualizado
        ###en los ultimos 15min, de lo contrario frozen

    def getStatus(self):
        if "status" in self.jsonObjeto:                 #if self.jsonObjeto.has_key("status"):
            return self.jsonObjeto['status']
        else:
            return None

        ###Retorna la hora en la cual Feed tuvo su ultim actualizacion

    def getUpdated(self):
        if "updated" in self.jsonObjeto:                # if self.jsonObjeto.has_key("updated"):
            return self.jsonObjeto['updated']
        else:
            return None

        ###Retorna la fecha en que el Feed fue creado

    def getCreated(self):
        if "created" in self.jsonObjeto:                # if self.jsonObjeto.has_key("created"):
            return self.jsonObjeto['created']
        else:
            return None

        ###Retorna una URL referenciando al creador del Feed

    def getCreator(self):
        if "creator" in self.jsonObjeto:                # if self.jsonObjeto.has_key("creator"):
            return self.jsonObjeto['creator']
        else:
            return None

        ###Retorna Version of the data format Feed returned.

    def getVersion(self):
        if "version" in self.jsonObjeto:                # if self.jsonObjeto.has_key("version"):
            return self.jsonObjeto['version']
        else:
            return None

        ###Retorna la URL de un sitio web que es relevante para este feed

    def getWebsite(self):
        if "website" in self.jsonObjeto:                # if self.jsonObjeto.has_key("website"):
            return self.jsonObjeto['website']
        else:
            return None

    def getServiceState(self):
        if "service_state" in self.jsonObjeto:          # if self.jsonObjeto.has_key("service_state"):
            return self.jsonObjeto['service_state']
        else:
            return "off"

    #Metodo para obtener los conceptos del dispositivo  Created by juancamiforero 19/06/2019
    def getConceptos(self):
        return self.Conceptos

        ########################################################################################################################
        ################################ Metodos retornan Listas o Diccionarios    #############################################

        ###Retorna los Tags acerca del Feed en una lista

    def getTags(self):
        if "tags" in self.jsonObjeto:                   # if self.jsonObjeto.has_key("tags"):
            return self.jsonObjeto['tags']
        else:
            return ['None']

        ###Retorna una coleccion de un Datastreams especifico
        ###diccionario {'tags' 'min_value' 'max_value' 'current_value', 'datastream_id', 'at', 'unit' }

    def getPersonalizedTags(self):
        tagsList = []
        finalList = []
        for i in self.getTags():
            tagsList.append(i)
        for i in range(6, len(tagsList)-1, 2):
            aux=[tagsList[i],tagsList[i+1]]
            finalList.append(aux)
        return finalList

    def getDatastreams(self, idDataStreams):
        lista = self.jsonObjeto['datastreams']
        for i in lista:
            if i['id'] == idDataStreams:
                return i
        else:
            return []

        ###Retorna una coleccion de los Datastreams
    def getPersonalizedDataStreams(self):
        dic = self.getListaDatastreams()
        for i in dic:
            if("tags" in i):
                tags = i["tags"]
                listaTags = []
                finalList = []
                for j in tags:
                    listaTags.append(j)
                
                for k in range(0, len(listaTags)-1, 2):
                    aux = [listaTags[k], listaTags[k+1]]
                    finalList.append(aux)

                if((len(listaTags) % 2) != 0):
                    aux = [listaTags[len(listaTags)-1]]
                    finalList.append(aux)
                i["tags"] = finalList
        return dic


    def getListaDatastreams(self):
        if "datastreams" in self.jsonObjeto:                # if self.jsonObjeto.has_key("datastreams"):
            ## MetaDatos_Recurso = [("datastream_id", str), ("label", str), ("symbol", str), ("datastream_type", str),("min_value",str),("max_value",str)]
            keys = ['datastream_id', 'max_value', 'min_value', "datastream_type", "datastream_format", "tags", 'unit']
            keysUnit = ['label', 'symbol']
            listaDS = self.jsonObjeto['datastreams']
            listaDSAux = []

            for item in listaDS:
                if("id" in item):
                    aux = item['id']
                    del item["id"]
                else:
                    aux = item["datastream_id"]

                item["datastream_id"] = aux
                if not item["datastream_id"] == "comodin":
                    if "unit" in item:                  # if item.has_key('unit'):
                        item['unit'] = self.pasarDiccionario(item['unit'], keysUnit)
                    dic = self.pasarDiccionario(item, keys)
                    listaDSAux.append(dic)
            return listaDSAux
        else:
            return []

        ###Retornar la localizacion del objeto en un
        ###diccionario{lon,lat,name,domail,ele}

    def getLocation(self):
        keys = ['lon', 'lat', 'name', 'domain', 'ele']
        if "location" in self.jsonObjeto:               # if self.jsonObjeto.has_key("location"):
            dic = self.jsonObjeto["location"]
            for key in keys:
                if key not in dic:                      # if not dic.has_key(key):
                    dic[key] = self.pedirDatos.datosFaltantes("objeto", key, "")
            dicAux = self.pasarDiccionario(dic, keys)
            return dicAux
        else:
            return 0

        ##Auxiliar que dado un diccionario si no encuentra la clave,
        ##le pone "None" para que se pueda ingresar a la ontologia

    def pasarDiccionario(self, dic, keys):
        dicAux = {}
        for key in keys:
            if key in dic:               # if dic.has_key(key):
                dicAux[key] = dic[key]
            else:
                dicAux[key] = "None"
        return dicAux
        ########################################################################################################################
        ######################################################################################################################



        # {
        #	"Conceptos":["sala de estar"],
        #	"lugares":null,
        #	"feed":
        #	{
        #		"id":"708637323",
        #		"title":"Regulador de Temperatura",
        #		"Private":false,
        #		"tags":["Entidad Sala","Entity Living Room","Funcionalidad de regulacion de temperatura","Living Room",
        #		         "Temperature Regulation Functionality","Temperature Regulator"],
        #		"description":"Es un servicio que permite mantener la temperatura deseada por el usuario en el entorno
        #		               de la sala de estar. Cuenta con un sensor de temperatura, un calefactor para incrementarla
        #		               y un ventilador para decrementarla.",
        #		"feed":"https://api.xively.com/v2/feeds/708637323.json",
        #		"auto_feed_url":null,
        #		"status":0,
        #		"updated":"06/16/2017 00:52:30",
        #		"created":"07/07/2015 22:03:46",
        #		"creator":"https://personal.xively.com/users/manzamb",
        #		"version":null,
        #		"website":null,
        #		"datastreams":
        #		[
        #			{
        #				"feedid":null,
        #				"id":"calefactor",
        #				"current_value":"1",
        #				"at":"03/24/2017 17:39:25",
        #				"max_value":"1.0",
        #				"min_value":"0.0",
        #				"tags":["Actuador","Actuator","calefactor","Caracteristica Temperatura","Entidad Sala","Entity Living Room",
        #					     "Feature Temperature","Funcionalidad de medida de encedido o apagado","Heater","On OFF functionality"],
        #			    "unit":
        #			    	{
        #			    		"symbol":null,
        #			    		"label":"bool",
        #			    		"unitType":0
        #			    	},
        #			    "datapoints":null
        #			},
        #			{
        #				"feedid":null,
        #				"id":"comodin",
        #				"current_value":null,
        #				"at":"04/19/2016 14:30:44",
        #				"max_value":null,
        #				"min_value":null,
        #				"tags":["comodin"],
        #				"unit":
        #					{
        #						"symbol":null,
        #						"label":null,
        #						"unitType":0
        #					},
        #				"datapoints":null
        #			},
        #			{
        #				"feedid":null,
        #				"id":"proximidad",
        #				"current_value":"0",
        #				"at":"05/15/2017 18:45:22",
        #				"max_value":"0.0",
        #				"min_value":"0.0",
        #				"tags":["Caracteristica Usuario","Entidad Sala","Entity Living Room","Feature User",
        #				        "Funcionalidad de notificación de presencia de usuario","Sensor",
        #				        "sensor de presencia de usuario","user presence Notification Functionality","User Sensor"],
        #				"unit":
        #					{
        #						"symbol":"P",
        #						"label":"Personas",
        #						"unitType":0,
        #						"datapoints":null
        #					},
        #				{
        #					"feedid":null,
        #					"id":"Reloj",
        #					"current_value":null,
        #					"at":"06/16/2017 00:52:30",
        #					"max_value":null,
        #					"min_value":null,
        #					"tags":["Caracteristica Tiempo","Entidad Tiempo","Entity Time","Feature Time","Funcionalidad de notificación de hora y fecha actual",
        #						    "Sensor","sensor de hora y fecha","time Notification Functionality","Time Sensor"],
        #					"unit":
        #						{
        #							"symbol":"T",
        #							"label":"T",
        #							"unitType":0
        #						},
        #					"datapoints":null
        #				},
        #				{
        #					"feedid":null,
        #					"id":"temperatura",
        #					"current_value":"-89",
        #					"at":"04/18/2016 20:06:00",
        #					"max_value":"4095.0",
        #					"min_value":"-192.0",
        #					"tags":["Caracteristica Temperatura","Entidad Sala","Entity Living Room","Feature Temperature",
        #					        "Funcionalidad de notificacion de medida de temperatura","Sensor","Sensor de temperatura",
        #					        "Temperature Measurement Notification Functionality","Temperature Sensor"],
        #					"unit":
        #						{
        #							"symbol":"°C",
        #							"label":"Centigrados",
        #							"unitType":0
        #						},
        #					"datapoints":null
        #				},
        #				{
        #					"feedid":null,
        #					"id":"ventilador",
        #					"current_value":"0",
        #					"at":"03/24/2017 17:41:57",
        #					"max_value":"1.0",
        #					"min_value":"0.0",
        #					"tags":["Actuador","Actuator","Caracteristica Temperatura","Entidad Sala","Entity Living Room","Fan","Feature Temperature",
        #					        "Funcinalidad de encendido apagado","On Off Functionality","Ventilador","Ventilator"],
        #					"unit":
        #						{
        #							"symbol":null,
        #							"label":"bool",
        #							"unitType":0
        #						},
        #					"datapoints":null
        #				}
        #		],
        #		"location":
        #			{
        #				"name":null,
        #				"domain":0,
        #				"lat":"2.4471309",
        #				"lon":"-76.5981505",
        #				"ele":null,
        #				"exposure":0,
        #				"disposition":0
        #			},
        #		"TitleHTML":"<a style=\"color: #336600; font-size:110%;\"  href=\"https://xively.com/feeds/708637323\" >Regulador de Temperatura</a>",
        #		"URLMostrar":"https://xively.com/feeds/708637323"
        #	},
        #	"pathfeed":"D:\\Aplicaciones\\SemanticSearchIoT\\WSSemanticSearch\\App_Data\\Json_Data\\708637323.json",
        #	"DocumentJSON":null
        # }


        ##******************************EJEMPLO JSON metodo con xively********************************************
        # {u'created': u'2014-10-20T22:50:42.938324Z',
        # u'creator': u'https://personal.xively.com/users/manzamb',

        # u'datastreams': [{u'at': u'2016-10-31T20:31:56.853000Z',
        #                   u'current_value': u'0',
        #                   u'id': u'bombillo',
        #                   u'max_value': u'1.0',
        #                   u'min_value': u'0.0',
        #                   u'tags': [u'Bombillo',
        #                             u'Bulb',
        #                             u'Funcionalidad de encendido apagado',
        #                             u'On Off Functionality'],
        #                   u'unit': {u'label': u'Booleano'}},


        #                  {u'at': u'2016-10-31T05:59:50.837849Z',
        #                   u'id': u'comodin',
        #                   u'tags': [u'comodin']},


        #                  {u'at': u'2016-10-31T20:31:56.853000Z',
        #                   u'current_value': u'0',
        #                   u'id': u'luz',
        #                   u'max_value': u'4999.9584',
        #                   u'min_value': u'-55.0',
        #                   u'tags': [u'Funcionalidad de notificaci\xf3n de medida de luz',
        #                             u'Light Measurement Notification Functionality',
        #                             u'Light Sensor',
        #                             u'sensor de luz'],
        #                   u'unit': {u'label': u'Porcentaje', u'symbol': u'%'}}],

        # u'description': u'Es un servicio que permite mantener la intensidad de luz deseada por el usuario, posee un sensor de luz y un bombillo para incrementar la intensidad de luz cuando el servicio as\xed lo requiera. Se encuentra desplegado en la sala o living room',
        # u'device_serial': u'XDHNMMKKWJJ2',
        # u'feed': u'https://api.xively.com/v2/feeds/78091938.json',
        # u'id': 78091938,

        # u'location': {u'domain': u'physical',
        #               u'lat': 2.4470888,
        #               u'lon': -76.5980193,
        #               u'name': u'Living Room'},

        # u'private': u'false',
        # u'product_id': u'jOPkx7Li8lMpH4Ii8ak5',
        # u'status': u'frozen',

        # u'tags': [u'Funcionalidad de regulaci\xf3n de luz',
        #           u'Light Regulation Functionality',
        #           u'Light Regulator',
        #           u'Living Room',
        #           u'Regulador de luz',
        #           u'sala',
        #           u'Sala de estar'],

        # u'title': u'Regulador de Luz',
        # u'updated': u'2016-10-31T20:31:52.120288Z',
        # u'version': u'1.0.0'}

        # if __name__ == "__main__":
        #    con = ConexionIndiceSemantico(708637323)
