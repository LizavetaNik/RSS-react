import { createSlice } from '@reduxjs/toolkit';

const initialCountries = ['USA', 'Canada', 'France', 'Germany', 'Japan', 'England', 'Ukraine', 'Brazil', 'Australia', 'India'];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: initialCountries
  },
  reducers: {
  }
});

export default countriesSlice.reducer;

