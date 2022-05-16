import { Album } from '../../../models/album'
import { Singer } from '../../../models/singer';

export interface GetByIDSongDTO{
  id: string;
}

export interface CreateSongDTO{
  name: string;
  release_date: string;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  album?: Album[];
  singer: Singer[];
}

export interface CreateSongFormik{
  name: string;
  release_date: string;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  albumID: [string];
  singerID: [string];
}

export interface UpdateSongDTO{
  name: string;
  release_date: string;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  album?: Album[];
  singer: Singer[];
}

export interface UpdateSongFormik{
  name: string;
  release_date: string;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  albumID: [string];
  singerID: [string];
}

export interface DeleteSongDTO{
  id: string;
}

export interface SongPosition {
  id: string;
  index: number;
}