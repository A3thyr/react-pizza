import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza } from './types';
import axios from 'axios';
import { SearchPizzaParams } from './slice';

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://659d95dd47ae28b0bd34a20f.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
