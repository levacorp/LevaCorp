from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from dispositivos.forms import BuscarDispositivoForm
from dispositivos.models import Dispositivos

@login_required(login_url="login")
def buscarDispositivo(request):
    if request.method == "POST":
        form = BuscarDispositivoForm(request.POST)
        if form.is_valid():
            id = form.cleaned_data['id']
            disp = Dispositivos.objects.filter(id=id)
        args = {'form':form, 'disp':disp}
    else:
        form = BuscarDispositivoForm()
        args = {'form': form}
    return render(request, "buscar.html", args)