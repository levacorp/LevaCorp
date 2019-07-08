from django.urls import path
from . import views

urlpatterns = [
    path('confirmarAgregar/<int:id>', views.confirmarAgregar, name="confirmarAgregar"),
    path('infoDispositivo/<int:id>', views.infoDispositivo, name="infoDispositivo"),
    path('crear', views.crearDispositivo, name='crear'),
    path('estado', views.estadosDispositivos, name='estado'),
    path('agregar', views.agregarDispositivo, name='agregarDispositivo'),
    path('estados/(<int:id>, <str:nombre>)', views.estadoDispositivo, name='estados'),
    path('changeValue/', views.changeValue, name='changeValue')
]
