import os
import sys
import time
from xml.etree import ElementTree as ET

sys.path.append('./AuxiliaresPck')
import pprint
import AppUtil


class ProcesadorXml:
    # funcion para ordenar los elementos de los archivos xml
    def indent(self, elem, level=0):
        i = "\n" + level * "  "
        if len(elem):
            if not elem.text or not elem.text.strip():
                elem.text = i + "  "
            if not elem.tail or not elem.tail.strip():
                elem.tail = i
            for elem in elem:
                self.indent(elem, level + 1)
            if not elem.tail or not elem.tail.strip():
                elem.tail = i
        else:
            if level and (not elem.tail or not elem.tail.strip()):
                elem.tail = i

    def crearXmlRespuesta(self, msj, tipo):  # tipo = Exito o Error
        objetos = ET.Element("Objects")
        objeto = ET.SubElement(objetos, "Object")
        infoItem = ET.SubElement(objeto, "InfoItem", name=tipo)
        ET.SubElement(infoItem, "value", type="string").text = msj
        tree = ET.ElementTree(objetos)
        self.indent(objetos)
        try:
            os.stat(AppUtil.pathRespuestasXml)
        except:
            os.mkdir(AppUtil.pathRespuestasXml, 0x0777)
        tree.write(AppUtil.pathRespuestasXml + tipo + ".xml", xml_declaration=True, encoding='utf-8', method="xml")
        getFile = file(AppUtil.pathRespuestasXml + tipo + ".xml", 'rb')
        return getFile.read()

    def guardarXML(self, parametros):  # Parametros = diccionario{data, email
        try:
            if not os.path.exists(AppUtil.pathPeticionesXml):
                os.mkdir(AppUtil.pathPeticionesXml, 0x0777)
                ############################TODO PONER UN NUMERO ALEATORIO OJOOOOOOOOOOOOOOOO
            filename = parametros['email'] + ".xml"
            path = AppUtil.pathPeticionesXml + filename
            fout = open(path, 'w')
            fout.write(parametros['data'])
            fout.close()
            return path
        except Exception as e:
            # self.Log.PubRawLog(self.osid ,self.osid , "makeContract Error guardando archivo")
            print(" Error  Guardando parametros['data']")
            print(e)
            return ""

    def reemplazarOWL(self, email, mac, data):  # Parametros = email = None, mac = None, data = None
        try:
            if not os.path.exists(AppUtil.pathOWL):
                os.mkdir(AppUtil.pathOWL, 0x0777)
                ############################TODO PONER UN NUMERO ALEATORIO OJOOOOOOOOOOOOOOOO
            path = AppUtil.pathOWL + mac + "&" + email + ".owl"
            os.remove(path)
            fout = open(path, 'w')
            fout.write(data)
            fout.close()
            return True
        except Exception as e:
            # self.Log.PubRawLog(self.osid ,self.osid , "makeContract Error guardando archivo")
            print(" Error  Guardando parametros['data']")
            print(e)
            return False

    def crearArchivoYListadiccionarioXML(self, parametros):
        path = self.guardarXML(parametros)
        if not path == "":
            try:
                listaData = self.procesarXmlGeneral(path)
                # print listaData
                return listaData  # Retorno una lista de diccionarios
            except Exception as e:
                print(" Error  creandor el diccionario a partir del archivo")
                print(e)
                return []
        else:
            return []

    def procearSubItem(self, subinten, dic):
        try:
            contenido = subinten.findall("InfoItem")
            for item in contenido:
                subitems = item.findall("InfoItem")
                if len(subitems) > 0:
                    self.procearSubItem(item, dic)
                else:
                    dic[item.attrib["name"]] = item.find("value").text
                    tipo = "type_" + item.attrib["name"]
                    try:
                        dic[tipo] = item.find("value").attrib["type"]
                    except Exception as e:
                        pass

            return dic
        except Exception as e:
            print("sub item " + str(e))

    def procesarXmlGeneral(self, path):
        tree = ET.parse(path)
        try:
            objetos = tree.getroot()
            objeto = objetos.find('Object')
            contenido = objeto.find("InfoItem")
            listaDic = []
            for item in contenido:
                dicionario = {}
                subitems = item.findall("InfoItem")
                if len(subitems) > 0:
                    listaDic.append(self.procearSubItem(item, dicionario))
                else:
                    listaDic.append(self.procearSubItem(contenido, dicionario))
                    break

            return listaDic
        except Exception as e:
            print(e)
            return []

    def crearDiccionarioApartirDeLista(self, listaClaves, listaValores):
        diccionario = {}
        if len(listaValores) == len(listaClaves):
            diccionario = {}
            contador = 0
            for clave in listaClaves:
                diccionario[clave] = listaValores[contador]
                contador = contador + 1
            return diccionario
        else:
            print("ProcesadorXML CrearDiccioanrioApartir de lista: Error las listas no tienen el mismo tamano")
            return diccionario

    def crearListaDiccionarios(self, listaClaves, lista):
        listaDic = []
        for item in lista:
            listaDic.append(self.crearDiccionarioApartirDeLista(listaClaves, item))
        return listaDic

    def crearXMLApartirDiccionario(self, diccionario, nombreXML):
        print("GENERANDO ARCHIVO XML " + nombreXML)
        objetos = ET.Element("Objects")
        objeto = ET.SubElement(objetos, "Object")

        item = ET.SubElement(objeto, "InfoItem", name=nombreXML)

        for clave, valor in diccionario.iteritems():
            infoItem = ET.SubElement(item, "InfoItem", name=clave)
            ET.SubElement(infoItem, "value", type="string").text = valor

        self.indent(objetos)
        tree = ET.ElementTree(objetos)
        tree.write(AppUtil.pathRespuestasXml + nombreXML + ".xml", xml_declaration=True, encoding='utf-8', method="xml")
        getFile = file(AppUtil.pathRespuestasXml + nombreXML + ".xml", 'rb')
        return getFile.read()

    ##############################CAMBIAR URGENTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    def crearXMLApartirListaDiccionario(self, lista, nombreXML, dicNombresSubItems):
        print("GENERANDO ARCHIVO XML A PARTIR DE LISTA DE DICCIONARIOS " + nombreXML)
        objetos = ET.Element("Objects")
        objeto = ET.SubElement(objetos, "Object")

        item = ET.SubElement(objeto, "InfoItem", name=nombreXML)

        for diccionario in lista:
            subItem = ET.SubElement(item, "InfoItem", name=dicNombresSubItems['primero'])
            for clave, valor in diccionario.iteritems():
                infoItem = ET.SubElement(subItem, "InfoItem", name=clave)
                ET.SubElement(infoItem, "value", type="string").text = valor

        self.indent(objetos)
        tree = ET.ElementTree(objetos)
        tree.write(AppUtil.pathRespuestasXml + nombreXML + ".xml", xml_declaration=True, encoding='utf-8', method="xml")
        getFile = file(AppUtil.pathRespuestasXml + nombreXML + ".xml", 'rb')
        return getFile.read()

    def xmlListaPreferencias(self, listaDicEcas):
        keys = ['name_preference', 'state_preference', 'osid_object_event', 'ip_event_object', 'name_event_object',
                'id_event_resource', 'name_event_resource', 'comparator_condition', 'variable_condition',
                'type_variable_condition', 'unit_condition', 'meaning_condition', 'osid_object_action',
                'ip_action_object', 'name_action_object', 'id_action_resource', 'name_action_resource',
                'comparator_action', 'variable_action', 'type_variable_action', 'unit_action', 'meaning_action']
        objetos = ET.Element("Objects")
        objeto = ET.SubElement(objetos, "Object")
        infoItemGrande = ET.SubElement(objeto, "InfoItem", name="Preferencias")

        # infoItem = ET.SubElement(objeto, "InfoItem", name = "ecas")
        for eca in listaDicEcas:
            infoItem = ET.SubElement(infoItemGrande, "InfoItem", name="preferencia")
            ##    infoItem = ET.SubElement( infoItemPreferencia, "InfoItem", name = eca["name_preference"])
            for var in keys:
                if not var == eca["name_preference"]:  ##ver si es necesarios
                    subInfoItem = ET.SubElement(infoItem, "InfoItem", name=var)
                    try:
                        valor = eca[var].decode("utf8")
                        ET.SubElement(subInfoItem, "value", type="string").text = valor
                    except:
                        ET.SubElement(subInfoItem, "value", type="string").text = eca[var]
        try:
            os.stat(AppUtil.pathRespuestasXml)
        except:
            os.mkdir(AppUtil.pathRespuestasXml, 0x0777)

        self.indent(objetos)

        tree = ET.ElementTree(objetos)
        tree.write(AppUtil.pathRespuestasXml + "ListaEcas.xml", xml_declaration=True, encoding='utf-8', method="xml")
        getFile = file(AppUtil.pathRespuestasXml + "ListaEcas.xml", 'rb')
        return getFile.read()

    ##procesarXmlGeneral("LivingThing.xml")
