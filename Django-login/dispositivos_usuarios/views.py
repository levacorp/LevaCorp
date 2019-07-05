from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

from .models import Dispositivo_Usuario
from .forms import BuscarDispositivoForm
from .forms import AgregarDispositivoForm
from .forms import obtenerIP
from .forms import infoDispositivo
from .ConexionIndiceSemantico import ConexionIndiceSemantico
from .conexionEstado import conexionEstado
from django.contrib import messages

from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse

from datetime import datetime


class agregarView(View):

    @method_decorator(login_required)
    def get(self, request, id):
        form = AgregarDispositivoForm(initial={'idDispositivo': id})
        disp = ConexionIndiceSemantico(id)

        return render(request, "agregar.html", {'form': form, 'disp': disp})

    @method_decorator(login_required)
    def post(self, request, id):
        form = AgregarDispositivoForm(request.POST)
        if form.is_valid():
            idDisp = form.cleaned_data['idDispositivo']

            siExiste = Dispositivo_Usuario.objects.filter(idUsuario=request.user, idDispositivo=idDisp).count()
            if siExiste == 1:
                print("Dispositivo ya existente")
            else:
                print("Dispositivo nuevo")
                nuevo = Dispositivo_Usuario(idUsuario=request.user, idDispositivo=idDisp, ipDispositivo="192.168.0.21")
                nuevo.save()

        return redirect("homepage")

@login_required()
def estadosDispositivos(request):
    conexion = conexionEstado()
    if request.method == "GET":
        listaDisp = obtenerDispositivos(request.user.id)
        lista = []
        diccionario = {}
        for i in listaDisp:

            id = i.getId()
            ip = Dispositivo_Usuario.objects.get(idUsuario=request.user, idDispositivo=id).ipDispositivo

            diccionario = conexion.estadosDispositivos(ip, id)
            args = {}
            if diccionario != None:
                args = {"mensaje": ""}
            else:
                args = {"mensaje": "No se pudo hacer la conexión. Ir a inicializar"}
            args.update({"nombre": i.getTitle()})
            lista.append(args)

    return render(request, "Estado.html", {"lista": lista})

@login_required()
def estadoDispositivo(request, id, nombre):
    conexion = conexionEstado()
    if request.method == "POST":
        if 'ipDispositivo' in request.POST:
            form = obtenerIP(request.POST)
            if form.is_valid():
                obj = Dispositivo_Usuario.objects.get(idUsuario=request.user, idDispositivo=id)
                obj.ipDispositivo = form.cleaned_data['ipDispositivo']
                obj.save()
            else:
                messages.error(request, "Campo incorrecto")
            return redirect("/dispositivos/estados/("+ str(id) +", "+ nombre+")")

    elif request.method == "GET":
        diccionario = {}
        obj = Dispositivo_Usuario.objects.get(idUsuario=request.user, idDispositivo=id)

        ip = obj.ipDispositivo

        args = {}
        diccionario = conexion.estadosDispositivos(ip, id)

        if diccionario != None:
            args = {"mensaje": "", "diccionario": diccionario, "nombre": nombre}
        else:
            args = {"mensaje": "No se pudo hacer la conexión con la ip ", "nombre": nombre}

        return render(request, "controlDispositivo.html", args)


@login_required()
def agregarDispositivo(request):
    
    if request.method == "POST":
        form = BuscarDispositivoForm(request.POST)
        if form.is_valid():
            id = form.cleaned_data['id']
            disp = ConexionIndiceSemantico(id)

            if disp.getId() is None:
                # Mostrar mensaje que no se encontró el dispositivo
                messages.error(request, "Dispositivo no encontrado")
                args = {'form': form, 'mensaje': 'No se encontró el dispositivo'}
                return render(request, "agregarDispositivo.html", args)
            else:
                messages.error(request, "Dispositivo encontrado")
                return redirect("confirmarAgregar", id)

    form = BuscarDispositivoForm()
    return render(request, "agregarDispositivo.html", {"form": form})


@login_required()
def crearDispositivo(request):
    if request.method == 'POST':
        #form = infoDispositivo(request.POST)
        lista = request.GET.get('pruebaFuego')
        print(lista)
        #   if form.is_valid():
        #    dataJSON = crearJSON(form)
        #    print("entro")
        #    response = JsonResponse(dataJSON)
        #    response['Content-Disposition'] = 'attachment; filename="' + str(form.cleaned_data["idDispositivo"]) + '.json"'
        #    print(response)
        #    return response
    #else:
    #    form = infoDispositivo()
    return render(request, 'crearDispositivo.html')


# Local Method
def crearJSON(form):
    
    diccionario = {}
    diccionario["Conceptos"] = ["sala de estar"]
    diccionario["lugares"] = None
    diccionario["feed"] = {"id": str(form.cleaned_data["idDispositivo"]),
                           "title": form.cleaned_data["titulo"],
                           "Private": False,
                           "tags": [form.cleaned_data["tagEntidadEsp"],
                                    form.cleaned_data["tagEntidadIng"],
                                    form.cleaned_data["tagFuncionalidadEsp"],
                                    form.cleaned_data["tagFuncionalidadIng"],
                                    form.cleaned_data["tagNombreEsp"],
                                    form.cleaned_data["tagNombreIng"],
                            ],
                           "description":form.cleaned_data["descripcion"],
                           "feed": "https://api.xively.com/v2/feeds/708637323.json",
                           "auto_feed_url": None,
                           "status": 0,
                           "updated": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                           "created": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                           "creator": "https://personal.xively.com/users/manzamb",
                           "version": None,
                           "website": None,
                           "datastreams":[
                               {
                                "feedid": None,
                                "id": form.cleaned_data["dsNombre"],
                                "current_value": None,
                                "at": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                                "max_value": form.cleaned_data["dsValorMax"],
                                "min_value": form.cleaned_data["dsValorMin"],
                                "tags": [form.cleaned_data["dsTagEsp"],
                                         form.cleaned_data["dsTagIng"],
                                ],
                                "unit": {
                                    "symbol": form.cleaned_data["dsUnidad"],
                                    "label": form.cleaned_data["dsEtiqueta"],
                                    "unitType": form.cleaned_data["dsTipo"]
                                },
                                "datapoints": None,
                               }

                           ],
                           "location": {
                               "name": None,
                               "domain": 0,
                               "lat": str(form.cleaned_data["localizacionLatitud"]),
                               "lon": str(form.cleaned_data["localizacionLongitud"]),
                               "ele": str(form.cleaned_data["localizacionElevacion"]),
                               "exposure": 0,
                               "disposition": 0
                           },
                           "TitleHTML": "<a style=\"color: #336600; font-size:110%;\"  href=\"https://xively.com/feeds/" + str(form.cleaned_data["idDispositivo"]) + "\" >" + form.cleaned_data["titulo"] + "</a>",
                           "URLMostrar": "https://xively.com/feeds/" + str(form.cleaned_data["idDispositivo"])
                           },
    diccionario["pathfeed"] = "D:\\Aplicaciones\\SemanticSearchIoT\\WSSemanticSearch\\App_Data\\Json_Data\\" + str(form.cleaned_data["idDispositivo"]) + ".json"
    diccionario["DocumentJSON"] = None

    #dataJson = json.dumps(diccionario)
    return diccionario


# Local Method
def obtenerDispositivos(idUsuario):
    idDispositivos = Dispositivo_Usuario.objects.filter(idUsuario=idUsuario)
    listaDisp = []

    for i in idDispositivos:
        disp = ConexionIndiceSemantico(i.idDispositivo)
        if disp.getId() is not None:
            listaDisp.append(disp)
    return listaDisp

