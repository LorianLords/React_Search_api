import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './SearchSlice/SearchSlice';
import paginationReducer from './PaginationSlice/PaginationSlice';
import { apiSlice } from './Api/apiSlice';
import cardsReducer from './CardListSlice/CardListSlice';
import detailsReducer from './DetailsSlice/DetailsSlice';
import listenerMiddleware from '@/utils/listenerMiddleware';
export const store = () => {
  return configureStore({
    reducer: {
      cardList: cardsReducer,
      pagination: paginationReducer,
      search: searchReducer,
      details: detailsReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
