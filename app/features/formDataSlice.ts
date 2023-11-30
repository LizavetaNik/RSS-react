import { createSlice } from '@reduxjs/toolkit';
import { DataCustom } from '../data/users.data';

const initialState: DataCustom = {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    termsAndConditions: false,
    country: '',
    image: ''
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: {
    data: initialState
  },
  reducers: {
    updateFormData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { updateFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
