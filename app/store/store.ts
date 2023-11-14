import { configureStore } from "@reduxjs/toolkit";
import { charactersSlice } from "../features/charactersSlice";
import { searchSlice } from "../features/valueSearchSlice";
import { loadingSlice } from "../features/loadingSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    characterss: charactersSlice.reducer,
    valueSearch: searchSlice.reducer,
    valueLoading: loadingSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;