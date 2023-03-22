import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

export const fetchCart = createAsyncThunk(
  'cart/:userId',
  async ({ userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}cart/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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
  async ({ productId, userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}cart/add`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      },
    );

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

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId, userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}cart/remove`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      },
    );

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

export const removeAllFromCart = createAsyncThunk(
  'cart/removeAllFromCart',
  async ({ productId, userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}cart/removeAll`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      },
    );

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

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ userId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_NODE_SERVER}cart/clear`,
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
        { message: 'Could not remove products from cart.' },
        { status: 500 },
      );
    } else {
      const { items, totalAmount, totalQuantity } = await response.json();
      return { items, totalAmount, totalQuantity };
    }
  },
);
