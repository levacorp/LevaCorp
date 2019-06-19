from django.db import models
from django.contrib.auth.models import User

class Dispositivo_Usuario(models.Model):
    idDispositivo = models.IntegerField(primary_key=True)
    idUsuario = models.ForeignKey(User, default=1, on_delete=models.SET_DEFAULT)

    #NOTA: En la base de datos, en la tabla dispositivo_usuario se debe agregar como clave primaria idUsuario.