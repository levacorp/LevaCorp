
from Ontologia import Ontologia
import UrisPu
from rdflib import Literal
import AuxiliaresPck.AppUtil as AppUtil
import os

class PoblarPerfilUsuario:

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

    def poblarAplicacion(self, dicApp,email):
        try:
            uriAplication = UrisPu.individuoApplication  + dicApp['name_app'] + email
            self.ontologia.insertarIndividuo(uriAplication, UrisPu.individuoApplication)
            listaApp=[]
            listaApp.append([uriAplication,UrisPu.dp_user_app,Literal(dicApp['user_app'])])
            listaApp.append([uriAplication,UrisPu.dp_password_app,Literal(dicApp['password_app'])])
            listaApp.append([uriAplication,UrisPu.dp_name_app,Literal(dicApp['name_app'])])
            self.ontologia.insertarListaDataProperty(listaApp)
            uriLogin=UrisPu.op_login
            uriPersona = UrisPu.individuoPersona + email
            self.ontologia.insertarIndividuo(uriPersona, UrisPu.individuoPersona)
            self.ontologia.insertarObjectProperty(uriPersona,uriLogin,uriAplication)
            listapersona =[]
            listapersona .append([uriPersona, UrisPu.dp_email,Literal(email)] )
            self.ontologia.insertarListaDataProperty(listapersona)
            return True
        except Exception as e:
            print(e)
            return False
    
    def poblarPersona(self,dicPersona):
        try:
            uriPersona = UrisPu.individuoPersona+dicPersona['email']
            self.ontologia.insertarIndividuo(uriPersona, UrisPu.individuoPersona)
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
            self.ontologia.insertarListaDataProperty(listaPersona)
            return True
        except Exception as e:
            print(e)
            return False

    def poblarObject(self, dic):
        #### 'name_object': 'Regulador de Humedad en Planta', 'name_thing': 'Suculentita', 'ip_object': '192.168.10.118', 'id_object': '1931642039' // cuando pertenece a una cosa
        #### 'name_building': 'casa', 'name_object': 'Regulador de Humedad en Planta', 'ip_object': '192.168.10.118', 'id_object': '1931642039' // Cuando pertenece a un edificio
        #### 'name_house_part': 'casa', 'name_object': 'Regulador de Humedad en Planta', 'ip_object': '192.168.10.118', 'id_object': '1931642039'// //cuando pertenece a una parte de la cas
        try:
            uriIndividuoObject = UrisPu.individuoObject + dic['id_object']
            self.ontologia.insertarIndividuo(uriIndividuoObject, UrisPu.individuoObject)
            lista = []
            lista.append([uriIndividuoObject, UrisPu.dp_ip_object, Literal(dic['ip_object'])])
            lista.append([uriIndividuoObject, UrisPu.dp_id_object, Literal(dic['id_object'])])
            lista.append([uriIndividuoObject, UrisPu.dp_name_object, Literal(dic['name_object'])])
            #        lista.append([uriIndividuoObject,UrisPu.,Literal(dic[''])])
            self.ontologia.insertarListaDataProperty(lista)
            uriRelated = UrisPu.op_related
            if dic.has_key("name_thing"):
                uriRelatedWith = UrisPu.individuoThhings + dic['name_thing'].replace(" ", "_") + dic['email']
            elif dic.has_key("name_building") and not dic.has_key("name_house_part"):
                uriRelatedWith = UrisPu.individuoBuilding + dic['name_building'].replace(" ", "_") + dic['email']
            elif dic.has_key("name_house_part"):
                nombreParte = self.tipoParteCasa(dic['name_part'])
                uriRelatedWith = UrisPu.individuoDogont + nombreParte + dic['name_house_part'].replace(" ", "_") + \
                                 dic['name_building'].replace(" ", "_") + dic['email']
            if dic.has_key("name_thing") or (
                dic.has_key("name_building") and not dic.has_key("name_house_part")) or dic.has_key(
                    "name_house_part"):
                self.ontologia.insertarObjectProperty(uriRelatedWith, uriRelated, uriIndividuoObject)
            return True
        except Exception as e:
            print(e)
            return False




