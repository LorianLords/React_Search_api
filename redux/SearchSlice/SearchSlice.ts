'use client';
import { createListenerMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit';

/*const initialSearch = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || localStorage.getItem('searchText') || '';
  }
  return ''; // Возвращаем пустую строку, если выполняется на сервере
};*/

export interface SearchState {
  searchText: string | undefined;
}

const initialState: SearchState = {
  searchText: undefined,
};

const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string | undefined>) => {
      state.searchText = action.payload;
      //state.searchText = action.payload === '' ? null : action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
