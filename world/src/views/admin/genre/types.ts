export interface GetByIDGenreDTO{
  id: string;
}

export interface CreateGenreDTO{
  description: string;
}

export interface UpdateGenreDTO{
  description: string;
}

export interface DeleteGenreDTO{
  id: string;
}

export interface GenrePosition {
  id: string;
  index: number;
}
