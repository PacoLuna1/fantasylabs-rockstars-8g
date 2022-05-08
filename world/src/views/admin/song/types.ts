import { Album } from '../../../models/album'
import { Singer } from '../../../models/singer';

export interface getByIDSongDTO{
  _id: string;
}

export interface createSongDTO{
  name: string;
  release_date: Date;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  album?: Album;
  singer: Singer;
}

export interface updateSongDTO{
  _id: string;
  name: string;
  release_date: Date;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  album?: Album;
  singer: Singer;
}

export interface deleteSongDTO{
  _id: string;
}