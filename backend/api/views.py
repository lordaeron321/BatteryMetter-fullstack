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
