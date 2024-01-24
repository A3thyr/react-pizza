import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterState {
  searchValue: string;
  categoriesIndex: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterState = {
  searchValue: '',
  categoriesIndex: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoriesIndex(state, action: PayloadAction<number>) {
      state.categoriesIndex = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortId(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoriesIndex = Number(action.payload.categoriesIndex);
      } else {
        state.currentPage = 1;
        state.categoriesIndex = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoriesIndex, setSortId, setCurrentPage, setFilters, setSearchValue } =
  filtersSlice.actions;

export default filtersSlice.reducer;
