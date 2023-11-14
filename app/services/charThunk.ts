import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoadingItem } from '../features/loadingSlice';

export const fetchChar = createAsyncThunk(
  "char/fetchChar",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingItem(true));
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.status === 404) {
        return "";
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseBody = await response.json();
      thunkAPI.dispatch(setLoadingItem(false));
      return responseBody;
    } catch (e) {
      console.log(`HTTP error: ${e}`);
      thunkAPI.dispatch(setLoadingItem(false));      
      throw new Error(`HTTP error: ${e}`);
    }
  }
);