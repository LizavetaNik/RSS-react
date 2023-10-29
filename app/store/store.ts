/*import { configureStore } from "@reduxjs/toolkit";
import { booksSlice } from "../features/bookSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;*/