from django.db import models

# Create your models here.
class Album(models.Model):
  name = models.CharField(max_length=128)
  release_date = models.DateField()
  price = models.SmallIntegerField()
  stock = models.SmallIntegerField()
  image = models.BinaryField()
  genre = models.ForeignKey(Genre, on_delete=models.DO_NOTHING)
  singer = models.ManyToManyField(Singer, through='AlbumsSingers')
  song = models.ManyToManyField(Song, through='SongsAlbums')

class AlbumsSingers(models.Model):
	album = models.ForeignKey(Album, related_name='AlbumWithSingers', on_delete=models.DO_NOTHING)
	singer = models.ForeignKey(Singer, related_name='SingerWithAlbums', on_delete=models.DO_NOTHING)

	def __str__(self):
		return f'{self.id}'