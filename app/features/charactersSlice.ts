import { createSlice } from "@reduxjs/toolkit";
import { CharacterItem } from "../data/users.data";
import { fetchCharacters } from "../services/characterThunk";

export interface CharactersState {
  characters: {
    results: CharacterItem[];
  };
}

const initialState: CharactersState = {
  characters: {
    results: [],
  },
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters.results = action.payload;
    });
  },
});
