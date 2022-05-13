import { Genre } from "./genre";
import { Singer } from "./singer";

export interface Album{
  id: string;
  name: string;
  releaseDate: Date;
  price: number;
  stock: number;
  image: string;
  genre: Genre;
  singer: Singer[];
}