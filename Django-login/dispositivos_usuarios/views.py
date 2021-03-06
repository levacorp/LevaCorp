from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

from .models import Dispositivo_Usuario
from .forms import BuscarDispositivoForm
from .forms import obtenerIP
from .ConexionIndiceSemantico import ConexionIndiceSemantico
from .ConexionRaspberry import ConexionRaspberry
from django.contrib import messages

from django.http import JsonResponse
from datetime import datetime


@login_required()                                                  # El usuario debe estar autenticado
def buscar(request, id):
    if request.method == "POST":
        if 'inicializar' in request.POST:                               # Agregar dispositivo
            return crearDispositivo(request)

        elif 'descargarJson' in request.POST:
            return crearDispositivo(request)

    disp = ConexionIndiceSemantico(id)
    return render(request, "crearDispositivoExistente.html", {'disp': disp})


@login_required()                                                   # El usuario debe estar autenticado
def infoDispositivo(request, id):
    if request.method == "POST":
        if 'descargarJson' in request.POST:                               # Redirige a la vista para descargar
            return crearDispositivo(request)                                # el JSON cargado en el formulario
        if 'inicializar' in request.POST:
            return crearDispositivo(request)
    disp = ConexionIndiceSemantico(id)                                      # Carga la información del dispositivo
    siExiste = Dispositivo_Usuario.objects.get(idUsuario=request.user,      # ya existente
                                               idDispositivo=disp.getId())
    ipDisp = siExiste.ipDispositivo
    args = {'disp': disp, 'ipDisp': ipDisp}
    return render(request, "crearDispositivoExistente.html", args)


@login_required()                                                   #El usuario debe estar autenticado
def estadosDispositivos(request):                             # Método para mostrar el estado de todos
    if request.method == "GET":                                     # los dispositivos. Esto implica probar si se puede
        listaDisp = obtenerDispositivos(request.user.id)            # hacer la conexión a un dispositivo a través de
        lista = []                                                  # la IP guardada, en este caso se muestra encendido,
                                                                    # de lo contrario se muestra apagado
        for i in listaDisp:

            id = i.getId()
            disp = Dispositivo_Usuario.objects.get(idUsuario=request.user,
                                                 idDispositivo=id)
            ip = disp.ipDispositivo

            args = {"nombre": i.getTitle(), "ipDisp": ip, "idDisp": id}
            lista.append(args)

    return render(request, "Estado.html", {"lista": lista})


@login_required()                                                   #El usuario debe estar autenticado
def estadoDispositivo(request, id, nombre):                         # Método que renderiza el estado de los
    conexion = ConexionRaspberry()                                  # actuadores y sensores de un dispositivo
    if request.method == "POST":
        if 'ipDispositivo' in request.POST:                         # En caso tal, captura el campo IP para cambiar
            form = obtenerIP(request.POST)                          # la IP de un dispositivo
            if form.is_valid():
                obj = Dispositivo_Usuario.objects.get(idUsuario=request.user,
                                                      idDispositivo=id)
                obj.ipDispositivo = form.cleaned_data['ipDispositivo']
                obj.save()
            else:
                messages.error(request, "Campo incorrecto")
            return redirect("/dispositivos/estados/("+ str(id) +", "+ nombre+")")

    elif request.method == "GET":                                                       # Para mostrar el estado de
        obj = Dispositivo_Usuario.objects.get(idUsuario=request.user, idDispositivo=id) # Sensores y Actuadores
                                                                                        # de un dispositivo
        ip = obj.ipDispositivo

        diccionario = conexion.estadosDispositivos(ip, id)

        if diccionario != None:
            args = {"mensaje": "", "diccionario": diccionario, "nombre": nombre}
        else:
            infoBasica = ConexionIndiceSemantico(id)
            args = {"mensaje": "No se pudo hacer la conexión con la ip ", "infoBasica": infoBasica, "nombre": nombre}
        args.update({"ipDispositivo": ip})
        args.update({"idDispositivo": id})
        return render(request, "controlDispositivo.html", args)


