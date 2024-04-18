from django.db import models
from django.contrib.auth.models import User


class Application(models.Model):
    name = models.CharField(max_length=100)

class UserApplication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class Measurement(models.Model):
    user_application = models.ForeignKey(UserApplication, on_delete=models.CASCADE)
    measurement_date = models.DateTimeField()
    energy_consumption = models.FloatField()

    def user(self):
        return self.user_application.user