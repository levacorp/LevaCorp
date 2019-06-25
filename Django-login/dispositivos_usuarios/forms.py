from django import forms
from .models import Dispositivo_Usuario


class BuscarDispositivoForm(forms.Form):
    id = forms.IntegerField()

class AgregarDispositivoForm(forms.Form):
    idDispositivo = forms.IntegerField()


class infoDispositivo(forms.Form):
    idDispositivo = forms.IntegerField()
    titulo = forms.CharField(max_length=250)
    tagEntidadEsp = forms.CharField(max_length=250)
    tagEntidadIng = forms.CharField(max_length=250)
    tagFuncionalidadEsp = forms.CharField(max_length=250)
    tagFuncionalidadIng = forms.CharField(max_length=250)
    tagNombreEsp = forms.CharField(max_length=250)
    tagNombreIng = forms.CharField(max_length=250)
    localizacionLatitud = forms.IntegerField()
    localizacionLongitud = forms.IntegerField()
    localizacionElevacion = forms.IntegerField()
    descripcion = forms.CharField(max_length=500)
    dsNombre = forms.CharField(max_length=250)
    dsValorMin = forms.CharField(max_length=250)
    dsValorMax = forms.CharField(max_length=250)
    dsTagEsp = forms.CharField(max_length=250)
    dsTagIng = forms.CharField(max_length=250)
    dsUnidad = forms.CharField(max_length=250)
    dsEtiqueta = forms.CharField(max_length=250)
    dsTipo = forms.CharField(max_length=250)