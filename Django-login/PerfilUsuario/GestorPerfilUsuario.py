#!/usr/bin/env python
#-*- coding: utf-8 -*-

import sys
import os
from os import listdir
import time

sys.path.append('./AuxiliaresPck')
sys.path.append('./OntologiaPck')
from OntologiaPck.PoblarPerfilUsuario import PoblarPerfilUsuario
from OntologiaPck.PoblarPreferencia import PoblarPreferencia
from OntologiaPck.ConsultasPerfilUsuario import ConsultasPerfilUsuario
from AuxiliaresPck.ProcesadorXml import ProcesadorXml
from OntologiaPck.EditarPerfilUsuario import EditarPerfilUsuario
from AuxiliaresPck import AppUtil as AppUtil

class GestorPerfilUsuario:
    def __init__(self):
        pass  
   
    def estaUsuarioPorMail(self, mail):
        if os.path.exists(AppUtil.pathOWL):
            for archivo in listdir(AppUtil.pathOWL):
                try:
                    correo = archivo.split("&")[1].split(".owl")[0]
                    if correo == mail:
                        return True
                except:
                    pass
        return False
    
    def estaUsuarioPorMac(self, mac):
        if os.path.exists(AppUtil.pathOWL):
            for archivo in listdir(AppUtil.pathOWL):
                try:
                    macArchivo=archivo.split("&")[0]
                    if macArchivo == mac:
                        return True
                except:
                    pass ##El archivo o carpeta no tiene el formato correcto
        return False
        
    def consultarMacUsuarioPorEmail(self, email):
        if os.path.exists(AppUtil.pathOWL):
            for archivo in listdir(AppUtil.pathOWL):
                try:
                    correo = archivo.split("&")[1].split(".owl")[0]
                    if correo == email:
                        return AppUtil.pathOWL+archivo #retorno el nombre de la ontologia en formato path/mac&email.owl
                except:
                    pass
                    return True
        return False
    
    def recuperarPerfilUsuario(self, identificador, tipo):
        if tipo == "owl":
            if os.path.exists(AppUtil.pathOWL):
                for archivo in listdir(AppUtil.pathOWL):
                    try:
                        macArchivo = archivo.split("&")[0]
                        correo = archivo.split("&")[1].split(".owl")[0]
                        correo = archivo.split(".owl")[0]
                        if macArchivo == identificador or correo == identificador:
                            getFile = file(AppUtil.pathOWL + archivo,'rb') 
                            return getFile.read()
                    except:
                        pass
        return False

    def eliminarPerfilUsuario(self, identificador, tipo):
        print("entro")
        if tipo == "owl":
            print("si es owl")
            if os.path.exists(AppUtil.pathOWL):
                for archivo in listdir(AppUtil.pathOWL):
                    try:
                        macArchivo = archivo.split("&")[0]
                        correo = archivo.split("&")[1].split(".owl")[0]
                        correo = correo.split(".owl")[0]
                        print(correo)
                        if macArchivo == identificador or correo == identificador:
                            print("entro a que lo encontro")
                            print(archivo)
                            try:
                                os.remove(AppUtil.pathOWL + archivo)
                                print("Lo elimino")
                                return True
                            except Exception as e:
                                print("no se pudo eliminar")
                                print(e)
                                return False
                        else:
                                return False
                    except:
                        pass
        return False
        
    def actualizarPerfilUsuario(self, email,  mac,  data): ##reemplaza la ontologia
        if os.path.exists(AppUtil.pathOWL):
            procesadorXml = ProcesadorXml()
            return procesadorXml.reemplazarOWL(email,  mac,  data)
        return False

    ##Crea la ontología en el servidor
    def crearPerfilUsuario(self,  mac,email):
        try:       
            if not self.estaUsuarioPorMac(mac):
                poblador = PoblarPerfilUsuario(mac,email, "CREAR")
            return True;
        except Exception as e:
            print(e)
            return False

    def poblarPerfilUsuario(self, email, mac, concepto, dicDatos):   #Concepto se refiere a la clase de la ontologia que se quiere poblar
        if self.estaUsuarioPorMail(email):
            poblador = PoblarPerfilUsuario(mac,email, "CARGAR")
            dicDatos['email'] = email
            
            if concepto == "person":
                return poblador.poblarPersona(dicDatos)
            elif concepto == "application":
                return poblador.poblarAplicacion(dicDatos, email)
            else:
                if self.estaUsuarioPorMail(email):
                    if concepto == "buildingEnvironment":
                        return poblador.poblarBuildingEnvironment(dicDatos)
                    elif concepto == "thing":
                        return poblador.poblarThing(dicDatos)
                    elif concepto == "object":
                        return poblador.poblarObject(dicDatos)
                    elif concepto == "preference":
                        pobladorPreferencia = PoblarPreferencia(mac, email, "CARGAR")
                        pobladorPreferencia.poblarECA(dicDatos)
                        return poblador
                    elif concepto == "interaction":
                        return poblador.poblarInteraction(dicDatos)
                else:
                    return False
        else:
            print("Desde GestorPerfilUsuario: No existe el usuario por MAC")
            return False
                        
                    
    
    def editarPerfilUsuario(self, email, mac,concepto,dicDatos):
        poblador = PoblarPerfilUsuario(mac,email, "CARGAR")
        if self.estaUsuarioPorMac(mac):
            editador = EditarPerfilUsuario(mac,email)
            dicDatos['email'] = email
            
            if concepto == "person":
                return editador.editarPersona(dicDatos)
            elif concepto == "application": #Solo se puede editar la contrasenia
                return poblador.poblarAplicacion(dicDatos, email)
