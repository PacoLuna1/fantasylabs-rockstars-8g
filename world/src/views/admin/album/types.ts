import { Genre } from '../../../models/genre'
import { Singer } from '../../../models/singer';

export interface getByIDAlbumDTO{
  _id: string;
}

export interface createAlbumDTO{
  name: string;
  releaseDate: Date;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer;
}

export interface updateAlbumDTO{
  _id: string;
  name: string;
  releaseDate: Date;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer;
}

export interface deleteAlbumDTO{
  _id: string;
}