@login_required()                                                   # El usuario debe estar autenticado
def agregarDispositivo(request):
    if request.method == "POST":                                    # Método que redirige a la vista en donde se puede
        form = BuscarDispositivoForm(request.POST)                  # buscar un dispositivo o crearlo
        if form.is_valid():                                         # Si se busca el dispositivo y se encuentra,
            id = form.cleaned_data['id']                            # redirige a la vista confirmarAgregar
            disp = ConexionIndiceSemantico(id)

            if disp.getId() is None:
                messages.error(request, "Dispositivo no encontrado")
            else:
                return redirect("buscar", id)

    return render(request, "agregarDispositivo.html")


@login_required()                                                   # El usuario debe estar autenticado
def crearDispositivo(request):                                      # Método que captura datos del formulario
    if request.method == 'POST':                                    # y puede crear un JSON y descargarlo o
                                                                    # mandarlo a la raspberry
        ##Informacion Básica
        idDispositivo = request.POST.get('idDispositivo')
        disp = ConexionIndiceSemantico(idDispositivo)
        if(disp.getId() != None):                                   # Si el dispositivo ya existe, se usa
            fechaCreacion = disp.getCreated()                       # la fecha de creacion original
        else:
            fechaCreacion = datetime.now().strftime("%m/%d/%Y %H:%M:%S")
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
            else:
                existe = False
            cont = cont + 1


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
                    listaTags,
                    request.POST.get('selectDataStreamFormat' + str(cont))
                ])
            else:
                existeDataStream = False
            cont = cont + 1

        dataJSON = crearJSON(idDispositivo, titulo, localizacionLatitud, localizacionLongitud, localizacionElevacion,
                       descripcion, fechaCreacion, tagEntidadEsp, tagEntidadIng, tagFuncionalidadEsp, tagFuncionalidadIng,
                         tagNombreEsp, tagNombreIng, tags, datastreams)
        if 'descargarJson' in request.POST:                                     # Captura la acción de descargar el JSON
            response = JsonResponse(dataJSON)
            response['Content-Disposition'] = 'attachment; filename="' + str(idDispositivo) + '.json"'
            return response
        elif 'inicializar' in request.POST:                             # Captura la acción de inicializar
            conexion = ConexionRaspberry()                              # un dispositivo a través del JSON capturado
            ip = request.POST.get('ip')

            siInicializo = conexion.inicializar(ip, dataJSON)

            if siInicializo:
                siExiste = Dispositivo_Usuario.objects.filter(idUsuario=request.user,
                                                              idDispositivo=idDispositivo).count()
                if siExiste == 0:
                    nuevo = Dispositivo_Usuario(idUsuario=request.user,
                                                idDispositivo=idDispositivo,
                                                ipDispositivo=request.POST.get('ip'))
                    nuevo.save()
                return render(request, "Inicio.html", {'mensaje': ['success', 'Inicializacion Satisfactoria!']})
            else:
                return render(request, 'crearDispositivo.html', {'mensaje': ['danger', 'No se ha Inicializado el dispositivo']})


    return render(request, 'crearDispositivo.html')


