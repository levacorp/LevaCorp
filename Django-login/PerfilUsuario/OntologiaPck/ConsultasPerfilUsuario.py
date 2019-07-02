from Ontologia import Ontologia
##import UrisPu
##from rdflib import Literal
import AuxiliaresPck.AppUtil as AppUtil
import os
##import pprint

class ConsultasPerfilUsuario:
    
    def __init__(self, mac, idUsuario):
        try:           
            os.stat(AppUtil.pathOWL)
        except:
            os.mkdir(AppUtil.pathOWL, 0x0777)
        self.path = AppUtil.pathOWL + mac + "&" + idUsuario + ".owl"
        self.ontologia = Ontologia(self.path)
        
        
    def consultarObjetosUsuario(self):
        #self.ontologia = Ontologia()
        query = """ PREFIX : <http://localhost/default#>
                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#>
                SELECT ?name ?score
                WHERE {
                    ?entity :name_thing ?name.
                    ?entity :score_thing ?score.
                    ?entity rdf:type  oos:Object.
                }"""
        resultado = self.ontologia.consultaDataProperty(query)
        return resultado
    
    
    def consultarDatosAplicacion(self,app,pas,user_app):
##       
        query = """PREFIX  pu:<http://localhost/default#>
                    ASK  WHERE{ 
                                ?x pu:name_app  ?app FILTER regex(?app,'^"""+app+ """$') .
                                ?x pu:password  ?pass  FILTER regex(?pass, '^"""+pas+"""$').
                                ?x pu:user_app  ?user  FILTER regex(?user, '^"""+user_app+"""$') 
                    }"""
        resultado = self.ontologia.consultasASK(query)
        #print "desde consultaspu resultado: " + app + " " + pas + "  " + user_app
        #print query
        #print bool(resultado)
        return resultado
    
    def consultarDatosPersonales(self):
        query="""PREFIX : <http://localhost/default#>
                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#>
                SELECT ?name_person ?email ?date_of_birth ?surname ?gender ?celullar  ?facebook  ?place_of_birth
                WHERE {
                    OPTIONAL {?entity :name_person ?name_person}.
                    OPTIONAL {?entity :date_of_birth ?date_of_birth}.
                    OPTIONAL {?entity :surname ?surname}.
                    OPTIONAL {?entity :gender ?gender}.
                    OPTIONAL {?entity :email ?email}.
                    OPTIONAL {?entity :celullar ?celullar}.
                    OPTIONAL {?entity :facebook ?facebook}.
                    OPTIONAL {?entity :place_of_birth ?place_of_birth}.
                    ?entity rdf:type :Person.
                }"""
        resultado = self.ontologia.consultaDataProperty(query)
        #print "Desde ConsultasPU, datosperosnales el tamanio de la respuesta es " + str(len(resultado))
        return resultado
                
    def consultarListaEdificios(self):
        query="""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX pu: <http://localhost/default#>
                PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#>
                SELECT  ?nombedificio 
                WHERE{
                OPTIONAL {?edificio pu:name_building_environment ?nombedificio}.
                ?edificio rdf:type dogont:Building.
                ?persona pu:own ?edificio.
                }"""
        resultado = self.ontologia.consultaDataProperty(query)
        return resultado
    

    def consultarListaEdificiosConNumPisos(self):
        keys = ["nombreedificio", "flats"]
        query="""
                PREFIX pu:<http://localhost/default#>
                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#> 
                PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#>
                SELECT   ?nombedificio (count(?edificio) as ?tagcount)
                WHERE{               
                    OPTIONAL { 
                                        ?edificio pu:name_building_environment ?nombedificio.
                                        ?edificio rdf:type dogont:Building.
                                        ?persona pu:own ?edificio.
                                        ?parteCasa pu:name_building_environment ?nombreparte. 
                                        ?parteCasa rdf:type dogont:Flat. 
                                        ?edificio dogont:contains ?parteCasa.
                    }.
                }  GROUP BY ?edificio  ?nombedificio"""
        resultado = self.ontologia.consultaDataProperty(query)
        listaDiccionarios = []
        for item in resultado:
                diccionarioEcas = {}
                diccionarioEcas = self.pasarListaDiccionario(item, keys)
                listaDiccionarios.append(diccionarioEcas)
        return listaDiccionarios
        
    def consultarListaEdificiosConObjetos(self):
        keys = ["nombreedificio", "name_object", "ip", "id"]
        query="""
                PREFIX pu: <http://localhost/default#> 
                PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#> 
                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#>
                SELECT  ?nombedificio 
                        ?nameobjeto ?ipobjeto ?idobjeto  
                WHERE{   
                    OPTIONAL{
                        ?objeto pu:ipObject ?ipobjeto.                         
                        ?objeto pu:name_object ?nameobjeto.                        
                        ?objeto oos:id_object ?idobjeto .                        
                        ?objeto rdf:type oos:Object.
                        ?edificio pu:related ?objeto. 
                        ?edificio pu:name_building_environment ?nombedificio.  
                        ?edificio rdf:type dogont:Building.
                    }.       
                }"""
        resultado = self.ontologia.consultaDataProperty(query)
        listaDiccionarios = []
        for item in resultado:
                diccionarioEcas = {}
                diccionarioEcas = self.pasarListaDiccionario(item, keys)
                listaDiccionarios.append(diccionarioEcas)
        return listaDiccionarios

    def consultarListaEdificiosConPartes(self):
        keys = [  "nombreedificio",  "nombreparte", "nombrepiso" ,  "typeParte"]
        query="""PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX pu: <http://localhost/default#> PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#> 
        SELECT DISTINCT ?nombedificio ?nombreparte   ?nombrepiso   (strafter(str(?typeParte),str(dogont:)) as ?q)
        WHERE 
        {
           ?edificio pu:name_building_environment ?nombedificio.                   
           ?edificio rdf:type dogont:Building.    
           OPTIONAL 
           {?piso pu:name_building_environment ?nombrepiso.  
            ?piso rdf:type dogont:Flat.   
            ?parteCasa pu:name_building_environment ?nombreparte.
            ?parteCasa rdf:type ?typeParte.    
            ?typeParte rdfs:subClassOf* dogont:BuildingEnvironment.
            ?piso dogont:contains ?parteCasa. 
            ?edificio dogont:contains ?piso.
           }
        }"""
        resultado = self.ontologia.consultaDataProperty(query)
        listaDiccionarios = []
        for item in resultado:
                diccionarioEcas = {}
                diccionarioEcas = self.pasarListaDiccionario(item, keys)
                listaDiccionarios.append(diccionarioEcas)
        return listaDiccionarios
    
    def consultarCosasEdificioConObjetosRelacionadosACosas(self): # partes, pisos, cosas, objetos
        keys = [ "nombreedificio","nombreparte", "typeParte", "nombrepiso", "name_thing", "typething", "especiecosa", "comidacosa", "tipocosaviva",   "name_object", "ip", "id"]
        query = """
                PREFIX pu: <http://localhost/default#> 
                PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#> 
                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#>
                SELECT  ?nombedificio ?nombreparte   (strafter(str(?typeParte),str(dogont:)) as ?q)  ?nombrepiso
                        ?nombreCosa (strafter(str(?typething),str(pu:)) as ?r) ?especiecosa ?comidacosa  ?tipocosaviva
                        ?nameobjeto ?ipobjeto ?idobjeto  
                WHERE{
                    ?edificio pu:name_building_environment ?nombedificio.  
                    ?edificio rdf:type dogont:Building.                    
                    OPTIONAL {
                        ?piso pu:name_building_environment ?nombrepiso.                          
                        ?piso rdf:type dogont:Flat.                           
                        ?parteCasa pu:name_building_environment ?nombreparte.
                        ?parteCasa rdf:type ?typeParte.                            
                        ?typeParte rdfs:subClassOf* dogont:BuildingEnvironment.                        
                        ?piso dogont:contains ?parteCasa.                         
                        ?edificio dogont:contains ?piso
                    }.                    
                    OPTIONAL{  
                        ?entity pu:name_thing ?nombreCosa. 
                        ?entity rdf:type ?typething.   
                        ?typething rdfs:subClassOf* pu:Thhings.  
                        ?entity oos:isUbicated ?parteCasa. 
                        ?edificio dogont:contains ?parteCasa
                    }.
                    OPTIONAL{
                        ?entity pu:specie_living_thing ?especiecosa.
                        ?entity pu:food_living_thing ?comidacosa.
                        ?entity pu:type_living_thing ?tipocosaviva.
                        ?entity rdf:type pu:Living_Thing. 
                        ?entity oos:isUbicated ?parteCasa. 
                        ?edificio dogont:contains ?parteCasa}.
                    OPTIONAL{
                        ?objeto pu:ipObject ?ipobjeto.                         
                        ?objeto pu:name_object ?nameobjeto.                        
                        ?objeto oos:id_object ?idobjeto .                        
                        ?objeto rdf:type oos:Object.
                        ?entity pu:related ?objeto. 
                        ?entity oos:isUbicated ?parteCasa. 
                        ?edificio dogont:contains ?parteCasa
                    }.       
                }"""
        resultado = self.ontologia.consultaDataProperty(query)
        listaDiccionarios = []
        for item in resultado:
                diccionarioEcas = {}
                diccionarioEcas = self.pasarListaDiccionario(item, keys)
                listaDiccionarios.append(diccionarioEcas)
        return listaDiccionarios
        
    def consultarPartesEdificioConObjetosRelacionados(self): # partes, pisos, cosas, objetos
        keys = [ "nombreedificio","nombreparte", "typeParte", "nombrepiso",   "name_object", "ip", "id"]
        query = """
                     PREFIX pu: <http://localhost/default#> 
                     PREFIX dogont: <http://elite.polito.it/ontologies/dogont.owl#> 
                     PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#> 
                     SELECT DISTINCT ?nombedificio ?nombreparte  (strafter(str(?typeParte),str(dogont:)) as ?q)   ?nombrepiso     
                     ?nameobjeto ?ipobjeto ?idobjeto  
                     WHERE  {   
                       OPTIONAL {                                    
                                   ?edificio pu:name_building_environment ?nombedificio.         
                                   ?edificio rdf:type dogont:Building. 
                                   ?piso pu:name_building_environment ?nombrepiso.   ?piso rdf:type dogont:Flat.   
                                    ?parteCasa pu:name_building_environment ?nombreparte.
                                    ?parteCasa rdf:type ?typeParte.    
                                    ?typeParte rdfs:subClassOf* dogont:BuildingEnvironment.
                                    ?piso dogont:contains ?parteCasa. 
                                    ?edificio dogont:contains ?piso.
                       }
                        OPTIONAL{
                                    ?objeto pu:ipObject ?ipobjeto.                         
                                    ?objeto pu:name_object ?nameobjeto.                        
                                    ?objeto oos:id_object ?idobjeto .                        
                                    ?objeto rdf:type oos:Object.
                                    ?parteCasa pu:related ?objeto. 
                                    ?edificio dogont:contains ?parteCasa
                        }. 
                    }
                """
        resultado = self.ontologia.consultaDataProperty(query)
        listaDiccionarios = []
        for item in resultado:
                diccionarioEcas = {}
                diccionarioEcas = self.pasarListaDiccionario(item, keys)
                listaDiccionarios.append(diccionarioEcas)
        return listaDiccionarios
        
    def consultaObjetosRelated(self):
        ##['Regulador de Luz', '192.168.0.108', '78091938', 'casa', '', 'Mi cuarto']
        ##keys = [ "nombreedificio", "flats","nombreparte", "typeParte", "nombrepiso", "name_thing", "typething", "especiecosa", "comidacosa", "tipocosaviva",   "name_object", "ip", "id"]
                     
        ##try:
            ##Consulta los edificios con el numero de pisos
            queryPisosEdificio  =    self.consultarListaEdificiosConNumPisos()   
            queryObjetosEdificios = self.consultarListaEdificiosConObjetos()
            queryPartesEdificioConObjetos =  self.consultarPartesEdificioConObjetosRelacionados()
            queryCosasConObjetos =  self.consultarCosasEdificioConObjetosRelacionadosACosas()
            listaDiccionarios = queryPisosEdificio + queryObjetosEdificios  + queryPartesEdificioConObjetos  +queryCosasConObjetos
           ## pprint.pprint(listaDiccionarios)
            return listaDiccionarios
