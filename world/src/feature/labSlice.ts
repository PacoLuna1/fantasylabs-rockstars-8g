import { createSlice } from "@reduxjs/toolkit";
import { Singer } from '../models/singer'
import { Album } from '../models/album'
import { Song } from '../models/song'
import { Genre } from '../models/genre'
import { RootState } from '../app/store'

export interface labState{
  genres: Genre[];
  singers: Singer[];
  songs: Song[];
  albums: Album[];
}

const initialState: labState = {
  genres: [],
  singers: [],
  songs: [],
  albums: []
}

export const labSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {
    setGenres: (state, action) =>{
      state.genres = action.payload;
    },
    addGenre: (state, action) => {
      state.genres.push(action.payload)
    },
    patchGenre: (state, action) => {
      state.genres[action.payload.index] = action.payload.genre;
    },
    removeGenre: (state, action) => {
      state.genres.splice(action.payload, 1);
    },
    setSingers: (state, action) =>{
      state.singers = action.payload;
    },
    addSinger: (state, action) => {
      state.singers.push(action.payload);
    },
    patchSinger: (state, action) => {
      state.singers[action.payload.index] = action.payload.singer;
    },
    removeSinger: (state, action) => {
      state.singers.splice(action.payload, 1);
    },
    setSongs: (state, action) =>{
      state.songs = action.payload;
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    patchSong: (state, action) => {
      state.songs[action.payload.index] = action.payload.song;
    },
    removeSong: (state, action) => {
      state.songs.splice(action.payload, 1);
    },
    setAlbums: (state, action) =>{
      state.albums = action.payload;
    },
    addAlbum: (state, action) => {
      state.albums.push(action.payload);
    },
    patchAlbum: (state, action) => {
      state.albums[action.payload.index] = action.payload.album;
    },
    removeAlbum: (state, action) => {
      state.albums.splice(action.payload, 1);
    },
  }
})

export const { 
  setGenres, 
  addGenre,
  patchGenre,
  removeGenre,
  setSingers,
  addSinger,
  patchSinger,
  removeSinger, 
  setSongs, 
  addSong,
  patchSong,
  removeSong,
  setAlbums,
  addAlbum, 
  patchAlbum,
  removeAlbum } = labSlice.actions;

export const labSelector = ( state: RootState ) => state.lab;
export const genreSelector = ( state: RootState ) => labSelector(state).genres;
export const singerSelector = ( state: RootState ) => labSelector(state).singers;
export const songSelector = ( state: RootState ) => labSelector(state).songs;
export const albumSelector = ( state: RootState ) => labSelector(state).albums;


export default labSlice.reducer