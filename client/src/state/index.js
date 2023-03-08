import { configureStore } from '@reduxjs/toolkit';

import productSliceReducer from './product-slice';

const store = configureStore({ reducer: { products: productSliceReducer } });

export default store;
