# users/views.py
from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.auth import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
from .forms import RegistroForm

'''
A continuación se encuentran definidas las vistas que redirige
todo lo que tiene que ver con usuarios
'''


def root(request):                              # Vista principal al entrar a la aplicación
    if request.user.is_authenticated:           # Si alguien al entrar ya se encuentra autenticado
        view = '/homepage'                      # Redirige a la vista principal del usuario
    else:
        view = '/login'                         # Si no redirige a la página de login

    return redirect(view)


@login_required()                               # El usuario debe estar autenticado
def homepage(request):                          # Vista que redirige a la página de inicio del usuario
    return render(request, "Inicio.html")


@login_required()                               # El usuario debe estar autenticado
def logout_request(request):                    # para deslogearse
    logout(request)
    return redirect("/")


def login_request(request):

    if request.user.is_authenticated:           # Si el usuario ya está autenticado se debe
        return redirect("homepage")             # redirigir a la página de inicio del usuario

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                messages.error(request, "Usuario o contraseña incorrecta.")
        else:
            messages.error(request, "Campos invalidos")
    return render(request, "usuarios/login.html")


def registrar(request):

    if request.user.is_authenticated:                                   # Si el usuario ya está autenticado se debe
        return redirect("homepage")                                     # redirigir a la página de inicio del usuario

    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()                                                 # Guarda el usuario
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)                                        # Loguea al usuario y lo redirige a la página
            return redirect("/")                                        # de inicio del usuario
        else:
            messages.error(request, "Campos invalidos")
    return render(request, 'usuarios/registrar.html')
