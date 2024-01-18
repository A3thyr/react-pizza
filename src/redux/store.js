import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filtersSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});
