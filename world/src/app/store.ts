import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import labReducer from '../feature/labSlice'
import authReducer from '../feature/authSlice'
import loaderReducer from '../feature/loaderSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
    lab: labReducer,
    loader: loaderReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
