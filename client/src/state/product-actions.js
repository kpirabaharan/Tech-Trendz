import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

export const fetchProductData = createAsyncThunk(
  'products/fetchData',
  async (mode) => {
    const response = await fetch(`http://localhost:8080/product/${mode}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw json(
        { message: 'Could not fetch details for products.' },
        { status: 500 },
      );
    } else {
      const products = await response.json();
      return products;
    }
  },
);
