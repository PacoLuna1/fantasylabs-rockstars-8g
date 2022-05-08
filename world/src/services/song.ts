import { Song } from '../models/song'
import { createSongDTO, deleteSongDTO, updateSongDTO } from '../views/admin/song/types'

export const getSongs = async () =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/songs/");
    if(response.status !== 200) return;

    const songs: Song[] = await response.json()
  }catch(err){
    throw err;
  }
}

export const createSong = async (songDTO: createSongDTO) =>{
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
  }catch(err){
    throw err
  }
}

export const updateSong = async (songDTO: updateSongDTO) =>{
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
  }catch(err){
    throw err
  }
}

export const deleteSong = async (songDTO: deleteSongDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/songs/${songDTO._id}`,{
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