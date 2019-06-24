from django.urls import path
from . import views
from .views import buscarView
from .views import agregarView

urlpatterns = [
    path('agregar/<int:id>', agregarView.as_view(), name="agregar"),
    path('buscar', buscarView.as_view(), name="buscar"),
    path('crear', views.crearDispositivo, name='crear'),
]