#            else:
#                if self.estaUsuarioPorMail(email):
#                    if concepto == "buildingEnvironment":
#                        return poblador.poblarBuildingEnvironment(dicDatos)
#                    elif concepto == "thing":
#                        return poblador.poblarThing(dicDatos)
#                    elif concepto == "object":
#                        return poblador.poblarObject(dicDatos)
#                else:
#                    return False
        else:
            print("Desde GestorPerfilUsuario: No existe el usuario por MAC")
            return False
    
    def elminarPerfilUsuario(self,email):
        pass
    
    def ValidarUsuarioAppAdmin(self, parametros):
        if self.estaUsuarioPorMail(parametros['email']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            query=consultasPerfil.consultarDatosAplicacion(parametros['name_app'], parametros['password'],parametros['user_name'])
            if query:
                return AppUtil.exitoso
            else:
                return AppUtil.credencialesIncorrectas
        else:
            return AppUtil.usuarioNoExiste

    def ValidarUsuarioApp(self, parametros):
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            query=consultasPerfil.consultarDatosAplicacion(parametros['name_app'], parametros['password'],parametros['user_name'])
            if query:
                return AppUtil.exitoso
            else:
                return AppUtil.credencialesIncorrectas
        else:
            return AppUtil.usuarioNoExiste
        
    def consultarDatosPersonales(self,parametros):
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            listaClaves=[ "name_person","email","date_of_birth", "surname","gender","celullar","facebook","place_of_birth"]
            query = consultasPerfil.consultarDatosPersonales()
            if len(query) > 0:
                listaDic = procesadorXml.crearDiccionarioApartirDeLista(listaClaves,query[0])
                return procesadorXml.crearXMLApartirDiccionario(listaDic, "Person")
            else:
                print("Usuario no tiene registrados ")
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
            #return AppUtil.usuarioNoExiste

    def consultarDatosPersonalesDicc(self,parametros):
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            listaClaves=[ "name_person","email","date_of_birth", "surname","gender","celullar","facebook","place_of_birth"]
            query = consultasPerfil.consultarDatosPersonales()
            if len(query) > 0:
                listaDic = procesadorXml.crearDiccionarioApartirDeLista(listaClaves,query[0])
                return listaDic
            else:
                print("Usuario no tiene registrados ")
                return False
        else:
            print("Usuario no existe")
            return False
            #return AppUtil.usuarioNoExiste

    def consultarBuildingEnvironment(self, parametros):
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            listaClavesBuilding=[ "name_building", "number_flat"]
            queryBuilding = consultasPerfil.consultarListaEdificiosConNumPisos()
            if len(queryBuilding) >0:
                listaDic = procesadorXml.crearListaDiccionarios(listaClavesBuilding,queryBuilding)
#                ?nombreparte ?nombrepiso ?nombedificio (strafter(str(?typeParte),str(dogont:)) as ?q) 
                        #?nombreCosa (strafter(str(?typething),str(dogont:)) as ?r) ?especiecosa ?comidacosa  ?tipocosaviva
                        #?nameobjeto ?ipobjeto ?idobjeto  
                listaClavesPartes=["name_building_environment", "number_flat", "name_building", "type_part", "name_thing", "type_thing", "specie_thing", "food_thing", "type_living_thing","name_object", "ip_object", "id_object"]
                queryPartes = consultasPerfil.consultarEdificioCompleto()
                if len(queryPartes) >0:
                    listaDicPartes = procesadorXml.crearListaDiccionarios(listaClavesPartes,queryPartes)
                    listaTotal = listaDicPartes + listaDic
                    return procesadorXml.crearXMLApartirListaDiccionario(listaTotal, "BuildingEnvironment", {'primero':'build'})
                else:
                    return procesadorXml.crearXMLApartirListaDiccionario(listaDic, "Building", {'primero':'build'})
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
            
        
    def consultarListaEdificios(self,parametros):
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            listaClaves=[ "name_building_environment", "number_flat"]
            query = consultasPerfil.consultarListaEdificiosConNumPisos()
            if len(query) >0:
                listaDic = procesadorXml.crearListaDiccionarios(listaClaves,query)
                return procesadorXml.crearXMLApartirListaDiccionario(listaDic, "Building", {'primero':'build'})
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")

    def consultarListaEdificiosConPartes(self,parametros):
        print("Desde consultarListaEdificiosConPartes")
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])

            listaClaves=[ "name_building_environment", "number_flat", "name_building", "name_part" ]
            query = consultasPerfil.consultarListaEdificiosConPartes()
            if len(query) >0:
                listaDic = procesadorXml.crearListaDiccionarios(listaClaves,query)
                return procesadorXml.crearXMLApartirListaDiccionario(listaDic, "BuildingEnvironment", {'primero':'build'})
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
   
            
    def consultarListaEdificiosConPartesObjetosCosas(self,parametros):
        print("Desde consultarListaEdificiosConPartes")
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])

            listaClaves=[ "name_building_environment", "number_flat", "name_building", "name_part" ]
            query = consultasPerfil.consultarListaEdificiosConPartes()
            if len(query) >0:
                listaDic = procesadorXml.crearListaDiccionarios(listaClaves,query)
                return procesadorXml.crearXMLApartirListaDiccionario(listaDic, "BuildingEnvironment", {'primero':'build'})
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
            
    def consultarObjetosRelated(self,parametros):
       ## print "Desde consultarObjetosRelated"
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil  = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            ##listaClaves= [ "name_object", "ip", "id", "nombreedificio", "nombreparte", "typeParte", "nombrepiso", "name_thing", "typething", "especiecosa", "comidacosa", "tipocosaviva"]
            query = consultasPerfil.consultaObjetosRelated()
            if len(query) >0:
                listaDic = query
                    
                return procesadorXml.crearXMLBuildingEnvironment(listaDic)
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")

    def consultarObjetosRelatedDicc(self, parametros):
        ## print "Desde consultarObjetosRelated"
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMac(parametros['mac']):
            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            ##listaClaves= [ "name_object", "ip", "id", "nombreedificio", "nombreparte", "typeParte", "nombrepiso", "name_thing", "typething", "especiecosa", "comidacosa", "tipocosaviva"]
            query = consultasPerfil.consultaObjetosRelated()
            if len(query) > 0:
                listaDic = query
                return listaDic
            else:
                return False
        else:
            print("Usuario no existe")
            return False
        
    def consultarPreferencias(self,parametros):
       ## print "Desde consultarObjetosRelated"
        procesadorXml = ProcesadorXml()
        if self.estaUsuarioPorMail(parametros['email']):
            consultasPerfil  = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
            ##listaClaves= [ "name_object", "ip", "id", "nombreedificio", "nombreparte", "typeParte", "nombrepiso", "name_thing", "typething", "especiecosa", "comidacosa", "tipocosaviva"]
            query = consultasPerfil.consultarPreferencias()
            if len(query) >0:
                listaDic = query
                return procesadorXml.xmlListaPreferencias(listaDic)
            else:
                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
        else:
            print("Usuario no existe")
            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
        
        
