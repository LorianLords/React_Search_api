import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CardsState } from "../CardList/CardsSlice.ts";
import { CardProps } from "../../types/types.ts";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setSearch } from "../Search/SearchSlice.ts";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setSearch,
  effect: (action) => {
    const searchText = action.payload;
    localStorage.setItem("searchText", searchText);
    console.log("Данные search сохранены в localStorage");
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.artic.edu/api/v1" }),
  endpoints: (builder) => ({
    getCardList: builder.query<CardProps[], void>({
      query: () => `/artworks`,
    }),
  }),
});

export const { useGetCardListQuery } = apiSlice;
export default listenerMiddleware;