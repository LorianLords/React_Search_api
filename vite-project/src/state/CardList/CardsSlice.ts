import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../../types/types.ts";
import { fetchData } from "../../services/apiService.ts";
import { Simulate } from "react-dom/test-utils";
import { AppDispatch, RootState, store } from "../store.ts";

export interface CardsState {
  cardList: CardProps[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cardList: [],
  loading: false,
  error: null,
};

interface FetchProps {
  searchText: string | null;
  currentPage: number;
}

// export const fetchCardList = createAsyncThunk<
//   CardProps[],
//   FetchProps,
//   { dispatch: AppDispatch; state: RootState }
// >(
//   "cards/fetchCardList",
//   async ({ searchText, currentPage }, { dispatch, rejectWithValue }) => {
//     try {
//       return await fetchData(searchText, currentPage, dispatch);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       return rejectWithValue(error);
//     }
//   },
// );

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setCardList: (state, action: PayloadAction<CardProps[]>) => {
      state.cardList = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   //ассинхронные редюсеры
  //   builder
  //     .addCase(fetchCardList.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchCardList.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.cardList = action.payload;
  //     })
  //     .addCase(fetchCardList.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload as string;
  //     });
  // },
});

export const { setLoading, setError, setCardList } = cardsSlice.actions;
export default cardsSlice.reducer;
