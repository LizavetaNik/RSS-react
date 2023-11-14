import { createSelector, createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: {
    isLoading: boolean;
  };
}

const initialState: LoadingState = {
  loading: {
    isLoading: true,
  },
};

export const loadingSlice = createSlice({
  name: "valueLoading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectIsLoading = createSelector(
    (state: { valueLoading: LoadingState }) => state.valueLoading,
    (valueLoading) => valueLoading.loading.isLoading
);

export default loadingSlice.reducer;