##procesarXmlGeneral("Building.xml")
##procesarXmlGeneral("")
##procesarXmlGeneral("application.xml
# def procesarXml(self,path):
#        tree = ET.parse(path)
#        dicionario={}
#        try :
#            objetos=tree.getroot()
#            objeto = objetos.find('Object')
#            persona = objeto.find("InfoItem")
#            for atributo in persona.findall("InfoItem"):
#                print atributo
#                dicionario[atributo.attrib["name"]] = atributo.find("value").text
#            return dicionario
#        except Exception as e:
#            print "Error al procesar el xml"
#            print e
#            return dicionario
#    def procesarRegistroXml(self,path):
#        tree = ET.parse(path)
#        dicionarioPersona={}
#        try :
#            objetos=tree.getroot()
#            objeto = objetos.find('Object')
#            persona = objeto.find("InfoItem")
#            for atributo in persona.findall("InfoItem"):
#                if(atributo.attrib["name"] == "date_of_birth"):
#                    dicionarioPersona['date_of_birth'] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "name_person"):
#                    dicionarioPersona["name_person"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "surename"):
#                    dicionarioPersona["surename"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "gender"):
#                    dicionarioPersona["gender"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "celullar"):
#                    dicionarioPersona["celullar"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "facebook"):
#                    dicionarioPersona["facebook"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "email"):
#                    dicionarioPersona["email"] = atributo.find("value").text
#                elif(atributo.attrib["name"] == "place_of_birth"):
#                    dicionarioPersona["place_of_birth"] = atributo.find("value").text
#            return dicionarioPersona
#        except Exception as e:
#            print e
#            return dicionarioPersona
# 
# objeto = ProcesadorXml()
# print objeto.crearXmlRespuesta( "1040", "Error")

