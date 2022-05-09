import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { songSelector } from '../../../feature/labSlice';
import { AppDispatch } from '../../../app/store';
import { getSongs } from '../../../services/song';

export const Song:FC = ()=> {
  const dispatch: AppDispatch = useDispatch();

  const songs = useAppSelector(songSelector);

  useEffect(() =>{
    dispatch(getSongs())
  }, [dispatch]);

  return (
    <>
      {songs !== undefined ? (
        <div>
          {songs.map((song, index) => (
              <p key={`${song._id}-${index}`}>{song.name}</p>
          ))}
        </div>
      ): null}
    </>
  );
}
