import { Singer } from '../models/singer'
import { CreateSingerDTO, SingerPosition, UpdateSingerDTO } from '../views/admin/singer/types'
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

export const createSinger = (singerDTO: CreateSingerDTO) => async (dispatch: AppDispatch)  =>{
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

export const updateSinger = (singerDTO: UpdateSingerDTO, singerPosition: SingerPosition) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/singers/${singerPosition.id}/`,{
      method: "PATCH",
      body: JSON.stringify(singerDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const singer: Singer = await response.json();
    dispatch(patchSinger({singer, index: singerPosition.index}))
  }catch(err){
    throw err
  }
}


export const deleteSinger = (id: string, index: number) => async (dispatch: AppDispatch) =>{
  try{
    console.log(id)
    console.log(index)
    const response = await fetch(`http://3.218.67.164:9010/singers/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
    dispatch(removeSinger({id: id, index: index}))
  }catch(err){
    throw err
  }
}