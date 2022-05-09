import { Album } from '../models/album'
import { createAlbumDTO, deleteAlbumDTO, updateAlbumDTO } from '../views/admin/album/types'
import { addAlbum, patchAlbum, removeAlbum, setAlbums } from '../feature/labSlice';
import { AppDispatch } from '../app/store';

export const getAlbums = () => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/albums/");
    if(response.status !== 200) return;

    const albums: Album[] = await response.json();
    dispatch(setAlbums(albums));
  }catch(err){
    throw err;
  }
}

export const createAlbum = (albumDTO: createAlbumDTO) => async (dispatch: AppDispatch) =>{
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
    dispatch(addAlbum(album))
  }catch(err){
    throw err
  }
}

export const updateAlbum = (albumDTO: updateAlbumDTO) => async (dispatch: AppDispatch) =>{
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
    dispatch(patchAlbum(album))
  }catch(err){
    throw err
  }
}

export const deleteAlbum = (albumDTO: deleteAlbumDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/albums/${albumDTO._id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
    dispatch(removeAlbum(albumDTO._id))
  }catch(err){
    throw err
  }
}