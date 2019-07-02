#!/usr/bin/env python
#-*- coding: utf-8 -*-
from Ontologia import Ontologia
import UrisPu
from rdflib import Literal
import AppUtil
import os

class EditarPerfilUsuario:
    def __init__(self,mac,idUsuario):
        try:           
            os.stat(AppUtil.pathOWL)
        except:
            os.mkdir(AppUtil.pathOWL, 0x0777)
        try:    
                self.path = AppUtil.pathOWL + mac + "&" + idUsuario + ".owl"
                self.ontologia = Ontologia(self.path)
        except:
                print("Desde PobladorPU. El path es incorrecto")
        
    
    def editarPersona(self,dicPersona):
        try:
            uriPersona = UrisPu.individuoPersona+dicPersona['email']
            
            listaPersona = []
            listaPersona.append([uriPersona,UrisPu.dp_date_of_birth,Literal(dicPersona['date_of_birth'])])
            listaPersona.append([uriPersona,UrisPu.dp_name_person,Literal(dicPersona['name_person'])])
            listaPersona.append([uriPersona,UrisPu.dp_surname,Literal(dicPersona['surname'])])
            listaPersona.append([uriPersona,UrisPu.dp_gender,Literal(dicPersona['gender'])])
            listaPersona.append([uriPersona,UrisPu.dp_celullar,Literal(dicPersona['celullar'])])
            listaPersona.append([uriPersona,UrisPu.dp_facebook,Literal(dicPersona['facebook'])])
            listaPersona.append([uriPersona,UrisPu.dp_email,Literal(dicPersona['email'])])
            listaPersona.append([uriPersona,UrisPu.dp_place_of_birth,Literal(dicPersona['place_of_birth'])])
            #listaPersona.append([uriPersona,UrisPu.dp_,Literal(dicPersona[''])])
            self.ontologia.actualizarListaDataProperty(listaPersona)
            return True
        except Exception as e:
            print(e)
            return False
        
    def editarAplicacion(self, dicApp):
        try:
            uriAplication = UrisPu.individuoApplication  + dicApp['name_app'] + dicApp['email']
            listaApp=[]
            listaApp.append([uriAplication,UrisPu.dp_password_app,Literal(dicApp['password_app'])])
            self.ontologia.actualizarListaDataProperty(listaApp)
            uriLogin=UrisPu.op_login
            uriPersona = UrisPu.individuoPersona + dicApp['email']
            #self.ontologia.insertarObjectProperty(uriPersona,uriLogin,uriAplication)
            return True
        except Exception as e:
            print(e)
            return False
