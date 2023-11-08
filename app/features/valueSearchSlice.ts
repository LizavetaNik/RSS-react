import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface SearchState {
  search: {
    results: string;
  };
}

const initialState: SearchState = {
  search: {
    results: '',
  },
};

export const searchSlice = createSlice({
  name: "valueSearch",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.search.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('localStorage/read', (state) => {
      const searchFromLocalStorage = localStorage.getItem('searchQuery');
      if (searchFromLocalStorage) {
        state.search.results = searchFromLocalStorage;
      }
    });
  },
});

export const selectSearchResults = createSelector(
  (state: { valueSearch: SearchState }) => state.valueSearch,
  (valueSearch) => valueSearch.search.results
);

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
