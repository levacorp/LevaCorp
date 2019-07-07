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
        args.update({"ipDispositivo": ip})
        args.update({"idDispositivo": id})
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
                args = {'form': form}
                return render(request, "agregarDispositivo.html", args)
            else:
                return redirect("confirmarAgregar", id)

    form = BuscarDispositivoForm()
    return render(request, "agregarDispositivo.html", {"form": form})


@login_required()
def crearDispositivo(request):
    if request.method == 'POST':

        ##Informacion Básica
        #form = infoDispositivo(request.POST)
        idDispositivo = request.POST.get('idDispositivo')
        titulo = request.POST.get('titulo')
        localizacionLatitud = request.POST.get('localizacionLatitud')
        localizacionLongitud = request.POST.get('localizacionLongitud')
        localizacionElevacion = request.POST.get('localizacionElevacion')
        descripcion = request.POST.get('descripcion')


        ## Tags
        tagEntidadEsp = request.POST.get('tagEntidadEsp')
        tagEntidadIng = request.POST.get('tagEntidadIng')
        tagFuncionalidadEsp = request.POST.get('tagFuncionalidadEsp')
        tagFuncionalidadIng = request.POST.get('tagFuncionalidadIng')
        tagNombreEsp = request.POST.get('tagNombreEsp')
        tagNombreIng = request.POST.get('tagNombreIng')

        existe = True
        cont = 1
        tags = []
        while(existe):
            valorEsp = 'tagEspanol'+ str(cont)
            valorIng = 'tagIngles' + str(cont)
            if request.POST.get(valorEsp) and request.POST.get(valorIng):
                tags.append(request.POST.get(valorEsp))
                tags.append(request.POST.get(valorIng))
                print("Se obtuvo")
            else:
                existe = False
                print("No se obtuvo")
            cont = cont + 1

        print(tags)

        ##DataStreams
        existeDataStream = True
        datastreams = []
        cont = 0
        while(existeDataStream):
            valor = 'inputNombre'+ str(cont)
            if request.POST.get(valor):
                existeTags = True
                contTags = 1
                listaTags = []
                while(existeTags):
                    valorTagEsp = 'inputEspanolTag'+str(contTags) + 'DataStream' + str(cont)
                    valorTagIng = 'inputInglesTag' + str(contTags) + 'DataStream' + str(cont)
                    if request.POST.get(valorTagEsp) and request.POST.get(valorTagIng):
                        listaTags.append(request.POST.get(valorTagEsp))
                        listaTags.append(request.POST.get(valorTagIng))
                    else:
                        existeTags = False
                    contTags = contTags + 1
                datastreams.append([
                    request.POST.get('inputNombre'+str(cont)),
                    request.POST.get('inputValorMaximo'+str(cont)),
                    request.POST.get('inputValorMinimo' + str(cont)),
                    request.POST.get('inputSimbolo' + str(cont)),
                    request.POST.get('inputEtiqueta' + str(cont)),
                    request.POST.get('inputTipo' + str(cont)),
                    listaTags
                ])
            else:
                existeDataStream = False
            cont = cont + 1

        print(datastreams)
        dataJSON = crearJSON(idDispositivo, titulo, localizacionLatitud, localizacionLongitud, localizacionElevacion,
                       descripcion, tagEntidadEsp, tagEntidadIng, tagFuncionalidadEsp, tagFuncionalidadIng,
                         tagNombreEsp, tagNombreIng, tags, datastreams)
        response = JsonResponse(dataJSON)
        response['Content-Disposition'] = 'attachment; filename="' + str(idDispositivo) + '.json"'
        print(response)
        return response
    return render(request, 'crearDispositivo.html')

@login_required()
def changeValue(request):
    conexion = conexionEstado()

    ip = request.GET.get('ip')
    idDisp = request.GET.get('id')
    option = request.GET.get('option')
    idDatastream = request.GET.get('name')

    siCambio = conexion.cambiarEstadoActuadores(ip, idDisp, idDatastream, option)
    if siCambio == "":
        data = {'cambio': 0}
    else:
        data = {'cambio': 1}

    return JsonResponse(data)

# Local Method
def crearJSON(idDispositivo, titulo, localizacionLatitud, localizacionLongitud, localizacionElevacion,
              descripcion, tagEntidadEsp, tagEntidadIng, tagFuncionalidadEsp, tagFuncionalidadIng,
                tagNombreEsp, tagNombreIng, tags, datastreams):

    datastreamsDef = []
    for i in datastreams:
        if i[3] == "":      #Simbolo vacio
            i[3] = None
        if i[4] == "":      #Label vacio
            i[4] = None
        if i[5] == "":      #Unidad vacio
            i[5] = 0
        datastreamsDef.append(
            {
                "feedid": None,
                "id": i[0],
                "current_value": None,
                "at": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                "max_value": i[1],
                "min_value": i[2],
                "tags": i[6],
                "unit": {
                    "symbol": i[3],
                    "label": i[4],
                    "unitType": i[5]
                },
                "datapoints": None,
            }
        )
    tagsDef = [tagEntidadEsp, tagEntidadIng, tagFuncionalidadEsp, tagFuncionalidadIng, tagNombreEsp, tagNombreIng]
    tagsDef.extend(tags)
    diccionario = {}
    diccionario["Conceptos"] = ["sala de estar"]
    diccionario["lugares"] = None
    diccionario["feed"] = {"id": str(idDispositivo),
                           "title": titulo,
                           "Private": False,
                           "tags": tagsDef,
                           "description": descripcion,
                           "feed": "https://api.xively.com/v2/feeds/"+ str(idDispositivo)+".json",
                           "auto_feed_url": None,
                           "status": 0,
                           "updated": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                           "created": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                           "creator": "https://personal.xively.com/users/manzamb",
                           "version": None,
                           "website": None,
                           "datastreams": datastreamsDef,
                           "location": {
                               "name": None,
                               "domain": 0,
                               "lat": str(localizacionLatitud),
                               "lon": str(localizacionLongitud),
                               "ele": str(localizacionElevacion),
                               "exposure": 0,
                               "disposition": 0
                           },
                           "TitleHTML": "<a style=\"color: #336600; font-size:110%;\"  href=\"https://xively.com/feeds/" + str(idDispositivo) + "\" >" + titulo + "</a>",
                           "URLMostrar": "https://xively.com/feeds/" + str(idDispositivo)
                           }
    diccionario["pathfeed"] = "D:\\Aplicaciones\\SemanticSearchIoT\\WSSemanticSearch\\App_Data\\Json_Data\\" + str(idDispositivo) + ".json"
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

