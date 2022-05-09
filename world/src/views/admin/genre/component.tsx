import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { genreSelector } from '../../../feature/labSlice';
import { getGenres } from '../../../services/genre';
import { AppDispatch } from '../../../app/store';

export const Genre:FC = ()=> {
  const dispatch: AppDispatch = useDispatch();

  const genres = useAppSelector(genreSelector);

  useEffect(() =>{
    dispatch(getGenres())
  }, [dispatch]);

  return (
    <>
      {genres !== undefined ? (
        <div>
          {genres.map((genre, index) => (
              <p key={`${genre._id}-${index}`}>{genre.description}</p>
          ))}
        </div>
      ): null}
    </>
  );
}
