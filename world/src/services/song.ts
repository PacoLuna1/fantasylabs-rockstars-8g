import { Song } from '../models/song'
import { createSongDTO, deleteSongDTO, updateSongDTO } from '../views/admin/song/types'
import { addSong, patchSong, removeSong, setSongs } from '../feature/labSlice';
import { AppDispatch } from '../app/store';

export const getSongs = () => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/songs/");
    if(response.status !== 200) return;

    const songs: Song[] = await response.json()
    dispatch(setSongs(songs))
  }catch(err){
    throw err;
  }
}

export const createSong = (songDTO: createSongDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/`,{
      method: "POST",
      body: JSON.stringify(songDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 201) return;

    const song: Song = await response.json();
    dispatch(addSong(song))
  }catch(err){
    throw err
  }
}

export const updateSong = (songDTO: updateSongDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/${songDTO._id}/`,{
      method: "PATCH",
      body: JSON.stringify(songDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const song: Song = await response.json();
    dispatch(patchSong(song))
  }catch(err){
    throw err
  }
}

export const deleteSong = (songDTO: deleteSongDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/${songDTO._id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
    dispatch(removeSong(songDTO._id))
  }catch(err){
    throw err
  }
}