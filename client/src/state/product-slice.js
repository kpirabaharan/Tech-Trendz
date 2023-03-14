import { createSlice } from '@reduxjs/toolkit';

import { fetchProductData } from './product-actions';

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
  },
});

export default productSlice.reducer;
