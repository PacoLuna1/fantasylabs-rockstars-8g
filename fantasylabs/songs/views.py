from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from library.books.serializers import *

# Create your views here.
class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = []