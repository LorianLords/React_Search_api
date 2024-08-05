import axios from "axios";
import { CardProps } from "../types/types";
import removeDuplicates from "../utils/RemoveDuplicates";

const API_URL = "https://api.artic.edu/api/v1";
const API_IMG_URL = "https://www.artic.edu/iiif/2";

const api = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const fetchData = async (searchItem: string | null) => {
  console.log(searchItem);
  try {
    const response = searchItem
      ? await fetchSearchData(searchItem)
      : await api.get("/artworks", {
          params: {
            fields: "id,title,artist_display,date_display,image_id",
            limit: 35,
            // "pagination": {
          },
          /* params:  searchText && {search: searchText}*/
        });

    let data = response.data.data;
    data = removeDuplicates(data);
    return (await fetchImg(data)) as CardProps[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const fetchImg = async (data: CardProps[]) => {
  return await Promise.all(
    data.map(async (artwork: CardProps) => {
      //console.log('Artwork:', artwork);
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

export const fetchSearchData = async (searchItem: string) => {
  const response = await api.get("/artworks/search", {
    params: {
      q: searchItem,
      fields: "id,title,artist_display,date_display,image_id",
      limit: 35,
      // "pagination": {
    },
  });
  return response;
};
