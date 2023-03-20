import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

export const fetchOrders = createAsyncThunk(
  'order/:userId',
  async ({ userId, token }) => {
    const response = await fetch(`http://localhost:8080/order/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw json({ message: 'Could not fetch orders!' }, { status: 500 });
    } else {
      const { orders } = await response.json();
      return orders;
    }
  },
);

export const successfulOrder = createAsyncThunk(
  'order/success',
  async ({ userId, token }) => {
    const response = await fetch(`http://localhost:8080/order/success`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw json(
        { message: 'Oops, something went wrong with your order!' },
        { status: 500 },
      );
    } else {
      const { orders } = await response.json();
      return orders;
    }
  },
);
