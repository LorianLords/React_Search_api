import {Api, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CardsState, setCardList} from "../CardList/CardsSlice.ts";
import {ApiResponce, CardProps} from "../../types/types.ts";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setSearch } from "../Search/SearchSlice.ts";
import removeDuplicates from "../../utils/RemoveDuplicates.ts";
import { fetchImg } from "../../services/apiService.ts";
import { setTotalPages } from "../Pagination/PaginationSlice.ts";

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
    getCardList: builder.query<
      ApiResponce,
      { searchText: string | null; currentPage: number }
    >({
      query: ({ searchText, currentPage }) => {
        const url = searchText ? "/artworks/search" : "/artworks";
        return {
          url,
          params: {
            q: searchText,
            fields: "id,title,artist_display,date_display,image_id,pagination",
            limit: 10,
            page: currentPage || 1,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const artworks = removeDuplicates(data.data) as CardProps[];
          const artworksWithImages = await fetchImg(artworks);
          dispatch(setTotalPages(data.pagination.total_pages));
          dispatch(setCardList(artworksWithImages));
          console.log("AFTER API ARTWORKS");
          console.log(artworksWithImages);
        } catch (error) {
          console.error(
            "Error fetching artworks with invalid searchText: ",
            error,
          );
        }
      },

     /* transformResponse: async (response: ApiResponse) => {
        const artworks = removeDuplicates(response.data) as CardProps[];
        const artworksWithImages = await fetchImg(artworks);
        return artworksWithImages;
      },*/
    }),
  }),
});

export const { useGetCardListQuery } = apiSlice;
export default listenerMiddleware;
