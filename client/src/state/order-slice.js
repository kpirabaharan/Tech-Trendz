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
      state.items = payload.map((order) => {
        const date = new Date(order.date);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${month}/${day}/${year}`;
        return {
          orderFirstName: order.user.firstName,
          orderLastName: order.user.lastName,
          orderEmail: order.user.email,
          orderDate: formattedDate,
          products: order.products,
          totalAmount: order.totalAmount,
          totalQuantity: order.totalQuantity,
        };
      });
    });
    builder.addCase(successfulOrder.fulfilled, (state, { payload }) => {
      state.items = payload.map((order) => {
        const date = new Date(order.date);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${month}/${day}/${year}`;
        return {
          orderFirstName: order.user.firstName,
          orderLastName: order.user.lastName,
          orderEmail: order.user.email,
          orderDate: formattedDate,
          products: order.products,
          totalAmount: order.totalAmount,
          totalQuantity: order.totalQuantity,
        };
      });
    });
  },
});
export const { orderLogout } = orderSlice.actions;

export default orderSlice.reducer;
