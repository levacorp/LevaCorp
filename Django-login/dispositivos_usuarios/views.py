from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from dispositivos_usuarios.forms import BuscarDispositivoForm
from dispositivos_usuarios.models import Dispositivo_Usuario


# @login_required(login_url="login")
# def buscarDispostivo(request):
#     if request.method == "POST":
#         form = BuscarDispositivoForm(request.POST)
#         if form.is_valid():
#             id = form.cleaned_data['id']
#             disp = Dispositivo_Usuario.objects.filter(idUsuario=request.user.id, idDispositivo=id)
#             args = {'form': form, 'disp': disp}
#     else:
#         form = BuscarDispositivoForm()
#         args = {'form': form}
#     return render(request, "buscar.html", args)
