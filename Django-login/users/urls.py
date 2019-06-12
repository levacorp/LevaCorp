# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.root, name="root"),
    path('homepage', views.homepage, name="homepage"),
    path('logout', views.logout_request, name='logout'),
    path('login', views.login_request, name="login")
]
