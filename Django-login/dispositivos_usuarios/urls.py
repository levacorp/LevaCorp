from django.urls import path
from . import views
from .views import agregarView

urlpatterns = [
    path('confirmarAgregar/<int:id>', agregarView.as_view(), name="confirmarAgregar"),
    path('crear', views.crearDispositivo, name='crear'),
    path('estado', views.estadosDispositivos, name='estado'),
    path('agregar', views.agregarDispositivo, name='agregarDispositivo'),
    path('estados/<int:id>', views.estadoDispositivo, name ='estados'),
]
