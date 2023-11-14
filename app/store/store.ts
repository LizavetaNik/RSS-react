import { configureStore } from "@reduxjs/toolkit";

import { searchSlice } from "../features/valueSearchSlice";
import { loadingSlice } from "../features/loadingSlice";

import { charactersApi } from '../features/charactersApi';
import { charApi } from "../features/charApi";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    valueSearch: searchSlice.reducer,
    valueLoading: loadingSlice.reducer,
    valueLoadingItem: loadingSlice.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [charApi.reducerPath]: charApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .concat(charApi.middleware),
});

export type AppDispatch = typeof store.dispatch;