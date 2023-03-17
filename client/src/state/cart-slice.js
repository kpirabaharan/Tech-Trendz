import { createSlice } from '@reduxjs/toolkit';

import { fetchCart, addToCart, removeAllFromCart } from './cart-actions';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
      state.totalQuantity = payload.totalQuantity;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
      state.totalQuantity = payload.totalQuantity;
    });
    builder.addCase(removeAllFromCart.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
      state.totalQuantity = payload.totalQuantity;
    });
  },
});

export default cartSlice.reducer;
