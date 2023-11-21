import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  [key: string]: boolean; // characterId = key
}

const initialState: LoadingState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ characterId: string; isLoading: boolean }>) => {
      const { characterId, isLoading } = action.payload;
      state[characterId] = isLoading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
