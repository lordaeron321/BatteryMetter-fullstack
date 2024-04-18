from django.urls import path
from .views import *

urlpatterns= [
  
    path('register/', register),
    path('logowanie/', logowanie),
    path('user/<int:user_id>/measurements/', user_measurements_api),
]