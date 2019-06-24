from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

from .models import Dispositivo_Usuario
from .forms import BuscarDispositivoForm
from .forms import AgregarDispositivoForm
from .ConexionIndiceSemantico import ConexionIndiceSemantico

from django.views import View
from django.utils.decorators import method_decorator


def agregarDispositivo(request):
    if request.method == "POST":
        form = AgregarDispositivoForm(request.POST)
        if form.is_valid():
            form.save(commit=False)
            form.idUsuario = request.user.id


class buscarView(View):

    @method_decorator(login_required)
    def get(self, request):
        form = BuscarDispositivoForm()
        return render(request, "buscar.html", {'form': form})

    @method_decorator(login_required)
    def post(self, request):
        form = BuscarDispositivoForm(request.POST)
        if form.is_valid():
            id = form.cleaned_data['id']
            disp = ConexionIndiceSemantico(id)

        if disp.getId() is None:
            # Mostrar mensaje que no se encontró el dispositivo
            # form = BuscarDispositivoForm()
            return redirect("buscar")
        else:
            args = {'disp': disp, 'mensaje': 'Se encontró el dispositivo'}
            return render(request, "agregar.html", args)

# Local Method
def obtenerDispositivos(idUsuario):
    idDispositivos = Dispositivo_Usuario.objects.filter(idUsuario=idUsuario)
    listaDisp = []

    for i in idDispositivos:
        disp = ConexionIndiceSemantico(i.idDispositivo)
        if disp.getId() is not None:
            listaDisp.append(disp)
    return listaDisp

def listarDispositivos(request):

    listaDisp = obtenerDispositivos(request.user.id)

    dictDisp = {}       #Diccionario de la forma {"Concepto1": [Lista de dispositivos], "Concepto2": [Lista de dispositivos]}

    for i in listaDisp:
        if i.getConceptos()[0] in dictDisp:
            listAux = dictDisp.get(i.getConceptos()[0])
            listAux.append(i.getTitle())
            dictDisp.update({i.getConceptos()[0]: listAux})
            print(dictDisp)
        else:
            listAux = [i.getTitle()]
            dictDisp.update({i.getConceptos()[0]: listAux})


    return dictDisp
