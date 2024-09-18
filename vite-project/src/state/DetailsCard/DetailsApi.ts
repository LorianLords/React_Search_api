import { apiSlice } from "../Api/ApiSlice.ts";
import { ApiResponse, CardDetailProps, DataApi } from "../../types/types.ts";

export interface ResponseProps {
  config: unknown;
  data: CardDetailProps;
  info: unknown;
}

export const detailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCardDetails: builder.query<CardDetailProps, { cardId: string }>({
      query: ({ cardId }) => {
        console.log("DETAILS API", cardId);
        return {
          url: "/artworks/" + cardId,
          params: {
            fields:
              "title,artist_titles,dimensions,short_description,description,date_display,place_of_origin,image_id,category_titles",
          },
        };
      },
      transformResponse: async (
        response: ResponseProps,
      ): Promise<CardDetailProps> => {
        const data = response.data;
        return data as CardDetailProps;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetCardDetailsQuery } = detailsApi;
