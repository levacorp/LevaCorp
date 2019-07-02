import web
import os
import sys
import json

sys.path.append('./AuxiliaresPck')
sys.path.append('./OntologiaPck')
sys.path.append('./templates')
from GestorPerfilUsuario import GestorPerfilUsuario
from AuxiliaresPck import AppUtil
from AuxiliaresPck import ProcesadorXml
#from termcolor import  colored
##"/ConsultarBuildingEnvironment", "ConsultarBuildingEnvironment")

class Administrador:


    ##diccionarioApp = ['name_app', 'user_app', 'password_app']
    def registrarUsuario(self, mac,  diccionarioApp):
        email = diccionarioApp['user_app']
        gestorPu  = GestorPerfilUsuario()
        if not gestorPu.estaUsuarioPorMail(email):
            if gestorPu.crearPerfilUsuario(mac, email):
                if diccionarioApp:
                    if gestorPu.poblarPerfilUsuario(email, mac, "application", diccionarioApp):
                        return True
                    else:
                        print(" Error  al poblar  app")
                        gestorPu.eliminarPerfilUsuario(email,"owl")
                        return False
                else:
                    print("El diccionario llego vacio")
                    gestorPu.eliminarPerfilUsuario(email,"owl")
                    return False

            else:
                gestorPu.eliminarPerfilUsuario(email,"owl")
                return False
        else:
            print("Usuario ya existe")
            return False

    ##diccionarioData = ['name_person', 'surname', 'date_of_birth', 'gender', 'celullar', 'facebook', 'email', 'place_of_birth']
    def registrarDatosPersonales(self, mac, diccionarioDatosPersonales):
        email = diccionarioDatosPersonales['email']
        gestorPu  = GestorPerfilUsuario()
        if gestorPu.estaUsuarioPorMail(email):

                if diccionarioDatosPersonales:
                    if  gestorPu.poblarPerfilUsuario(email, mac, "person", diccionarioDatosPersonales):
                        return True
                    else:
                        print(" Error  al poblar el Usuario")
                        return False
                else:
                    print("El diccionario llego vacio")
                    return False



        else:
            print("Usuario ya existe")
            return False




    def verificarExisteUsuario(self, email):
        print("******************* VERIFICAR USUARIO  ********************************")
        gestorPu = GestorPerfilUsuario()
        if gestorPu.estaUsuarioPorMail(email):
            return True
        else:
            return False

    def recuperarOntologia(self, identificador):
        gestorPu=GestorPerfilUsuario()
        return gestorPu.recuperarPerfilUsuario(identificador, "owl")

    def registrarObject (self, email, mac, data):
        print("******************* REGISTRO OBJECT  ********************************")
        gestorPu = GestorPerfilUsuario()
        if gestorPu.estaUsuarioPorMail(email):
##             'name_object': 'Regulador de Humedad en Planta',  'ip_object': '192.168.10.118', 'id_object': '1931642039'
          gestorPu.poblarPerfilUsuario( email, mac, "object",data)
          return True
        else:
            return False

    ##parametros = [email, password, name_app, mac, user_name]
    def validarUsuarioApp (self, parametros):
#    #http://localhost:8080/ValidarUsuarioApp?email=jlr@unicauca.edu.co&user_name=jlr@unicauca.edu.co&name_app=Clipio&password=7XObIwKeQNk9uNJ8/L9rPQ==&mac=ec:9b:f3:a2:a5:41
        print("")
        print("************ VALIDAR USUARIO APP **********************")
    
        try:
            gestorPu = GestorPerfilUsuario()

            codigo= gestorPu.ValidarUsuarioAppAdmin(parametros)
            if (codigo == AppUtil.exitoso):
                return True
            else:
                return False
        except Exception as e:
            print("eexception")
            print(e)
            return False

    ##parametros = [email, mac]
    def consultarDatosPersonales(self, parametros):
        try:
            print("******************* CONSULTAR DATOS PERSONALES  ********************************")
            gestorPu = GestorPerfilUsuario()
            if  gestorPu.estaUsuarioPorMail(parametros['email']):
                return gestorPu.consultarDatosPersonalesDicc(parametros)
            else:
                return False
        except Exception as e:
            print(e)
            return False

    ##parametros = [email, mac]
    def consultarObjetosRelated(self, parametros):
        procesadorXml = ProcesadorXml()
        try:
            print("******************* CONSULTAR OBJETOS RELATED  ********************************")
            gestorPu = GestorPerfilUsuario()
            if  gestorPu.estaUsuarioPorMail(parametros['email']):

                codigo= gestorPu.consultarObjetosRelatedDicc(parametros)
                return codigo
            else:
                return False
        except Exception as e:
            print(e)
            return False





if __name__ == "__main__":
    administrador = Administrador()
##diccionarioData = ['name_person', 'surname', 'date_of_birth', 'gender', 'celullar', 'facebook', 'email', 'place_of_birth']
    ##diccionarioApp = ['name_app', 'user_app', 'password_app']
    dicPersonal = dict(name_person="Andrea",
                       surname='Pabon',
                       date_of_birth='',
                       gender='F',
                       celullar='',
                       facebook='',
                       email='ANDREA@GMAIL.COM',
                       place_of_birth='')
    print(dicPersonal['email'])
    diccionarioApp = dict(name_app="ClipioAdmin", user_app='ANDREA@GMAIL.COM', password_app="12345")
    administrador.registrarUsuario("00", diccionarioApp)
    administrador.registrarDatosPersonales("00", dicPersonal)
    ##parametros = [email, password, name_app, mac, user_name]
    dicValidar = dict(email="ANDREA@GMAIL.COM", password="1235", name_app="ClipioAdmin", mac="00", user_name="ANDREA@GMAIL.COM")
    print(administrador.validarUsuarioApp(dicValidar))
    dicObject = dict(name_object='Regulador de Humedad en Planta',  ip_object='192.168.10.118', id_object='1931642039')
    administrador.registrarObject("ANDREA@GMAIL.COM", "00", dicObject)
