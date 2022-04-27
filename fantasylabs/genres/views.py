from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from fantasylabs.genres.serializers import *

# Create your views here.
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = []