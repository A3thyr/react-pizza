import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesIndex: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoriesIndex(state, action) {
      console.log(action);
      state.categoriesIndex = action.payload;
    },
    setSortId(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoriesIndex, setSortId } = filtersSlice.actions;

export default filtersSlice.reducer;
