import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CardProps } from "../../types/types.ts";
import { fetchData } from "../../services/apiService.ts";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

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

export interface FetchProps {
  search: string | null;
  currentPage: number;
}

export const fetchCardList = createAsyncThunk(
  "cards/fetchCardList",
  async ({ search, currentPage }: FetchProps, { rejectWithValue }) => {
    try {
      const data: CardProps[] = await fetchData(
        search,
        currentPage,
        // setTotalPages,
      );
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return rejectWithValue(error);
    }
  },
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    //ассинхронные редюсеры
    builder
      .addCase(fetchCardList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardList.fulfilled, (state, action) => {
        state.loading = false;
        state.cardList = action.payload;
      })
      .addCase(fetchCardList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading,setError } = cardsSlice.actions;
export default cardsSlice.reducer;
