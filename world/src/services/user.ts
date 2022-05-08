import { User } from '../models/user'

export const deleteUser = async (id: string) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/users/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status !== 204) return;
  }catch(err){
    throw err
  }
}