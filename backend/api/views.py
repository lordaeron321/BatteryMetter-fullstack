from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import  status
from api.commonFunctions.functions import anki, superMemo
import datetime
from django.utils import timezone
from .serializers import MeasurementSerializer
import json
@api_view(['POST'])
def register(request):
    username= request.data['username']
    password= request.data['password']
    email= request.data['email']
    print(username, password, email)
    print("czy istnieje: ", User.objects.filter(username=username))
    if User.objects.filter(username=username).exists():
        print("jestem tutaj")
        return Response({"message": "Taki username już istnieje"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        new_user= User.objects.create_user(username=username, password= password, email=email)
        new_user.save()
        return Response({"message": "Stworzyłem uzytkownika"}, status= 201)

@api_view(['POST'])  
def logowanie(request):
    print("chce sie zalogowac", request.data)
    username= request.data['username']
    password= request.data['password']

    user= authenticate(username=username, password= password)

    if user != None:
        print("sukces")
        return Response({"message": "Zalogowano pomyslnie", "user_id" : user.id}, status= 201)
    else:
        return Response({"message": "Coś poszło nie tak"}, status= 400)

@api_view(['GET'])
def user_measurements_api(request, user_id):
    if request.method == 'GET':
        measurements = Measurement.objects.filter(user_application__user_id=user_id)
        serializer = MeasurementSerializer(measurements, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
def add_measurement(request):
    try:
        data = request.data  
        application_name = data.get("application_name", "Default App")
        measurement_date_str = data.get("measurement_date")
        energy_consumption = data.get("energy_consumption")

        if not measurement_date_str or not energy_consumption:
            return Response(
                {"error": "Brakujące dane. Sprawdź, czy podałeś datę pomiaru i wartość pomiaru."},
                status=status.HTTP_400_BAD_REQUEST,
            )

       
        measurement_date = timezone.make_aware(
            datetime.datetime.fromisoformat(measurement_date_str)
        )

       
        user_id = 5  
        user = get_object_or_404(User, id=user_id)

      
        application, _ = Application.objects.get_or_create(name=application_name)

       
        user_application, _ = UserApplication.objects.get_or_create(user=user, application=application)

     
        measurement = Measurement(
            user_application=user_application,
            measurement_date=measurement_date,
            energy_consumption=energy_consumption,
        )
        measurement.save()

        return Response(
            {"message": "Pomiary zostały zapisane."},
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
   
        print(f"Błąd podczas przetwarzania żądania: {e}")
        return Response(
            {"error": f"Coś poszło nie tak: {e}."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
