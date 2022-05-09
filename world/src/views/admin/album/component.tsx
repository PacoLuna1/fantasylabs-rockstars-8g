import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { albumSelector } from '../../../feature/labSlice';
import { AppDispatch } from '../../../app/store';
import { getAlbums } from '../../../services/album';

export const Album:FC = ()=> {
  const dispatch: AppDispatch = useDispatch();

  const albums = useAppSelector(albumSelector);

  useEffect(() =>{
    dispatch(getAlbums())
  }, [dispatch]);

  return (
    <>
      {albums !== undefined ? (
        <div>
          {albums.map((album, index) => (
              <p key={`${album._id}-${index}`}>{album.name}</p>
          ))}
        </div>
      ): null}
    </>
  );
}

