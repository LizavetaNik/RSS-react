import { createSelector, createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: {
    isLoading: boolean;
    isLoadingItem: boolean;
  };
}

const initialState: LoadingState = {
  loading: {
    isLoading: true,
    isLoadingItem: true,
  },
};

export const loadingSlice = createSlice({
  name: "valueLoading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading.isLoading = action.payload;
    },
    setLoadingItem: (state, action) => {
        state.loading.isLoadingItem = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectIsLoading = createSelector(
    (state: { valueLoading: LoadingState }) => state.valueLoading,
    (valueLoading) => valueLoading.loading.isLoading
);

export const { setLoadingItem } = loadingSlice.actions;

export const selectIsLoadingItem = createSelector(
    (state: { valueLoading: LoadingState }) => state.valueLoading,
    (valueLoading) => valueLoading.loading.isLoadingItem
);

export default loadingSlice.reducer;