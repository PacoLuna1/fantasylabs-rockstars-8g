import { Song } from '../models/song'
import { CreateSongDTO, SongPosition, UpdateSongDTO } from '../views/admin/song/types'
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

export const createSong = (songDTO: CreateSongDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/`,{
      method: "POST",
      body: JSON.stringify(songDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const song: Song = await response.json();
    dispatch(addSong(song))
  }catch(err){
    throw err
  }
}

export const updateSong = (songDTO: UpdateSongDTO, songPosition: SongPosition) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/${songPosition.id}/`,{
      method: "PATCH",
      body: JSON.stringify(songDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const song: Song = await response.json();
    dispatch(patchSong({song, index: songPosition.index}))
  }catch(err){
    throw err
  }
}

export const deleteSong = (id: string, index: number) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;

    dispatch(removeSong({id: id, index: index}))
  }catch(err){
    throw err
  }
}