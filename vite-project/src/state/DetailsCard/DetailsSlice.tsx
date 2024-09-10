import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDetailProps } from "../../types/types.ts";
import { AppDispatch, RootState } from "../store.ts";
import { fetchCardDetails } from "../../services/apiService.ts";

export interface DetailsState {
  isDetailsOpen: boolean;
  cardId: string;
  detInfo: CardDetailProps | null;
  detLoading: boolean;
  isVisible: boolean;
  error: string | null | undefined;
}

const initialState: DetailsState = {
  isDetailsOpen: false,
  cardId: "",
  detInfo: null,
  detLoading: true,
  isVisible: false,
  error: null,
};
/*
export const fetchDetails = createAsyncThunk<
  CardDetailProps,
  string,
  { state: RootState }
>("details/fetchDetails", async (id, { rejectWithValue }) => {
  try {
    return await fetchCardDetails(id);
  } catch (error) {
    console.error("Error fetching data: ", error);
    return rejectWithValue(error);
  }
});*/

const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    toggleIsDetailsOpen: (state, action) => {
      state.isDetailsOpen = action.payload;
    },
    setCardId: (state, action) => {
      state.cardId = action.payload;
    },
  },
  /*extraReducers: (builder) => {
    //ассинхронные редюсеры
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.detLoading = true;
        state.isVisible = true;
        state.error = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.detLoading = false;
        state.isVisible = true;
        state.detInfo = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.detLoading = false;
        state.error = action.payload as string;
      });
  },*/
});

export const { toggleIsDetailsOpen, setCardId } = DetailsSlice.actions;
export default DetailsSlice.reducer;
