
from django.urls import path
from . import views
from .views import buscarView

urlpatterns = [
    # path('', views.agregarDispositivo, name="agregar")
    path('', buscarView.as_view(), name="buscar")
]