import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialSearch = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || localStorage.getItem("searchText") || "";
};

export interface SearchState {
  searchText: string;
}

const initialState: SearchState = {
  searchText: initialSearch(),
};

const SearchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
