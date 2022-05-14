import { Genre } from '../../../models/genre'
import { Singer } from '../../../models/singer';

export interface GetByIDAlbumDTO{
  id: string;
}

export interface CreateAlbumDTO{
  name: string;
  releaseDate: Date;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer;
}

export interface UpdateAlbumDTO{
  name: string;
  releaseDate: Date;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer;
}

export interface DeleteAlbumDTO{
  id: string;
}

export interface AlbumPosition {
  id: string;
  index: number;
}