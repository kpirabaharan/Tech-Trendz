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
        const formatDate = (date) => {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

          let year = date.getFullYear();
          let month = monthNames[date.getMonth()];
          let day = date.getDate().toString().padStart(2, '0');
          return `${month} ${day}, ${year}`;
        };
        const date = new Date(order.date);
        const secondDate = new Date(date.getTime() + 345600000);

        const orderDate = formatDate(date);
        const estimatedDeliveryDate = formatDate(secondDate);
        return {
          orderId: order._id,
          orderFirstName: order.user.firstName,
          orderLastName: order.user.lastName,
          orderEmail: order.user.email,
          orderDate: orderDate,
          deliveryDate: estimatedDeliveryDate,
          products: order.products,
          totalAmount: order.totalAmount,
          totalQuantity: order.totalQuantity,
        };
      });
    });
    builder.addCase(successfulOrder.fulfilled, (state, { payload }) => {
      state.items = payload.map((order) => {
        const formatDate = (date) => {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

          let year = date.getFullYear();
          let month = monthNames[date.getMonth()];
          let day = date.getDate().toString().padStart(2, '0');
          return `${month} ${day}, ${year}`;
        };
        const date = new Date(order.date);
        const secondDate = new Date(date.getTime() + 345600000);

        const orderDate = formatDate(date);
        const estimatedDeliveryDate = formatDate(secondDate);
        return {
          orderId: order._id,
          orderFirstName: order.user.firstName,
          orderLastName: order.user.lastName,
          orderEmail: order.user.email,
          orderDate: orderDate,
          deliveryDate: estimatedDeliveryDate,
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
