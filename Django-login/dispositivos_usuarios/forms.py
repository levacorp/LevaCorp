from django import forms
from .models import Dispositivo_Usuario


class BuscarDispositivoForm(forms.Form):
    id = forms.IntegerField()

class obtenerIP(forms.Form):
    ipDispositivo = forms.CharField(max_length=45)