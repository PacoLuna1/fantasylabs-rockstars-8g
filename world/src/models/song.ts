import { Album } from './album';
import { Singer } from './singer';

export interface Song{
  id: string;
  name: string;
  release_date: Date;
  duration?: string;
  complete_file: string;
  preview_file: string;
  price?: number;
  album: Album[];
  singer: Singer[];
}