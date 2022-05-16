from rest_framework import serializers
from .models import *
from fantasylabs.singers.serializers import *
from fantasylabs.genres.serializers import *

class AlbumSerializer(serializers.ModelSerializer):
  singer = SingerSerializer(many=True)
  genre = GenreSerializer(many=False)

  class Meta:
    model = Album
    fields = ['id','name', 'release_date', 'price', 'stock', 'image', 'genre', 'singer']

class AlbumsSingersSerializer(serializers.ModelSerializer):
  class Meta:
    model = AlbumsSingers
    fields = ['id', 'album', 'singer']