#    #############################
#    def consultarBuildingEnvironment(self, parametros):
#        procesadorXml = ProcesadorXml()
#        if self.estaUsuarioPorMac(parametros['mac']):
#            consultasPerfil = ConsultasPerfilUsuario(parametros['mac'], parametros['email'])
#            listaClavesBuilding=[ "name_building", "number_flat"]
#            queryBuilding = consultasPerfil.consultarListaEdificiosConNumPisos()
#            if len(queryBuilding) >0:
#                listaDic = procesadorXml.crearListaDiccionarios(listaClavesBuilding,queryBuilding)
#                listaClavesPartes=[ "name_house_part", "number_flat", "name_building", "name_part" ]
#                queryPartes = consultasPerfil.consultarListaEdificiosConPartes()
#                if len(queryPartes) >0:
#                    listaDicPartes = procesadorXml.crearListaDiccionarios(listaClavesPartes,queryPartes)
#                    listaTotal = listaDicPartes + listaDic
#                    return procesadorXml.crearXMLApartirListaDiccionario(listaTotal, "BuildingEnvironment", {'primero':'build'})
#                else:
#                    return procesadorXml.crearXMLApartirListaDiccionario(listaDic, "Building", {'primero':'build'})
#            else:
#                return procesadorXml.crearXmlRespuesta(AppUtil.noHayRegistros, "Exito")
#        else:
#            print "Usuario no existe"
#            return procesadorXml.crearXmlRespuesta(AppUtil.usuarioNoExiste, "Exito")
