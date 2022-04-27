from django.db import models

# Create your models here.
class Genre(models.Model):
  description = models.CharField(max_length=128)