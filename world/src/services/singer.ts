import { Singer } from '../models/singer'
import { createSingerDTO, deleteSingerDTO, updateSingerDTO } from '../views/admin/singer/types'
import { setSingers, addSinger, patchSinger, removeSinger } from '../feature/labSlice';
import { AppDispatch } from '../app/store';

export const getSingers = () => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch("http://3.218.67.164:9010/singers/");
    if(response.status !== 200) return;

    const singers: Singer[] = await response.json();
    dispatch(setSingers(singers))
  }catch(err){
    throw err;
  }
}

export const createSinger = (singerDTO: createSingerDTO) => async (dispatch: AppDispatch)  =>{
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
    dispatch(addSinger(singer))
  }catch(err){
    throw err
  }
}

export const updateSinger = (singerDTO: updateSingerDTO) => async (dispatch: AppDispatch) =>{
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
    dispatch(patchSinger(singer))
  }catch(err){
    throw err
  }
}


export const deleteSinger = (singerDTO: deleteSingerDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/singers/${singerDTO._id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
    dispatch(removeSinger(singerDTO._id))
  }catch(err){
    throw err
  }
}