export interface User{
  id: string;
  email: string;
  userName: string;
  password: string;
}

export interface UserDTO{
  id: string;
  email: string;
  type: number;
}