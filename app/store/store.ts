import { configureStore } from "@reduxjs/toolkit";
import { charactersSlice } from "../features/characterSlice";
import { searchSlice } from "../features/valueSearchSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    characterss: charactersSlice.reducer,
    valueSearch: searchSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;