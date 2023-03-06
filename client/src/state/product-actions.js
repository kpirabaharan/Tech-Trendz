import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductData = createAsyncThunk(
  'products/fetchData',
  async () => {
    const response = await fetch('http://localhost:8080/products', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Fetch Response Failed!');
    }

    const products = await response.json();
    return products;
  },
);
