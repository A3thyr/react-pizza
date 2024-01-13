import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filtersSlice';

export const store = configureStore({
  reducer: { filter },
});
