import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./CardList/CardsSlice.ts";
import paginationReducer from  "./Pagination/PaginationSlice.ts"
import searchReducer from "./Search/SearchSlice.ts";
import detailsReducer from "./DetailsCard/DetailsSlice.tsx";
export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    pagination: paginationReducer,
    search: searchReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
