from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from fantasylabs.songs.serializers import *
from fantasylabs.albums.models import Album
from fantasylabs.singers.models import Singer
from rest_framework.response import Response

# Create your views here.
class SongViewSet(viewsets.ModelViewSet):
  queryset = Song.objects.all()
  serializer_class = SongSerializer
  permission_classes = []
  
  def create(self, request, *args, **kwargs):
    reqAlbum = request.data.pop('album')
    reqSinger = request.data.pop('singer')
    song = request.data
      
    song = Song.objects.create(
      name = song['name'],
      release_date = song['release_date'],
      duration = song['duration'],
      complete_file = song['complete_file'],
      preview_file = song['preview_file'],
      price = song['price']
    )
    song.save()
    
    
    ids = [element['id'] for element in reqSinger]
    ida = [element['id'] for element in reqAlbum]
    
    for id in ida:
      if not SongsAlbums.objects.filter(song=song.id, album=id):
        albumSong = Album.objects.get(id=id)
        songsAlbums = SongsAlbums.objects.create(
          album = albumSong,
          song = song
        )
        songsAlbums.save()
    
    for id in ids:
      if not SongsSingers.objects.filter(song=song.id, singer=id):
        singerSong = Singer.objects.get(id=id)
        songsSingers = SongsSingers.objects.create(
          singer = singerSong,
          song = song
        )
        songsSingers.save()
    
    serializer = SongSerializer(song)

    return Response(serializer.data)

  def update(self, request, *args, **kwargs):
    pk = kwargs['pk']
    reqAlbum = request.data.pop('album')
    reqSinger = request.data.pop('singer')
    song = request.data

    ids = [element['id'] for element in reqSinger]
    ida = [element['id'] for element in reqAlbum]
    Song.objects.filter(pk=pk).update(
      name = song['name'],
      release_date = song['release_date'],
      duration = song['duration'],
      complete_file = song['complete_file'],
      preview_file = song['preview_file'],
      price = song['price']
    )

    i = 0
    for songsingers in SongsSingers.objects.filter(song=pk):
      if songsingers.singer.id not in ids:
        SongsSingers.objects.filter(
          singer = songsingers.singer.id,
          song = pk
        ).delete()
      i += 1
      
    song = Song.objects.get(id=pk)
    for id in ids:
      if not SongsSingers.objects.filter(song=pk, singer=id):
        singerSong = Singer.objects.get(id=id)
        songsSingers = SongsSingers.objects.create(
          singer = singerSong,
          song = song
        )
        songsSingers.save()
        
    i = 0
    for songalbums in SongsAlbums.objects.filter(song=pk):
      if songalbums.album.id not in ida:
        SongsAlbums.objects.filter(
          album = songalbums.album.id,
          song = pk
        ).delete()
      i += 1
      
    for id in ida:
      if not SongsAlbums.objects.filter(song=pk, album=id):
        albumSong = Album.objects.get(id=id)
        songsAlbums = SongsAlbums.objects.create(
          album = albumSong,
          song = song
        )
        songsAlbums.save()
    
    serializer = SongSerializer(song)

    return Response(serializer.data)
  
  def destroy(self, request, *args, **kwargs):
    pk = kwargs['pk']
    SongsSingers.objects.filter(song=pk).delete()
    SongsAlbums.objects.filter(song=pk).delete()
    Song.objects.filter(id=pk).delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)
    
class SongsAlbumsViewSet(viewsets.ModelViewSet):
    queryset = SongsAlbums.objects.all()
    serializer_class = SongsAlbumsSerializer
    permission_classes = []
  
class SongsSingersViewSet(viewsets.ModelViewSet):
    queryset = SongsSingers.objects.all()
    serializer_class = SongsSingersSerializer
    permission_classes = []