from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from fantasylabs.songs.serializers import *

# Create your views here.
class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = []
    
class SongsAlbumsViewSet(viewsets.ModelViewSet):
    queryset = SongsAlbums.objects.all()
    serializer_class = SongsAlbumsSerializer
    permission_classes = []
  
class SongsSingersViewSet(viewsets.ModelViewSet):
    queryset = SongsSingers.objects.all()
    serializer_class = SongsSingersSerializer
    permission_classes = []