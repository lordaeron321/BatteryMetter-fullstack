from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework import serializers

class MeasurementSerializer(serializers.ModelSerializer):
    user_application = serializers.SerializerMethodField()

    def get_user_application(self, obj):
        try:
            user_application = UserApplication.objects.get(pk=obj.user_application_id)
            application_name = user_application.application.name
            return application_name
        except UserApplication.DoesNotExist:
            return None

    class Meta:
        model = Measurement
        fields = ['user_application', 'measurement_date', 'energy_consumption']