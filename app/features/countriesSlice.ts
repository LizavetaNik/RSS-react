import { createSlice } from '@reduxjs/toolkit';

const initialCountries = ['США', 'Канада', 'Франция', 'Германия', 'Япония', 'Англия', 'Украина', 'Бразилия', 'Австралия', 'Индия'];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: initialCountries
  },
  reducers: {
    // Опционально: редьюсеры для управления состоянием стран, если нужны
  }
});

export default countriesSlice.reducer;

