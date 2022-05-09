import { Genre } from '../models/genre';
import { createGenreDTO, deleteGenreDTO, updateGenreDTO } from '../views/admin/genre/types';
import { addGenre, patchGenre, removeGenre, setGenres } from '../feature/labSlice';
import { AppDispatch } from '../app/store';
import { setLoading } from '../feature/loaderSlice';

export const getGenres = () => async (dispatch: AppDispatch) =>{
  try{
    dispatch(setLoading(true));
    const response = await fetch('http://3.218.67.164:9010/genres/')
    if(response.status !== 200) return "";

    const genres: Genre[] = await response.json();
    dispatch(setGenres(genres));
  }catch(err){
    throw err;
  } finally{
    dispatch(setLoading(false));
  }
}

export const createGenre = (genreDTO: createGenreDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/genres/`,{
      method: "POST",
      body: JSON.stringify(genreDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 201) return;

    const genre: Genre = await response.json();
    dispatch(addGenre(genre))
  }catch(err){
    throw err
  }
}

export const updateGenre = (genreDTO: updateGenreDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/genres/${genreDTO._id}/`,{
      method: "PATCH",
      body: JSON.stringify(genreDTO),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 200) return;

    const genre: Genre = await response.json();
    dispatch(patchGenre(genre))
  }catch(err){
    throw err
  }
}


export const deleteGenre = (genreDTO: deleteGenreDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/genres/${genreDTO._id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
    dispatch(removeGenre(genreDTO._id))
  }catch(err){
    throw err
  }
}