import { createSlice } from '@reduxjs/toolkit';
import { fetchProductData } from './product-actions';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  // reducers: {
  //   setProducts(state, { payload }) {
  //     state.products = payload.products;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
      state.products = payload.products;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
