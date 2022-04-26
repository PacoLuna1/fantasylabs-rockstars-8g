from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from library.books.serializers import *

# Create your views here.
class SingerViewSet(viewsets.ModelViewSet):
    queryset = Singer.objects.all()
    serializer_class = SingerSerializer
    permission_classes = []