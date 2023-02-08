from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('category/', views.CategoryView.as_view(), name='category'),
    path('product/', views.ProductView.as_view(), name='Product'),
    path('user/', views.UserView.as_view(), name='user'),
    path('user/address/', views.UserAddressView.as_view(), name='address'),
    path('user/login/', views.UserLoginView.as_view(), name='login'),
    path('order/', views.OrderView.as_view(), name='Oder'),
    path('cart/', views.CartView.as_view(), name='Cart'),
]
