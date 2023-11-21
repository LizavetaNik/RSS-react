import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface QuantityItemsState {
  result: {
    quantityItems: number;
  };
}

const initialState: QuantityItemsState = {
  result: {
    quantityItems: 20,
  },
};

export const quantityItemsSlice = createSlice({
  name: "valuequantityItems",
  initialState,
  reducers: {
    setQuantityItemsResults: (state, action) => {
      state.result.quantityItems = action.payload;
      localStorage.setItem('quantityItemsQuery', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('localStorage/read', (state) => {
      const quantityItemsLocalStorage = localStorage.getItem('quantityItemsQuery');
      if (quantityItemsLocalStorage) {
        state.result.quantityItems = Number(quantityItemsLocalStorage);
      }
    });
  },
});

export const selectQuantityItemsResults = createSelector(
  (state: { valueQuantityItems: QuantityItemsState }) => state.valueQuantityItems,
  (valueQuantityItems) => valueQuantityItems.result.quantityItems
);

export const { setQuantityItemsResults } = quantityItemsSlice.actions;

export default quantityItemsSlice.reducer;