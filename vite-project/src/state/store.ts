import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./CardList/CardsSlice.ts";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