#        except Exception as e:
#            print "Error en getECA ontologias pck"
#            print e

    def consultarPreferencias(self):
        #self.ontologia = Ontologia()
        #keys=['name_eca','eca_state','id_event_resource', 'ip_event_object','comparator_condition','variable_condition','type_variable_condition','unit_condition','meaning_condition','ip_action_object','osid_object_action','name_action_object' ,'comparator_action','type_variable_action','variable_action','meaning_action','id_action_resource','name_action_resource']
        keys = ['name_preference','state_preference','osid_object_event','ip_event_object','name_event_object','id_event_resource','name_event_resource','comparator_condition','variable_condition','type_variable_condition','unit_condition','meaning_condition','osid_object_action','ip_action_object','name_action_object','id_action_resource','name_action_resource','comparator_action','variable_action','type_variable_action','unit_action','meaning_action' ]
        query="""PREFIX :<http://semanticsearchiot.net/sswot/Ontologies#>
                    PREFIX pu: <http://localhost/default#> 
                    SELECT DISTINCT ?name_preference ?state_preference 
                    ?osid_object_event ?ip_event_object ?name_event_object
                    ?id_event_resource ?name_event_resource
                    ?comparator_condition ?variable_condition ?type_variable_condition ?unit_condition ?meaning_condition
                    ?osid_object_action ?ip_action_object  ?name_action_object
                    ?id_action_resource ?name_action_resource 
                    ?comparator_action ?variable_action ?type_variable_action  ?unit_action ?meaning_action 
                where{
                    ?eca pu:name_preference ?name_preference.
                    ?eca pu:state_preference ?state_preference.
                    ?eca rdf:type pu:Preference.
                    ?evento :id_event_object ?osid_object_event.
                    ?evento :ip_event_object ?ip_event_object.
                    ?evento :id_event_resource ?id_event_resource.
                    ?evento :name_event_object ?name_event_object.
                    ?evento rdf:type :Event.
                    ?condicion :comparator_condition ?comparator_condition. 
                    ?condicion :variable_condition ?variable_condition. 
                    ?condicion :type_variable_condition ?type_variable_condition. 
                    ?condicion :unit_condition ?unit_condition. 
                    ?condicion :meaning_condition ?meaning_condition. 
                    ?condicion rdf:type :Condition.
                    ?accion :id_action_object ?osid_object_action.
                    ?accion :name_action_object ?name_action_object.
                    ?accion :ip_action_object ?ip_action_object.
                    ?accion :comparator_action ?comparator_action.
                    ?accion :type_variable_action ?type_variable_action.
                    ?accion :variable_action ?variable_action. 
                    ?accion :meaning_action ?meaning_action.
                    ?accion :id_action_resource ?id_action_resource.
                    ?accion :unit_action ?unit_action.
                    ?accion :name_action_resource ?name_action_resource.
                    ?accion rdf:type :Action.
                    ?eca :StartsWith ?evento.
                    ?evento :Check ?condicion.
                    ?condicion ?isRelatedWith ?accion.
               }"""
        try:
            resultadoConsulta=self.ontologia.consultaDataProperty(query)
            diccionarioEcas = []
            for eca in resultadoConsulta:
                diccionarioEcas.append(self.pasarListaDiccionario(eca, keys))
            return diccionarioEcas
        except Exception as e:
            print("Error en listarontologios ontologias pck")
            print(e)

                                            
    ########################################################################################################################
    def pasarListaDiccionario(self, lista, keys):
        dicAux = {}
        i = 0#      
        for key in keys:
            dicAux[key] = lista[i]
            i = i+1
        return dicAux
    
    def decodificar(self, diccionario):
        for key in diccionario:
            try:
                diccionario[key]=diccionario[key].decode("utf8")
            
            except:
                diccionario[key]=diccionario[key]
                
        return diccionario
 #################################################################################################################


#PREFIX : <http://localhost/default#>
#                PREFIX  oos: <http://semanticsearchiot.net/sswot/Ontologies#>
#                SELECT ?name_person ?email ?date_of_birth ?surname ?gender ?celullar  ?facebook  ?place_of_birth
#                WHERE {
#                    ?entity :name_person ?name_person.
#                    ?entity :date_of_birth ?date_of_birth.
#                    ?entity :surname ?surname.
#                    ?entity :gender ?gender.
#                    ?entity :email ?email  FILTER regex(?email, '^jlr$').
#                    OPTIONAL {?entity :celullar ?celullar}.
#                    OPTIONAL {?entity :facebook ?facebook}.
#                    OPTIONAL {?entity :place_of_birth ?place_of_birth}.
#                    ?entity rdf:type :Person.
#                }

