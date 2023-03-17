import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

export const fetchCart = createAsyncThunk(
  'cart/:userId',
  async ({ userId }) => {
    const response = await fetch(`http://localhost:8080/cart/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw json({ message: 'Could not fetch cart.' }, { status: 500 });
    } else {
      const { items, totalAmount, totalQuantity } = await response.json();
      return { items, totalAmount, totalQuantity };
    }
  },
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, userId }) => {
    const response = await fetch(`http://localhost:8080/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId }),
    });

    if (!response.ok) {
      throw json(
        { message: 'Could not add product to cart.' },
        { status: 500 },
      );
    } else {
      const { items, totalAmount, totalQuantity } = await response.json();
      return { items, totalAmount, totalQuantity };
    }
  },
);

export const removeAllFromCart = createAsyncThunk(
  'cart/removeAllFromCart',
  async ({ productId, userId }) => {
    const response = await fetch(`http://localhost:8080/cart/removeAll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId }),
    });

    if (!response.ok) {
      throw json(
        { message: 'Could not remove products from cart.' },
        { status: 500 },
      );
    } else {
      const { items, totalAmount, totalQuantity } = await response.json();
      return { items, totalAmount, totalQuantity };
    }
  },
);
