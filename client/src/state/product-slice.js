import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'all',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setMode(state, { payload }) {

      state.mode = payload.mode;
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
  //     state.products = payload.products;
  //   });
  // },
});

export const { setMode } = productSlice.actions;

export default productSlice.reducer;
