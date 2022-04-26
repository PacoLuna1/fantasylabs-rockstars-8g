from django.db import models

# Create your models here.
class Singer(models.Model):
  stage_name = models.CharField(max_length=128)
  name = models.CharField(max_length=128)
  last_name = models.CharField(max_length=128)
  nationality = models.CharField(max_length=128)
  image = models.BinaryField()