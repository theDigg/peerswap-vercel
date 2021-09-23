import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
