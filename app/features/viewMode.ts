import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface ViewModeState {
  result: {
    idDetail: string;
  };
}

const initialState: ViewModeState = {
  result: {
    idDetail: localStorage.getItem('viewModeQuery') || '',
  },
};

export const viewModeSlice = createSlice({
  name: "valueViewMode",
  initialState,
  reducers: {
    setViewModeResults: (state, action) => {
      state.result.idDetail = action.payload;
      localStorage.setItem('viewModeQuery', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('localStorage/read', (state) => {
      const viewModeLocalStorage = localStorage.getItem('viewModeQuery');
      if (viewModeLocalStorage) {
        state.result.idDetail = viewModeLocalStorage;
      }
    });
  },
});

export const selectViewModeResults = createSelector(
  (state: { valueViewMode: ViewModeState }) => state.valueViewMode,
  (valueViewMode) => valueViewMode.result.idDetail
);

export const { setViewModeResults } = viewModeSlice.actions;

export default viewModeSlice.reducer;
