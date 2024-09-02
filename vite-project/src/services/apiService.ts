import axios from "axios";
import { CardDetailProps, CardProps } from "../types/types";
import removeDuplicates from "../utils/RemoveDuplicates";
import { setTotalPages } from "../state/Pagination/PaginationSlice.ts";
import { AppDispatch } from "../state/store.ts";

const API_URL = "https://api.artic.edu/api/v1";
const API_IMG_URL = "https://www.artic.edu/iiif/2";

const api = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const fetchData = async (
  searchItem: string | null,
  currentPage: number,
  dispatch: AppDispatch,
  //setTotalPages: React.Dispatch<React.SetStateAction<number>>,
) => {
  const url = searchItem ? "/artworks/search" : "/artworks";
  const response = await api.get(url, {
    params: {
      q: searchItem,
      fields: "id,title,artist_display,date_display,image_id,pagination",
      limit: 10,
      page: currentPage || 1,
    },
  });
  dispatch(setTotalPages(response.data.pagination.total_pages));
  const data = removeDuplicates(response.data.data);
  return (await fetchImg(data)) as CardProps[];
};

export const fetchImg = async (data: CardProps[]) => {
  return await Promise.all(
    data.map(async (artwork: CardProps) => {
      if (artwork.image_id != null) {
        const imageUrl =
          API_IMG_URL + `/${artwork.image_id}/full/843,/0/default.jpg`;

        return {
          ...artwork,
          image: imageUrl,
        };
      } else {
        return artwork;
      }
    }),
  );
};

export const fetchCardDetails = async (id?: string) => {
  try {
    const url = API_URL + "/artworks/" + id;
    const response = await api.get(url, {
      params: {
        fields:
          "title,artist_titles,dimensions,short_description,description,date_display,place_of_origin,image_id,category_titles",
      },
    });
    const data = response.data.data;
    console.log(data);
    return data as CardDetailProps;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
