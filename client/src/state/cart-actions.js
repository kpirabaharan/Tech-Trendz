import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

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
      const { items, total } = await response.json();
      return { items, total };
    }
  },
);
