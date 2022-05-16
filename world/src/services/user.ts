import { AppDispatch } from '../app/store';
import { deleteAuth, addAuth } from '../feature/authSlice';
import { setLogin } from '../feature/authSlice';
import { setLoading } from '../feature/loaderSlice';
import { LoginDTO, tokenDTO } from '../views/auth/type'

export const login = (user: LoginDTO) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch("http://3.218.67.164:9010/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status !== 200) return "";
    const userAuth = await response.json();
    dispatch(addAuth(userAuth));

    const responseLog = await fetch("http://3.218.67.164:9010/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userAuth.access}`
      },
      body: JSON.stringify(user),
    });

    if (responseLog.status !== 200) return "";
    const userlog = await responseLog.json();
    dispatch(setLogin(userlog));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = (token: tokenDTO) => async (dispatch: AppDispatch) =>{
  try{
    const response = await fetch(`http://3.218.67.164:9010/users/logout`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access}`
      },
      body: JSON.stringify(token)
    });
    if(response.status !== 204) return;
    dispatch(deleteAuth());
  }catch(err){
    throw err
  }
}