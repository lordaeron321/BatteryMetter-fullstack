from django.contrib import admin
from .models import *
from django.contrib.auth.models import User

admin.site.register(Application)
admin.site.register(UserApplication)
admin.site.register(Measurement)

