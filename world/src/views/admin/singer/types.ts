export interface GetByIDSingerDTO{
  id: string;
}

export interface CreateSingerDTO{
  stage_name: string;
  name: string;
  last_name: string;
  nationality: string;
  image: string;
}

export interface UpdateSingerDTO{
  stage_name: string;
  name: string;
  last_name: string;
  nationality: string;
  image: string;
}

export interface DeleteSingerDTO{
  id: string;
}

export interface SingerPosition {
  id: string;
  index: number;
}