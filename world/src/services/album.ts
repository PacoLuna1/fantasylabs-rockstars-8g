import { Album } from '../models/album'
import { createAlbumDTO, deleteAlbumDTO, updateAlbumDTO } from '../views/admin/album/types'

export const getAlbums = async () =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/albums/");
    if(response.status !== 200) return;

    const albums: Album[] = await response.json();
  }catch(err){
    throw err;
  }
}

export const createAlbum = async (albumDTO: createAlbumDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/albums/`,{
      method: "POST",
      body: JSON.stringify(albumDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 201) return;

    const album: Album = await response.json();
  }catch(err){
    throw err
  }
}

export const updateAlbum = async (albumDTO: updateAlbumDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/albums/${albumDTO._id}/`,{
      method: "PATCH",
      body: JSON.stringify(albumDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const album: Album = await response.json();
  }catch(err){
    throw err
  }
}

export const deleteAlbum = async (albumDTO: deleteAlbumDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/albums/${albumDTO._id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
  }catch(err){
    throw err
  }
}