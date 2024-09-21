import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

export interface PaginationState {
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const initialPage = (): number => {
  // const router = useRouter();
  // const { page } = router.query;
  // return typeof page === 'string' ? parseInt(page, 10) : 1;
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page') || '1', 10);
};

const initialState = {
  totalPages: 1,
  currentPage: initialPage(),
  pageSize: 15,
};

const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
      console.log(action.payload);
    },
    incrementCurPage: (state) => {
      state.currentPage++;
    },
    decrementCurPage: (state) => {
      state.currentPage--;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setTotalPages, setCurrentPage, incrementCurPage, decrementCurPage } =
  PaginationSlice.actions;
export default PaginationSlice.reducer;
