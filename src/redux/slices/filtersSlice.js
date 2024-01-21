import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
      state.categoriesIndex = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortId(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoriesIndex = Number(action.payload.categoriesIndex);
    },
  },
});

export const selectSort = (state) => state.filter.sort;

export const { setCategoriesIndex, setSortId, setCurrentPage, setFilters, setSearchValue } =
  filtersSlice.actions;

export default filtersSlice.reducer;
