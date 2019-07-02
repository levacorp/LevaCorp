
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
class conexionEstado:

    def __init__(self):
        pass

    def estadosDispositivos(self, ip, id):
        url = 'http://'+ip+'/SendState?osid='+str(id)
        estados = {}
        try:
            xml = requests.get(url)

            tree = ET.fromstring(xml.content)
            datos = tree[0][1]
            for child in datos:
                estados.update({child.get('name'): [child[0].get('type'), child[0].text]})

        except requests.exceptions.RequestException as e:
            print("No se logró hacer la conexion")
            estados = None

        return estados


#obj = conexionEstado()
#print(obj.estadosDispositivos("10.0.0.16", "708637323"))
#obj.estadosDispositivos("192.168.0.103", "708637323")



