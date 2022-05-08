export interface getByIDGenreDTO{
  _id: string;
}

export interface createGenreDTO{
  description: string;
}

export interface updateGenreDTO{
  _id: string;
  description: string;
}

export interface deleteGenreDTO{
  _id: string;
}