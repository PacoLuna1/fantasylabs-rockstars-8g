export interface getByIDSingerDTO{
  _id: string;
}

export interface createSingerDTO{
  stage_name: string;
  name: string;
  last_name: string;
  nationality: string;
  image: string;
}

export interface updateSingerDTO{
  _id: string;
  stage_name: string;
  name: string;
  last_name: string;
  nationality: string;
  image: string;
}

export interface deleteSingerDTO{
  _id: string;
}