import { configureStore } from "@reduxjs/toolkit";
import { charactersSlice } from "../features/charactersSlice";
import { searchSlice } from "../features/valueSearchSlice";
import { loadingSlice } from "../features/loadingSlice";
import { charSlice } from "../features/charSlice";
import { charactersApi } from '../features/charactersApi';
import { charApi } from "../features/charApi";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    characterss: charactersSlice.reducer,
    valueSearch: searchSlice.reducer,
    valueLoading: loadingSlice.reducer,
    valueLoadingItem: loadingSlice.reducer,
    charItem: charSlice.reducer,
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