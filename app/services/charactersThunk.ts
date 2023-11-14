import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from '../features/loadingSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (params: { name: string; pageNumber: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { name, pageNumber } = params;
    try {
      const queryParams = [];
      if (name) {
        queryParams.push(`name=${name}`);
      }
      const queryString = queryParams.length > 0 ? `&${queryParams}` : '';
      const response = await fetch(`${API_BASE_URL}/api/character?page=${pageNumber}${queryString}`, {
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
      thunkAPI.dispatch(setLoading(false));
      return responseBody;
    } catch (e) {
      console.log(`HTTP error: ${e}`);
      thunkAPI.dispatch(setLoading(false));      
      throw new Error(`HTTP error: ${e}`);
    }
  }
);
