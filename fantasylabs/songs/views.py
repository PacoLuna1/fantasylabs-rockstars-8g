from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
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
      
    if reqSinger['id'] is not None:
      singer = Singer.objects.get(id=reqSinger['id'])
    else:
      singer = Singer.objects.create(
        stage_name = reqSinger['stage_name'],
        name = reqSinger['name'],
        last_name = reqSinger['last_name'],
        nationality = reqSinger['nationality'],
        image = reqSinger['image']
      )
      singer.save()
      
    if reqAlbum['id'] is not None:
      album = Album.objects.get(id=reqAlbum['id'])
    else:
      album = Album.objects.create(
        name = reqAlbum['name'],
        release_date = reqAlbum['release_date'],
        price = reqAlbum['price'],
        stock = reqAlbum['stock'],
        image = reqAlbum['image'],
        genre = reqAlbum['genre'],
        singer = reqAlbum['singer']
      )
      album.save()
      
    song = Song.objects.create(
      name = song['name'],
      release_date = song['release_date'],
      duration = song['duration'],
      complete_file = song['complete_file'],
      preview_file = song['preview_file'],
      price = song['price']
    )
    song.save()
    
    songsSingers = SongsSingers.objects.create(
      singer = singer,
      song = song
    )
    songsSingers.save()
    
    songsAlbums = SongsAlbums.objects.create(
      album = album,
      song = song
    )
    songsAlbums.save()
    
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
      if songalbums.album.id not in ids:
        SongsAlbums.objects.filter(
          album = songalbums.album.id,
          song = pk
        ).delete()
      i += 1
      
    for id in ids:
      if not SongsAlbums.objects.filter(song=pk, album=id):
        albumSong = Album.objects.get(id=id)
        songsAlbums = SongsAlbums.objects.create(
          album = albumSong,
          song = song
        )
        songsAlbums.save()
    
    serializer = SongSerializer(song)

    return Response(serializer.data)
    
class SongsAlbumsViewSet(viewsets.ModelViewSet):
    queryset = SongsAlbums.objects.all()
    serializer_class = SongsAlbumsSerializer
    permission_classes = []
  
class SongsSingersViewSet(viewsets.ModelViewSet):
    queryset = SongsSingers.objects.all()
    serializer_class = SongsSingersSerializer
    permission_classes = []