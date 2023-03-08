import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductData = createAsyncThunk(
  'products/fetchData',
  async (mode) => {
    const response = await fetch(`http://localhost:8080/products/${mode}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Fetch Response Failed!');
    }

    const products = await response.json();
    return products;
  },
);
