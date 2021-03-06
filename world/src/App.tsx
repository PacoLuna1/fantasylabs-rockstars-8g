import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Aside } from './components/aside/component';
import { Navbar } from './components/navbar/component';
import { Styles } from './theme/types';
import { AdminAlbum } from './views/admin/album/component';
import { AdminGenre } from './views/admin/genre/component';
import { AdminSinger } from './views/admin/singer/component';
import { AdminSong } from './views/admin/song/component';
import { HomePage } from './views/homepage/component';
import { LoginAuth } from './views/auth/component';

export const App:FC = ()=> {
  const styles: Styles = {
    asideRoutesContainer:{
      display: "flex"
    },
  };

  return (
    <>
      <Navbar />
      <Box sx={styles.asideRoutesContainer}>
        <Aside />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adminGenre" element={<AdminGenre />} />
          <Route path="/adminSinger" element={<AdminSinger />} />
          <Route path="/adminAlbum" element={<AdminAlbum />} />
          <Route path="/adminSong" element={<AdminSong />} />
          <Route path="/login" element={<LoginAuth />} />
        </Routes>
      </Box>
    </>
  );
}

