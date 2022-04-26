from rest_framework import serializers
from .models import *

class AlbumSerializer(serializers.ModelSerializer):
  class Meta:
    model = Album
    fields = ['id','name', 'release_date', 'price', 'stock', 'image', 'genre', 'singer', 'song']