@login_required()                                                   # El usuario debe estar autenticado
def changeValue(request):                                           # Para cambiar el valor de un actuador
    conexion = ConexionRaspberry()                                  # de un dispositivo

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
def crearJSON(idDispositivo, titulo, localizacionLatitud, localizacionLongitud,     # Método para crear el JSON de un
              localizacionElevacion, descripcion, fechaCreacion, tagEntidadEsp,     # dispositivo y devuelve el JSON
              tagEntidadIng, tagFuncionalidadEsp, tagFuncionalidadIng,              # en forma de diccionario
              tagNombreEsp, tagNombreIng, tags, datastreams):

    datastreamsDef = []
    for i in datastreams:   # 0:id - 1:max_value - 2:min_value - 3:symbol - 4:label - 5:unitType - 6:tags - 7:datastream_format
        auxJson = {}
        if i[7] == 'None':
            auxJson['datastream_format'] = None
        else:
            auxJson['datastream_format'] = i[7]
        auxJson['feedid'] = None
        auxJson['id'] = i[0]
        auxJson['current_value'] = None
        auxJson['at'] = datetime.now().strftime("%m/%d/%Y %H:%M:%S")
        if i[1] == 'None':
            auxJson['max_value'] = None
        else:
            auxJson['max_value'] = i[1]
        if i[2] == 'None':
            auxJson['min_value'] = None
        else:
            auxJson['min_value'] = i[2]
        auxJson['tags'] = i[6]


        # Simbolo de datastream
        auxJsonUnit = {}
        if i[3] == "" or i[3] == "None":      # Cuando el Simbolo está vacio
            auxJsonUnit['symbol'] = None
        else:
            auxJsonUnit['symbol'] = i[3]
        if i[4] == "" or i[4] == "None":      # Cuando el Label está vacio
            auxJsonUnit['label'] = None
        else:
            auxJsonUnit['label'] = i[4]
        if i[5] == "" or i[5] == "None":      # Cuando la Unidad está vacia
            auxJsonUnit['unitType'] = 0
        else:
            auxJsonUnit['unitType'] = i[5]
        auxJson['unit'] = auxJsonUnit
        auxJson['datapoints'] = None
        datastreamsDef.append(auxJson)

    # Auxiliar para crear localizacion
    auxJsonLocation = {}
    auxJsonLocation['name'] = None
    auxJsonLocation['domain'] = 0
    if (localizacionLatitud == "None"):
        auxJsonLocation['lat'] = None
    else:
        auxJsonLocation['lat'] = str(localizacionLatitud)
    if (localizacionLongitud == "None"):
        auxJsonLocation['lon'] = None
    else:
        auxJsonLocation['lon'] = str(localizacionLongitud)
    if (localizacionElevacion == "None"):
        auxJsonLocation['ele'] = None
    else:
        auxJsonLocation['ele'] = str(localizacionElevacion)
    auxJsonLocation['exposure'] = 0
    auxJsonLocation['disposition'] = 0
    # Fin Auxiliar para crear localizacion
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
                           "created": fechaCreacion,
                           "creator": "https://personal.xively.com/users/manzamb",
                           "version": None,
                           "website": None,
                           "datastreams": datastreamsDef,
                           "location": auxJsonLocation,
                           "TitleHTML": "<a style=\"color: #336600; font-size:110%;\"  href=\"https://xively.com/feeds/" + str(idDispositivo) + "\" >" + titulo + "</a>",
                           "URLMostrar": "https://xively.com/feeds/" + str(idDispositivo)
                           }
    diccionario["pathfeed"] = "D:\\Aplicaciones\\SemanticSearchIoT\\WSSemanticSearch\\App_Data\\Json_Data\\" + str(idDispositivo) + ".json"
    diccionario["DocumentJSON"] = None

    return diccionario


# Local Method
def obtenerDispositivos(idUsuario):                                             # Listar el dispositivo de un usuario
    idDispositivos = Dispositivo_Usuario.objects.filter(idUsuario=idUsuario)    # que le llega por ID
    listaDisp = []

    for i in idDispositivos:
        disp = ConexionIndiceSemantico(i.idDispositivo)                         # Busca los dispositivos en
        if disp.getId() is not None:                                            # el indice semántico
            listaDisp.append(disp)
    return listaDisp


# Method
def probarConexion(request):

    idDisp = request.GET.get('idDisp')
    ipDisp = request.GET.get('ipDisp')

    conexion = ConexionRaspberry()
    diccionario = conexion.estadosDispositivos(ipDisp, idDisp)
    if diccionario != None:
        data = {"conecto": 1}
    else:
        data = {"conecto": 0}
    return JsonResponse(data)
