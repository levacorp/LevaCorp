
# from suds.client import Client
# from suds.xsd.doctor import Import, ImportDoctor

from zeep import Client

import json

import pprint  ##Para que imprima con formato los diccionarios y las listas
import time

import sys

import requests
import xml.etree.ElementTree as ET
from lxml import etree

'''
Clase que proporciona conexiones a una raspberry
y proporciona el acceso a algunos servicios preestablecidos por la raspberry

'''
class ConexionRaspberry:

    def __init__(self):
        pass

    def estadosDispositivos(self, ip, id):                      # Método para obtener estados de sensores y
        url = 'http://'+ip+'/SendState?osid='+str(id)           # actuadores de un dispositivo, se hace la conexión
        estados = {}                                            # con la dirección IP y el id del dispositivo

        try:
            xml = requests.get(url, timeout=15)
            if xml.status_code == 400:
                raise RuntimeError("No se logró hacer la conexion")
            tree = ET.fromstring(xml.content)
            if tree[0][1].tag == "Error":
                raise RuntimeError("No se logró hacer la conexion")
            datos = tree[0][1]
            for child in datos:
                estados.update({child.get('name'): [child[0].get('type'), child[0].text]})

        except RuntimeError as e:
            print(e)
            estados = None
        except requests.exceptions.RequestException as e:
            print(e)
            estados = None

        return estados


    def cambiarEstadoActuadores(self, ip, idDisp, idDatastream, opcion):        # Método que permite cambiar el estado
                                                                                # de los actuadores de un dispositivo
        url = 'http://'+ip +'/SetDatastream?osid='+str(idDisp)+'&idDataStream='+idDatastream+'&comando='+opcion
        print(url)
        cambio = ""
        try:
            xml = requests.get(url)
            if xml.status_code == 400:
                raise RuntimeError("No se logró hacer la conexion")
            tree = ET.fromstring(xml.content)
            if tree[0][1].tag == "Error":
                raise RuntimeError("Error al traer el xml")
            cambio = "Exito"
        except RuntimeError as e:
            print(e)
        except requests.exceptions.RequestException as e:
            print(e)

        return cambio

    # Método que permite inicializar una raspberry, mandandole el archivo JSON con sus datos
    def inicializar(self, ip, dataJson):
        url = 'http://' + ip + '/StartObject'

        try:
            requests.post(url, data=dataJson)
            return True
        except requests.exceptions.RequestException as e:
            print(e)
            return False
