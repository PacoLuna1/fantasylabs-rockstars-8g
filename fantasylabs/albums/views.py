from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from fantasylabs.albums.serializers import *
from fantasylabs.genres.models import Genre
from fantasylabs.singers.models import Singer
from rest_framework.response import Response

# Create your views here.
class AlbumViewSet(viewsets.ModelViewSet):
  queryset = Album.objects.all()
  serializer_class = AlbumSerializer
  permission_classes = []
  
  def create(self, request, *args, **kwargs):
    reqGenre = request.data.pop('genre')
    reqSinger = request.data.pop('singer')
    album = request.data
    
    if reqGenre['id'] is not None:
      genre = Genre.objects.get(id=reqGenre['id'])
    else:
      genre = Genre.objects.create(
        description = reqGenre['description']
      )
      genre.save()
      
    album = Album.objects.create(
      name = album['name'],
      release_date = album['release_date'],
      price = album['price'],
      stock = album['stock'],
      image = album['image'],
      genre = genre,
    )
    album.save()
    
    ids = [element['id'] for element in reqSinger]
    for id in ids:
      if not AlbumsSingers.objects.filter(album=album.id, singer=id):
        singerAlbum = Singer.objects.get(id=id)
        albumsSingers = AlbumsSingers.objects.create(
          singer = singerAlbum,
          album = album
        )
        albumsSingers.save()    
    
    serializer = AlbumSerializer(album)

    return Response(serializer.data)

  def update(self, request, *args, **kwargs):
    pk = kwargs['pk']
    reqGenre = request.data.pop('genre')
    reqSinger = request.data.pop('singer')
    album = request.data

    ids = [element['id'] for element in reqSinger]
    Album.objects.filter(pk=pk).update(
      name = album['name'],
      release_date = album['release_date'],
      price = album['price'],
      stock = album['stock'],
      image = album['image'],
      genre = reqGenre['id']
    )

    i = 0
    for albumsingers in AlbumsSingers.objects.filter(album=pk):
      if albumsingers.singer.id not in ids:
       albumsing = AlbumsSingers.objects.filter(
          singer = albumsingers.singer.id,
          album = pk
        ).delete()
      i += 1
      
    album = Album.objects.get(id=pk)
    for id in ids:
      if not AlbumsSingers.objects.filter(album=pk, singer=id):
        singerAlbum = Singer.objects.get(id=id)
        albumsSingers = AlbumsSingers.objects.create(
          singer = singerAlbum,
          album = album
        )
        albumsSingers.save()
    
    serializer = AlbumSerializer(album)

    return Response(serializer.data)
  
  def destroy(self, request, *args, **kwargs):
    pk = kwargs['pk']
    AlbumsSingers.objects.filter(album=pk).delete()
    Album.objects.filter(id=pk).delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)

class AlbumsSingersViewSet(viewsets.ModelViewSet):
    queryset = AlbumsSingers.objects.all()
    serializer_class = AlbumsSingersSerializer
    permission_classes = []