import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { singerSelector } from '../../../feature/labSlice';
import { AppDispatch } from '../../../app/store';
import { getSingers } from '../../../services/singer';

export const Singer:FC = ()=> {
  const dispatch: AppDispatch = useDispatch();

  const singers = useAppSelector(singerSelector);

  useEffect(() =>{
    dispatch(getSingers())
  }, [dispatch]);

  return (
    <>
      {singers !== undefined ? (
        <div>
          {singers.map((singer, index) => (
              <p key={`${singer.id}-${index}`}>{singer.stage_name}</p>
          ))}
        </div>
      ): null}
    </>
  );
}
