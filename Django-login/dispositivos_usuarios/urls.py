from django.urls import path
from . import views

'''
URLs dispositivos
'''
urlpatterns = [
    path('buscar/<int:id>', views.buscar, name="buscar"),
    path('infoDispositivo/<int:id>', views.infoDispositivo, name="infoDispositivo"),
    path('crear', views.crearDispositivo, name='crear'),
    path('estado', views.estadosDispositivos, name='estado'),
    path('agregar', views.agregarDispositivo, name='agregarDispositivo'),
    path('estados/(<int:id>, <str:nombre>)', views.estadoDispositivo, name='estados'),


    path('changeValue/', views.changeValue, name='changeValue'),
    path('probarConexion/', views.probarConexion, name='probarConexion')
]