########################################################################################################################
        
    def poblarBuildingEnvironment(self,dic):
        #if dic['name_part'] == "Building":
        if not dic.has_key("name_part"):
            self.poblarBuild(dic)
        else:
            self.poblarParteCasa(dic)

        
    def poblarBuild(self,dic):
        try:
            uri = UrisPu.individuoBuilding + dic['name_building'].replace(" ","_") + dic['email']

            self.ontologia.insertarIndividuo(uri,UrisPu.individuoBuilding)
            lista=[]
            lista.append([uri, UrisPu.dp_name_building_environment, Literal(dic['name_building'])])
            #lista.append([uri, UrisPu.dp_score_thing, Literal(dic['score_thing'])])
            self.ontologia.insertarListaDataProperty(lista)
            uri_own=UrisPu.op_own
            uriPersona = UrisPu.individuoPersona+dic['email']
            self.ontologia.insertarObjectProperty(uriPersona,uri_own,uri)

            uri_stay = UrisPu.op_stay
            uriPersona = UrisPu.individuoPersona+dic['email']
            self.ontologia.insertarObjectProperty(uriPersona,uri_stay,uri)
            return True
        except Exception as e:
            print("Desde PoblarBuild ")
            print(e)
            return False
    
    def poblarParteCasa(self,dic):
        print(dic)
        try:
            nombreParte = self.tipoParteCasa( dic['name_part'])
            uri_individuo = UrisPu.individuoDogont +nombreParte + dic['name_thing'].replace(" ","_") + dic['name_building'].replace(" ","_")+dic['email']
            uri_Dogont = UrisPu.individuoDogont + nombreParte
            self.ontologia.insertarIndividuo(uri_individuo, uri_Dogont)
            lista=[]
            lista.append([uri_individuo, UrisPu.dp_name_building_environment, Literal(dic['name_thing'])])
            self.ontologia.insertarListaDataProperty(lista)
            uri_contains = UrisPu.op_contains
            if dic.has_key("name_flat"):
                uriFlat = UrisPu.individuoFlat + dic['name_flat'].replace(" ","_") + dic['name_building'].replace(" ","_") + dic['email'] 
                self.ontologia.insertarObjectProperty(uriFlat, uri_contains,  uri_individuo) 
            uriBuilding = UrisPu.individuoBuilding + dic['name_building'].replace(" ","_") + dic['email']
            self.ontologia.insertarObjectProperty(uriBuilding, uri_contains,  uri_individuo)
            return True
        except Exception as e:
            print("Desde poblar PartteCasa" + str(e))
            return False  
        
    def poblarThing(self,dicthing):
        if dicthing['type_thing']== "non_living_thing":
            self.poblarNonLiving_Thing(dicthing)
            
        elif dicthing['type_thing']== "living_thing":
            self.poblarLiving_Thing(dicthing)
            
        else:
            return False
       
            
    def poblarLiving_Thing(self,dicLivingThing):
        try:
            uriLivingThing = UrisPu.individuoThhings + dicLivingThing['name_thing'].replace(" ","_") + dicLivingThing['email']
            self.ontologia.insertarIndividuo(uriLivingThing,UrisPu.individuoLiving_Thing)
            listaindividuoLiving_Thing=[]
            listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.dp_name_thing,Literal(dicLivingThing['name_thing'])])
            if(dicLivingThing.has_key("score_thing")):
                listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.dp_score_thing,Literal(dicLivingThing['score_thing'])])
            listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.dp_type_living_thing,Literal(dicLivingThing['type_living_thing'])])
            listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.dp_specie_living_thing,Literal(dicLivingThing['specie_living_thing'])])
            listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.dp_food_living_thing,Literal(dicLivingThing['food_living_thing'])])
            #listaindividuoLiving_Thing.append([uriLivingThing,UrisPu.,Literal(dicLivingThing[''])])
            self.ontologia.insertarListaDataProperty(listaindividuoLiving_Thing)
            uri_own=UrisPu.op_own
            uriPersona = UrisPu.individuoPersona+dicLivingThing['email']
            self.ontologia.insertarObjectProperty(uriPersona,uri_own,uriLivingThing)
            if(dicLivingThing.has_key("name_building_environment")):
                uri_isUbicated=UrisPu.op_isUbicated
                nombreParte = self.tipoParteCasa( dicLivingThing['name_part'])
                nombreBuildingEnvironment = dicLivingThing['name_building_environment'].replace(" ","_") 
                uri_Dogont = UrisPu.individuoDogont + nombreParte +nombreBuildingEnvironment + dicLivingThing['name_building'].replace(" ","_")+dicLivingThing['email']
            
                self.ontologia.insertarObjectProperty(uriLivingThing,uri_isUbicated,uri_Dogont)
            
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarNonLiving_Thing(self,dicNonLivingThing):
        print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        try:
            uriNonLivingThing = UrisPu.individuoThhings + dicNonLivingThing['name_thing'].replace(" ","_") + dicNonLivingThing['email']
            self.ontologia.insertarIndividuo(uriNonLivingThing, UrisPu.individuoNon_living_Thing)
            listaindividuoNonLiving_Thing = []
            listaindividuoNonLiving_Thing.append([uriNonLivingThing, UrisPu.dp_name_thing, Literal(dicNonLivingThing['name_thing'])])
            if(dicNonLivingThing.has_key("score_thing")):
                listaindividuoNonLiving_Thing.append([uriNonLivingThing, UrisPu.dp_score_thing, Literal(dicNonLivingThing['score_thing'])])
            self.ontologia.insertarListaDataProperty(listaindividuoNonLiving_Thing)
            uri_own = UrisPu.op_own
            uriPersona = UrisPu.individuoPersona + dicNonLivingThing['email']
            self.ontologia.insertarObjectProperty(uriPersona, uri_own, uriNonLivingThing)
            if(dicNonLivingThing.has_key("name_building_environment")):
                uri_isUbicated = UrisPu.op_isUbicated
                nombreParte = self.tipoParteCasa( dicNonLivingThing['name_part'])
                nameBuildingEnvironment = dicNonLivingThing['name_building_environment'].replace(" ","_") 
                uri_Dogont = UrisPu.individuoDogont + nombreParte + nameBuildingEnvironment+ dicNonLivingThing['name_building'].replace(" ","_")+dicNonLivingThing['email']
                self.ontologia.insertarObjectProperty(uriNonLivingThing, uri_isUbicated,uri_Dogont)
            return True
        except Exception as e:
            print(e)
            return False
        


        
    def porblarProfession(self,dicProfession):
        try:
            uriProfession =UrisPu.individuoProfession+dicProfession['name_profession']+"_"+dicProfession['email']
            self.ontologia.insertarIndividuo(uriProfession, UrisPu.uriProfession)       
            listaProfession = []
            listaProfession.append([uriProfession,UrisPu.dp_name_profession,Literal(dicProfession['name_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_address_profession,Literal(dicProfession['address_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_telephone_profession,Literal(dicProfession['telephone_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_city_profession,Literal(dicProfession['city_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_country_profession,Literal(dicProfession['country_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_email_profession,Literal(dicProfession['email_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_fulltime_profession,Literal(dicProfession['fulltime_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_manual_profession,Literal(dicProfession['manual_profession'])])
            listaProfession.append([uriProfession,UrisPu.dp_hours_per_day_profession,Literal(dicProfession['hours_per_day_profession'])])
        #listaProfession.append([uriProfession,UrisPu.,Literal(dicProfession[''])])
            self.ontologia.insertarListaDataProperty(listaProfession)
            uriPerform=UrisPu.op_perform
            uriPersona = UrisPu.individuoPersona+dicProfession['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriPerform,uriProfession)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarLiving_Condition(self, dicLiving_Condition):
        try:
            uriLiving_Condition=UrisPu.individuoLiving_Condition+"dicLiving_Condition['address_living']"+"_"+dicLiving_Condition['email']
            self.ontologia.insertarIndividuo(uriLiving_Condition, UrisPu.individuoLiving_Condition)  
            listaLivingCondition = []
            listaLivingCondition.append([uriLiving_Condition,UrisPu.dp_telephone_living,Literal(dicLiving_Condition['telephone_living'])])
            listaLivingCondition.append([uriLiving_Condition,UrisPu.dp_house_type_living,Literal(dicLiving_Condition['house_type_living'])])
            listaLivingCondition.append([uriLiving_Condition,UrisPu.dp_country_living,Literal(dicLiving_Condition['country_living'])])
            listaLivingCondition.append([uriLiving_Condition,UrisPu.dp_city_living,Literal(dicLiving_Condition['city_living'])])
            listaLivingCondition.append([uriLiving_Condition,UrisPu.dp_address_living,Literal(dicLiving_Condition['address_living'])])
        #listaLivingCondition.append([uriLiving_Condition,UrisPu,Literal(dicLiving_Condition[''])])
            self.ontologia.insertarListaDataProperty(listaLivingCondition)
            uriLive=UrisPu.op_live
            uriPersona = UrisPu.individuoPersona+dicLiving_Condition['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriLive,uriLiving_Condition)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarInterest(self,dicInterest):
        try:
            uriInteres = UrisPu.individuoInterest+dicInterest['name_interest']+"_"+dicInterest['email']
            self.ontologia.insertarIndividuo(uriInteres, UrisPu.individuoInterest)
            listaInterest = []
            listaInterest.append([uriInteres,UrisPu.dp_name_interest,Literal(dicInterest['name_interest'])])
            listaInterest.append([uriInteres,UrisPu.dp_score_interest,Literal(dicInterest['score_interest'])])
            listaInterest.append([uriInteres,UrisPu.dp_type_interest,Literal(dicInterest['type_interest'])])
            self.ontologia.insertarListaDataProperty(listaInterest)
            uriAgrre=UrisPu.op_agree
            uriPersona = UrisPu.individuoPersona+dicInterest['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriAgrre,uriInteres)
            return True            
        except Exception as e:
            print(e)
            return False
        
    def poblarPreference(self,dicPreference):
        try:
            uriPreference=UrisPu.individuoPreference+dicPreference['name_preference']+"_"+dicPreference['email']
            self.ontologia.insertarIndividuo(uriPreference, UrisPu.individuoPreference)
            listaPreference = []
            listaPreference.append([uriPreference,UrisPu.dp_score_preference,Literal(dicPreference['score_preference'])])
            listaPreference.append([uriPreference,UrisPu.dp_min_value_preference,Literal(dicPreference['min_value_preference'])])
            listaPreference.append([uriPreference,UrisPu.dp_name_preference,Literal(dicPreference['name_preference'])])
            listaPreference.append([uriPreference,UrisPu.dp_max_value_preference,Literal(dicPreference['max_value_preference'])])
            #listaPreference.append([uriPreference,UrisPu.,Literal(dicPreference[''])])
            self.ontologia.insertarListaDataProperty(listaPreference)
            uriSet=UrisPu.op_set
            uriPersona = UrisPu.individuoPersona+dicPreference['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriSet,uriPreference)
            return True 
        except Exception as e:
            print(e)
            return False
        
    def poblarHealth_Condition(self,dicHealth_Condition):
        try:
            uriHealth=UrisPu.individuoHealth_Condition+dicHealth_Condition['name_health']+"_"+dicHealth_Condition['email']
            self.ontologia.insertarIndividuo(uriHealth, UrisPu.individuoHealth_Condition)
            listaHealth = []
            listaHealth.append([uriHealth,UrisPu.dp_name_health,Literal(dicHealth_Condition['name_health'])])
            listaHealth.append([uriHealth,UrisPu.dp_type_health,Literal(dicHealth_Condition['type_health'])])
            listaHealth.append([uriHealth,UrisPu.dp_score_health,Literal(dicHealth_Condition['score_health'])])
            #listaHealth.append([uriHealth,UrisPu.,Literal(dicHealth_Condition[''])])
            self.ontologia.insertarListaDataProperty(listaHealth)
            uriPresent=UrisPu.op_present
            uriPersona = UrisPu.individuoPersona+dicHealth_Condition['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriPresent,uriHealth)
            return True 
        except Exception as e:
            print(e)
            return False
        
    def poblarMedicine(self,dicMedicine):
        try:
            uriMedicine=UrisPu.individuoMedicine+dicMedicine['name_medicene']++"_"+dicMedicine['email']
            self.ontologia.insertarIndividuo(uriMedicine,UrisPu.individuoMedicine)
            listaMedicine=[]
            listaMedicine.append([uriMedicine,UrisPu.dp_name_medicine,Literal(dicMedicine['name_medicine'])])
            listaMedicine.append([uriMedicine,UrisPu.dp_dose_medicine,Literal(dicMedicine['dose_medicine'])])
            #listaMedicine.append([uriMedicine,UrisPu.,Literal(dicMedicine[''])])
            return True
        except Exception as e:
            print(e)
            return False
        
        
    def poblarActual_situation(self,dicActualSituation):
        try:
            uriActual_Situation=UrisPu.individuoActualSituation+dicActualSituation['dp_current_time']+dicActualSituation['email']
            self.ontologia.insertarIndividuo(uriActual_Situation,UrisPu.individuoActualSituation)
            listaActual_situacion = []
            listaActual_situacion.append([ uriActual_Situation,UrisPu.dp_current_location,Literal(dicActualSituation['current_location'])])
            listaActual_situacion.append([ uriActual_Situation,UrisPu.dp_current_time,Literal(dicActualSituation['current_time'])])
            listaActual_situacion.append([ uriActual_Situation,UrisPu.dp_mood,Literal(dicActualSituation['mood'])])
            self.ontologia.insertarListaDataProperty(listaActual_situacion)
            uriCary_out=UrisPu.op_carry_out
            uriPersona = UrisPu.individuoPersona+dicActualSituation['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriCary_out,uriActual_Situation)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarActivity(self,dicActivity):
        try:
            uriActivity=UrisPu.individuoActivity+dicActivity['name_activity']+dicActivity['email']
            self.ontologia.insertarIndividuo(uriActivity,UrisPu.individuoActivity)
            lista_Activity = []
            lista_Activity.append([uriActivity,UrisPu.dp_name_activity,Literal(dicActivity['name_activity'])])
            lista_Activity.append([uriActivity,UrisPu.dp_description_activity,Literal(dicActivity['description_activity'])])
            lista_Activity.append([uriActivity,UrisPu.dp_hours_per_week_activity,Literal(dicActivity['hours_per_week_activity'])])
            lista_Activity.append([uriActivity,UrisPu.dp_score_activity,Literal(dicActivity['score_activity'])])
            lista_Activity.append([uriActivity,UrisPu.dp_temporary_activity,Literal(dicActivity['temporary_activity'])])
            lista_Activity.append([uriActivity,UrisPu.dp_type_activity,Literal(dicActivity['type_activity'])])
            #lista_Activity.append([uriActivity,UrisPu.,Literal(dicActivity[''])])
            self.ontologia.insertarListaDataProperty(lista_Activity)
            uriDo=UrisPu.op_do
            uriPersona = UrisPu.individuoPersona+dicActivity['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriDo,uriActivity)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarShedule_Activity(self,dicShedule_Activity):
        try:
            uriShedule_activity=UrisPu.individuoShedule_Activity+dicShedule_Activity['name_activity']+dicShedule_Activity['email']
            self.ontologia.insertarIndividuo(uriShedule_activity,UrisPu.individuoShedule_Activity)
            listaShedule = []
            listaShedule.append([uriShedule_activity,UrisPu.dp_start_date_activity,Literal(dicShedule_Activity['start_date_activity'])])
            listaShedule.append([uriShedule_activity,UrisPu.dp_end_date_activity,Literal(dicShedule_Activity['end_date_activity'])])
            self.ontologia.insertarListaDataProperty(listaShedule)
            #listaShedule.append([uriShedule_activity,UrisPu.,Literal(dicActivity['temporary_activity'])])
            uriRealize= UrisPu.op_realize
            uriActivity=UrisPu.individuoActivity+dicShedule_Activity['name_activity']+dicShedule_Activity['email']
            self.ontologia.insertarObjectProperty(uriShedule_activity,uriRealize,uriActivity)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarCharacteristic(self,dicCharacteristic):
        try:
            uriCharacteristic=UrisPu.individuoCharacteristic+dicCharacteristic['name_charac']+dicCharacteristic['email']
            self.ontologia.insertarIndividuo(uriCharacteristic,UrisPu.individuoCharacteristic)
            listaCharac=[]
            listaCharac.append([uriCharacteristic,UrisPu.dp_name_charac,Literal(['name_charac'])])
            listaCharac.append([uriCharacteristic,UrisPu.dp_value_charac,Literal(['value_charac'])])
            self.ontologia.insertarListaDataProperty(listaCharac)
            uriCharacterize=UrisPu.op_characterize
            uriPersona = UrisPu.individuoPersona+dicCharacteristic['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriCharacterize,uriCharacteristic)
            return True
        except Exception as e:
            print(e)
            return False
        
    def poblarExpertise(self,dicExpertise):
        try:
            uriExpertise=UrisPu.individuoExpertise+dicExpertise['dp_name_expertise']+dicExpertise['email']
            self.ontologia.insertarIndividuo(uriExpertise,UrisPu.individuoExpertise)
            listaExpertise=[]
            listaExpertise.append([uriExpertise,UrisPu.dp_name_expertise,Literal(dicExpertise['name_expertise'])])
            listaExpertise.append([uriExpertise,UrisPu.dp_years_of_experience,Literal(dicExpertise['years_of_experience'])])
            listaExpertise.append([uriExpertise,UrisPu.dp_score_expertise ,Literal(dicExpertise['score_expertise'])])
            self.ontologia.insertarListaDataProperty(listaExpertise)
            uriExpertize=UrisPu.op_posesse
            uriPersona = UrisPu.individuoPersona+dicExpertise['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriExpertize,uriExpertize)
            return True
        except Exception as e:
            print(e)
            return False
    
    def poblarAbility(self,dicAbility):
        try:
            uriAbility=UrisPu.individuoAbility+dicAbility['name_ability']+dicAbility['email']
            self.ontologia.insertarIndividuo(uriAbility,UrisPu.individuoAbility)
            listaAbilyty=[]
            listaAbilyty.append([uriAbility,UrisPu.dp_name_ability,Literal(dicAbility['name_ability'])])
            listaAbilyty.append([uriAbility,UrisPu.dp_score_ability,Literal(dicAbility['score_ability'])])
            listaAbilyty.append([uriAbility,UrisPu.dp_type_ability,Literal(dicAbility['type_ability'])])
            self.ontologia.insertarListaDataProperty(listaAbilyty)
            uriHave=UrisPu.op_have
            uriPersona = UrisPu.individuoPersona+dicAbility['email']
            self.ontologia.insertarObjectProperty(uriPersona,uriHave,uriAbility)
            return True
        except Exception as e:
            print(e)
            return False
    
    def poblarContac(self,dicContac):
        try:
            uriContac=UrisPu.individuoContact+dicContac['email']
            self.ontologia.insertarIndividuo(uriContac,UrisPu.individuoContact)
            listaContac=[]
            listaContac.append([uriContac,UrisPu.dp_type_contact,Literal(dicContac['type_contact'])])
            listaContac.append([uriContac,UrisPu.dp_frecuency_contact,Literal(dicContac['frecuency_contact'])])
            self.ontologia.insertarListaDataProperty(listaContac)
            uri_get_in_touch=UrisPu.op_get_in_touch
            uriPersona = UrisPu.individuoPersona+dicContac['email']
            self.ontologia.insertarObjectProperty(uriPersona,uri_get_in_touch,uriContac)      
            return True
        except Exception as e:
            print(e)
            return False
    
    def poblarInteraction(self,dic): ##id_object
        try:
            uriIndividuoObject = UrisPu.individuoObject + dic['id_object']
            uriShedule=UrisPu.individuoShedule_Interaction+dic['email'] + dic["date_interaction"]
            self.ontologia.insertarIndividuo(uriShedule,UrisPu.individuoShedule_Interaction)
            listaShedule=[]
            listaShedule.append([uriShedule, UrisPu.dp_id_resource_interaction , Literal(dic['resource_interaction'])])
            listaShedule.append([uriShedule, UrisPu.dp_type_command_interaction, Literal(dic['type_command_interaction'])])
            listaShedule.append([uriShedule, UrisPu.dp_date_interaction, Literal(dic['date_interaction'])])
            
            self.ontologia.insertarListaDataProperty(listaShedule)
            self.ontologia.insertarObjectProperty(uriIndividuoObject, UrisPu.op_receive_command, uriShedule)      
            return True
        except Exception as e:
            print(e)
            return False

    def tipoParteCasa(self, tipo):
        if tipo == "room" or tipo == "ROOM" or tipo == "Room":
            return "Room"
        elif tipo == "flat" or tipo == "FLAT" or tipo == "Flat":
            return "Flat"
        elif tipo == "storey" or tipo == "STOREY" or tipo == "Storey":
            return "Storey"
        elif tipo == "garden" or tipo == "GARDEN" or tipo == "Garden":
            return "Garden"
        elif tipo == "garage" or tipo == "GARAGE" or tipo == "Garage":
            return "Garage"
        elif tipo == "bathroom" or tipo == "bathRoom" or tipo == "BATHROOM" or tipo == "Bathroom" or tipo == "BathRoom":
            return "Bathroom"
        elif tipo == "diningroom" or tipo == "diningRoom" or tipo == "DININGROOM" or tipo == "Diningroom" or tipo == "DiningRoom":
            return "DiningRoom"
        elif tipo == "storageroom" or tipo == "storageRoom" or tipo == "STORAGEROOM" or tipo == "Storageroom" or tipo == "StorageRoom":
            return "StorageRoom"
        elif tipo == "Lobby" or tipo == "lobby" or tipo == "LOBBY":
            return "Lobby"
        elif tipo == "livingroom" or tipo == "liviningRoom" or tipo == "LIVINGROOM" or tipo == "Livingroom" or tipo == "LivingRoom":
            return "LivingRoom"
        elif tipo == "bedroom" or tipo == "bedRoom" or tipo == "BEDROOM" or tipo == "Bedroom" or tipo == "BedRoom":
            return "Bedroom"
        elif tipo == "kitchen" or tipo == "KITCHEN" or tipo == "Kitchen":
            return "Kitchen"
