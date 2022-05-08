import { Singer } from '../models/singer'
import { createSingerDTO, deleteSingerDTO, updateSingerDTO } from '../views/admin/singer/types'

export const getSingers = async () =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/singers/");
    if(response.status !== 200) return;

    const singer: Singer[] = await response.json();
  }catch(err){
    throw err;
  }
}

export const createSinger = async (singerDTO: createSingerDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/singers/`,{
      method: "POST",
      body: JSON.stringify(singerDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 201) return;

    const singer: Singer = await response.json();
  }catch(err){
    throw err
  }
}

export const updateSinger = async (singerDTO: updateSingerDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/singers/${singerDTO._id}/`,{
      method: "PATCH",
      body: JSON.stringify(singerDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const singer: Singer = await response.json();
  }catch(err){
    throw err
  }
}


export const deleteSinger = async (singerDTO: deleteSingerDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/singers/${singerDTO._id}`,{
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