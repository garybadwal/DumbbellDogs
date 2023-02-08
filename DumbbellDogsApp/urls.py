from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.login_form, name="login_form"),
    path('logout/', views.logout_user, name="logout_user"),
    path('SignUp/', views.register, name="register"),
    path('products_page/', views.products_page, name="products_page"),
    path('mycart/', views.mycart, name="mycart"),
    path('myorders/', views.myorders, name="myorders")
]
