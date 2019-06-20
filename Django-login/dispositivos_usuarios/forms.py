from django import forms
from .models import Dispositivo_Usuario

class AgregarDispositivoForm(forms.ModelForm):
    class Meta:
        model = Dispositivo_Usuario;
        fields = ['idDispositivo']

class BuscarDispositivoForm(forms.Form):
    id = forms.IntegerField()
