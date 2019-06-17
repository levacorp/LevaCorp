from django import forms

class BuscarDispositivoForm(forms.Form):
    id = forms.IntegerField()
