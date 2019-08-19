from django.urls import path

from hrs import views

urlpatterns = [
    path('', views.index, name='index'),
]