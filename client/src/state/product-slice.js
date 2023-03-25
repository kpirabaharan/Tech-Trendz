import { createSlice } from '@reduxjs/toolkit';

import { fetchProductData } from './product-actions';

const initialState = {
  items: [],
  numOfProducts: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
      state.items = payload.products;
      state.numOfProducts = payload.numOfProducts;
    });
  },
});

export default productSlice.reducer;
