from django.db import models
from fantasylabs.singers.models import Singer
from fantasylabs.albums.models import Album

# Create your models here.
class Song(models.Model):
  name = models.CharField(max_length=128)
  release_date = models.DateField()
  duration = models.SmallIntegerField()
  complete_file = models.TextField()
  preview_file = models.TextField()
  price = models.SmallIntegerField()
  album = models.ManyToManyField(Album, through='SongsAlbums')
  singer = models.ManyToManyField(Singer, through='SongsSingers')
  
class SongsAlbums(models.Model):
	song = models.ForeignKey(Song, related_name='SongWithAlbums', on_delete=models.DO_NOTHING)
	album = models.ForeignKey(Album, related_name='AlbumWithSongs', on_delete=models.DO_NOTHING)

	def __str__(self):
		return f'{self.id}'

class SongsSingers(models.Model):
	song = models.ForeignKey(Song, related_name='SongWithSingers', on_delete=models.DO_NOTHING)
	singer = models.ForeignKey(Singer, related_name='SingerWithSongs', on_delete=models.DO_NOTHING)

	def __str__(self):
		return f'{self.id}'