import { createSlice } from '@reduxjs/toolkit';

import { fetchOrders, successfulOrder } from './order-actions';

const initialState = {
  items: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderLogout: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.items = payload.orders;
    });
    builder.addCase(successfulOrder.fulfilled, (state, { payload }) => {
      state.items = payload.orders;
    });
  },
});

export const { orderLogout } = orderSlice.actions;

export default orderSlice.reducer;
