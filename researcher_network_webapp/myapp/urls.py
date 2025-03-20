from django.urls import path
from . import views  # Importa las vistas del mismo módulo

urlpatterns = [
    path("", views.index, name="index"),  # Definiendo la ruta para la vista index
]
