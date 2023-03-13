import { configureStore } from '@reduxjs/toolkit';

import productSliceReducer from './product-slice';
import userSliceReduceer from './user-slice';

const store = configureStore({
  reducer: { products: productSliceReducer, user: userSliceReduceer },
});

export default store;
