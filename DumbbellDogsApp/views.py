from unicodedata import category
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect, render

def index(request):
    return render(request, 'DumbbellDogs/index.html', context={'page_title': 'Index'})

def login_form(request):
    return render(request, 'DumbbellDogs/login_form.html', context={'page_title': 'Login'})

def register(request):
    return render(request, 'DumbbellDogs/register.html', context={'page_title': 'Create an Account'})

@login_required(login_url='DumbbellDogs:login_form')
def mycart(request):
    return render(request, 'DumbbellDogs/mycart.html', context={'page_title': 'MyCart'})

@login_required(login_url='DumbbellDogs:login_form')
def myorders(request):
    return render(request, 'DumbbellDogs/myorders.html', context={'page_title': 'MyOrders'})

def products_page(request):    
    category = request.GET['category']
    return render(request, 'DumbbellDogs/products_page.html', context={'page_title': 'Products', 'category': category})

@login_required(login_url='DumbbellDogs:login_form')
def logout_user(request):
    logout(request)
    return redirect('DumbbellDogs:index')
