import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

export const fetchOrders = createAsyncThunk(
  'order/:userId',
  async ({ userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}order/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw json({ message: 'Could not fetch orders!' }, { status: 500 });
    } else {
      const { orders } = await response.json();
      console.log(orders);
      return { orders };
    }
  },
);

export const successfulOrder = createAsyncThunk(
  'order/success',
  async ({ userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}order/success`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      },
    );

    if (!response.ok) {
      throw json(
        { message: 'Oops, something went wrong with your order!' },
        { status: 500 },
      );
    } else {
      const { orders } = await response.json();
      return { orders };
    }
  },
);
