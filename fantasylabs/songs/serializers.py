from rest_framework import serializers
from .models import *

class SongSerializer(serializers.ModelSerializer):
  class Meta:
    model = Song
    fields = ['id','name','release_date', 'duration', 'complete_file', 'preview_file', 'price', 'album', 'singer']

class SongsAlbumsSerializer(serializers.ModelSerializer):
  class Meta:
    model = SongsAlbums
    fields = ['id', 'song', 'album']

class SongsSingersSerializer(serializers.ModelSerializer):
  class Meta:
    model = SongsSingers
    fields = ['id', 'song', 'singer']