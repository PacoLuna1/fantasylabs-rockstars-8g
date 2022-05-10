import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Genre } from './views/admin/genre/component';

export const App:FC = ()=> {

  return (
    <>
      <Routes>
        <Route path="/" element={<Genre />} />
      </Routes>
    </>
  );
}

