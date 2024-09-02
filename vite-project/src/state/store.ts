import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./CardList/CardsSlice.ts";
import paginationReducer from  "./Pagination/PaginationSlice.ts"
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
