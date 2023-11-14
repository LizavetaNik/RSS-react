import { createSlice } from "@reduxjs/toolkit";
import { CharacterItem } from "../data/users.data";
import { fetchChar } from "../services/charThunk";

export interface CharState {
  character: {
    results: CharacterItem | null;
  };
}

const initialState: CharState = {
  character: {
    results: null,
  },
};

export const charSlice = createSlice({
  name: "char",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChar.fulfilled, (state, action) => {
      state.character.results = action.payload;
    });
  },
});