from django.urls import path
from . import views

urlpatterns = [
	path('', views.list, name="list"),
	path('accounts/profile/', views.list, name="accountsProfile"),


]
