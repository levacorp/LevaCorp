from django.shortcuts import render

# users/views.py
from django.urls import reverse_lazy
from django.views import generic
from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.auth import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from usuarios.forms import LoginForm
from dispositivos_usuarios.views import listarDispositivos


def root(request):
    if request.user.is_authenticated:
        view = '/homepage'
    else:
        view = '/login'

    return redirect(view)


@login_required()
def homepage(request):
    dispositivos = listarDispositivos(request)
    return render(request, "home.html", {'dispositivos': dispositivos})

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
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = LoginForm()
    return render(request=request,
                  template_name="login.html",
                  context={"form": form})
