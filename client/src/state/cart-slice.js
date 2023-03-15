import { createSlice } from '@reduxjs/toolkit';

import { addToCart } from './cart-actions';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.total = payload.total;
    });
  },
});

export default cartSlice.reducer;