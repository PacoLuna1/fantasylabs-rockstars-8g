export interface LoginDTO{
  username: string;
  email: string;
  password: string;
}

export interface tokenDTO {
  access: string;
  refresh: string;
}