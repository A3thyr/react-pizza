import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesIndex: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoriesIndex, setSortId, setCurrentPage } = filtersSlice.actions;

export default filtersSlice.reducer;
