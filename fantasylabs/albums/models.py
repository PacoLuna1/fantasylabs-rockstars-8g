from django.db import models
from fantasylabs.genres.models import Genre
from fantasylabs.singers.models import Singer

# Create your models here.
class Album(models.Model):
  name = models.CharField(max_length=128)
  release_date = models.DateField()
  price = models.SmallIntegerField()
  stock = models.SmallIntegerField()
  image = models.TextField()
  genre = models.ForeignKey(Genre, on_delete=models.DO_NOTHING)
  singer = models.ManyToManyField(Singer, through='AlbumsSingers')

class AlbumsSingers(models.Model):
	album = models.ForeignKey(Album, related_name='AlbumWithSingers', on_delete=models.DO_NOTHING)
	singer = models.ForeignKey(Singer, related_name='SingerWithAlbums', on_delete=models.DO_NOTHING)

	def __str__(self):
		return f'{self.id}'