import { Genre } from '../models/genre'
import { createGenreDTO, deleteGenreDTO, updateGenreDTO } from '../views/admin/genre/types'

export const getGenres = async () =>{
  try{
    const response = await fetch('http://3.218.67.164:9010/genres/')
    if(response.status !== 200) return;

    const genres: Genre[] = await response.json();
  }catch(err){
    throw err
  }
}

export const createGenre = async (genreDTO: createGenreDTO) =>{
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
  }catch(err){
    throw err
  }
}

export const updateGenre = async (genreDTO: updateGenreDTO) =>{
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
  }catch(err){
    throw err
  }
}


export const deleteGenre = async (genreDTO: deleteGenreDTO) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/genres/${genreDTO._id}`,{
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