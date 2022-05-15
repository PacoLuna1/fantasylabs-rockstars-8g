import { Genre } from '../../../models/genre'
import { Singer } from '../../../models/singer';

export interface GetByIDAlbumDTO{
  id: string;
}

export interface CreateAlbumDTO{
  name: string;
  release_date: string;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer[];
}

export interface CreateAlbumFormik{
  name: string;
  release_date: string;
  price: number;
  stock: number;
  image: string;
  genreID: string;
  singerID: [string];
}

export interface UpdateAlbumDTO{
  name: string;
  release_date: string;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer[];
}

export interface UpdateAlbumFormik{
  name: string;
  release_date: string;
  price: number;
  stock: number;
  image: string;
  genreID: string;
  singerID: [string];
}

export interface DeleteAlbumDTO{
  id: string;
}

export interface AlbumPosition {
  id: string;
  index: number;
}