# def procesarXmlBuilding(self,path):
#        tree = ET.parse(path)
#        dicionario={}
#        try :
#            objetos=tree.getroot()
#            objeto = objetos.find('Object')
#            buildingEnvironment = objeto.find("InfoItem")
#            listaBuild = []
#            email = ""
#                
#            for parte in buildingEnvironment:
#                    if parte.attrib["name"] == "user_data":
#                            userData = parte.findall("InfoItem")
#                            for atributo in userData:
#                                    email = atributo.find("value").text
#                                    break
#                            
#            for parte in buildingEnvironment:
#                dicPartesCasa = {}
#                if not parte.attrib["name"] == "Room" :
#                        if not parte.attrib["name"] == "user_data":
#                                dicPartesCasa["name_part"] = parte.attrib["name"]
#                                dicPartesCasa["email"] = email
#                                parteCasa = parte.findall("InfoItem")
#                                for atributo in parteCasa :
#                                        dicPartesCasa[atributo.attrib["name"]] = atributo.find("value").text
#                                listaBuild.append(dicPartesCasa)
#                        
#                else:
#                        parteRoom = parte.findall("InfoItem")
#                        listaPartesRoom = []
#                        for parte in parteRoom:
#                                atributosParteRoom = parte.findall("InfoItem")
#                                dicParteRoom = {}
#                                dicParteRoom["email"] = email
#                                dicParteRoom["name_part"] = parte.attrib["name"]
#                                for atributo in atributosParteRoom :
#                                        dicParteRoom[atributo.attrib["name"]] = atributo.find("value").text
#                                listaBuild.append(dicParteRoom)
#            return listaBuild
#        except Exception as e:
#            print "Desde Procesador XML " + e
#            return listaBuild
