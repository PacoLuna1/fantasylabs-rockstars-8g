from rest_framework import serializers
from .models import *

class SingerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Singer
    fields = ['id','stage_name','name', 'last_name', 'nationality', 'image' ]