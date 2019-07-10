
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

##Clase que se conecta con el indice semantico y proporciona
##metodos para obtener los metadatos de los objetos
class ConexionRaspberry:

    def __init__(self):
        pass

    def estadosDispositivos(self, ip, id):
        url = 'http://'+ip+'/SendState?osid='+str(id)
        estados = {}

        try:
            xml = requests.get(url)
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


    def cambiarEstadoActuadores(self, ip, idDisp, idDatastream, opcion):

        url = 'http://' + ip + '/SetDatastream?osid=' + str(idDisp) + '&idDataStream=' + idDatastream + '&comando='+opcion
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