# users/views.py
from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.auth import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
from .forms import RegistroForm


def root(request):
    if request.user.is_authenticated:
        view = '/homepage'
    else:
        view = '/login'

    return redirect(view)


@login_required()
def homepage(request):
    return render(request, "Inicio.html")


@login_required()
def logout_request(request):
    logout(request)
    return redirect("/")


def login_request(request):

    if request.user.is_authenticated:
        return redirect("homepage")

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # messages.info(request, f"You are now logged in as {username}")
                return redirect('/')
            else:
                messages.error(request, "Usuario o contraseña incorrecta.")
        else:
            messages.error(request, "Campos invalidos")
    form = LoginForm()
    return render(request=request,
                  template_name="login.html",
                  context={"form": form})


def registrar(request):

    if request.user.is_authenticated:
        return redirect("homepage")

    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect("/")
        else:
            messages.error(request, "Campos invalidos")
    else:
        form = RegistroForm()
    return render(request, 'registrar.html', {'form': form})
