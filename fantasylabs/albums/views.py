from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from fantasylabs.albums.serializers import *

# Create your views here.
class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = []