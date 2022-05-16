import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { tokenDTO } from "../views/auth/type";
import { UserDTO } from "../models/user";

export interface authState {
  token: tokenDTO;
  login: UserDTO
}

const initialState: authState = {
  token: {access: "", refresh: ""},
  login: {id:"",email:"",type:0}
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    addAuth: (state, action) => {
      state.token.access = action.payload.access;
      state.token.refresh = action.payload.refresh;
    },
    setAuth: (state, action) => {
      state.token = action.payload;
    },
    deleteAuth: (state) => {
      state.token.access = "";
      state.token.refresh = "";
    },
  },
});

export const { setLogin, addAuth, setAuth, deleteAuth } = AuthSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const tokenSelector = (state: RootState) => authSelector(state).token;
export const loginSelector = (state: RootState) => authSelector(state).login;

export default AuthSlice.reducer;