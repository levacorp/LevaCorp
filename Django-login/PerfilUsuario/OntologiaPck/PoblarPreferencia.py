
from Ontologia import Ontologia
import UrisPu 
import UrisOos as uris
from rdflib import Literal
import AppUtil
import os

class PoblarPreferencia:
    def __init__(self, mac, idUsuario, accion):
        try:           
            os.stat(AppUtil.pathOWL)
        except:
            os.mkdir(AppUtil.pathOWL, 0x0777)
            
        if accion == "CARGAR":
            try:    
                self.path = AppUtil.pathOWL + mac + "&" + idUsuario + ".owl"
                self.ontologia = Ontologia(self.path)
            except:
                print("Desde PobladorPU. El path es incorrecto")
        elif accion == "CREAR":            
            self.path = AppUtil.pathOWL + mac + "&" + idUsuario + ".owl"
            self.ontologia = Ontologia(self.path)
            self.ontologia.crearNuevaOntologia(self.path)
    
    def poblarECA(self, diccionarioECA):
        print(diccionarioECA)
        nombreEca = diccionarioECA['name_preference'].replace(" ",  "_")
         ##Creacion de los individuos
        individuoECA = UrisPu.individuoPreference + nombreEca
        individuoEvento = uris.prefijo + nombreEca + "evento"
        individuoAccion = uris.prefijo + nombreEca + "accion"
        individuoCondicion = uris.prefijo + nombreEca + "condicion"
        listaIndividuos = []
        listaIndividuos.append([individuoECA, UrisPu.individuoPreference]);
        listaIndividuos.append([individuoEvento, uris.clase_event]);
        listaIndividuos.append([individuoAccion, uris.clase_Action]);
        listaIndividuos.append([individuoCondicion, uris.clase_condition]);
        self.ontologia.insertarListaIndividuos(listaIndividuos)

        dinamic = self.poblarDinamic(diccionarioECA, individuoECA)
        event = self.poblarEvent(diccionarioECA, individuoEvento)
        accion = self.poblarAction(diccionarioECA, individuoAccion)
        condicion = self.poblarCondition(diccionarioECA, individuoCondicion)
        self.ontologia.insertarListaDataProperty(dinamic + event + accion + condicion)

        listaObjectProperty = []
        listaObjectProperty.append([individuoECA , uris.op_starts_with, individuoEvento])
        listaObjectProperty.append([individuoEvento ,uris.op_check, individuoCondicion])
        listaObjectProperty.append([individuoCondicion , uris.op_is_related_with, individuoAccion])
        self.ontologia.insertarListaObjectProperty(listaObjectProperty)
        
                
    def poblarDinamic(self, diccionarioECA, individuoECA):
        dinamic = []
        #dinamic.append([individuoECA, self.uris.dp_, Literal(diccionarioECA[""])])
        dinamic.append([individuoECA, UrisPu.dp_name_preference, Literal(diccionarioECA["name_preference"])])
        dinamic.append([individuoECA, UrisPu.dp_state_preference, Literal(diccionarioECA["state_preference"])])
        if diccionarioECA.has_key("score_preference"):
            dinamic.append([individuoECA,  UrisPu.dp_score_preference,  Literal(diccionarioECA["score_preference"])])
        return dinamic        
##        self.ontologia.insertarListaDataProperty(dinamic)
        
    def poblarEvent(self, diccionarioECA, individuoEvento):
        event= []
         #dinamic.append([individuoEvento, self.uris.dp_, Literal(diccionarioECA[""])])
        event.append([individuoEvento, uris.dp_id_event_object, Literal(diccionarioECA["id_event_object"])])
        event.append([individuoEvento, uris.dp_ip_event_object, Literal(diccionarioECA["ip_event_object"])])
        event.append([individuoEvento, uris.dp_id_event_resource, Literal(diccionarioECA["id_event_resource"])])
        event.append([individuoEvento, uris.dp_name_event_resource, Literal(diccionarioECA["name_event_resource"])])
        event.append([individuoEvento, uris.dp_name_event_object, Literal(diccionarioECA["name_event_object"])])
        return event        
        
    def poblarAction(self, diccionarioECA, individuoAccion):
        action = []
        action.append([individuoAccion, uris.dp_comparator_action, Literal(diccionarioECA["comparator_action"])])
        action.append([individuoAccion,  uris.dp_id_action_resource, Literal(diccionarioECA["id_action_resource"])])
        action.append([individuoAccion, uris.dp_id_action_object, Literal(diccionarioECA["id_action_object"])])
        action.append([individuoAccion, uris.dp_ip_action_object, Literal(diccionarioECA["ip_action_object"])])
        action.append([individuoAccion, uris.dp_meaning_action, Literal(diccionarioECA["meaning_action"])])
        action.append([individuoAccion, uris.dp_name_action_object, Literal(diccionarioECA["name_action_object"])])
        action.append([individuoAccion, uris.dp_name_action_resource, Literal(diccionarioECA["name_action_resource"])])
        action.append([individuoAccion, uris.dp_type_variable_action, Literal(diccionarioECA["type_variable_action"])])
        action.append([individuoAccion, uris.dp_unit_action, Literal(diccionarioECA["unit_action"])])
        action.append([individuoAccion, uris.dp_variable_action, Literal(diccionarioECA["variable_action"])])
        return action        
        
    def poblarCondition(self, diccionarioECA, individuoCondicion):          
        condition = []
        condition.append([individuoCondicion, uris.dp_comparator_condition, Literal(diccionarioECA["comparator_condition"])])
        condition.append([individuoCondicion, uris.dp_meaning_condition, Literal(diccionarioECA["meaning_condition"])])
        condition.append([individuoCondicion, uris.dp_type_variable_condition, Literal(diccionarioECA["type_variable_condition"])])
        condition.append([individuoCondicion, uris.dp_unit_condition, Literal(diccionarioECA["unit_condition"])])
        condition.append([individuoCondicion, uris.dp_variable_condition, Literal(diccionarioECA["variable_condition"])])
        return condition        
