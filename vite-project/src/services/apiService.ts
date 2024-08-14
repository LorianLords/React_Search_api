import axios from "axios";
import { CardProps } from "../types/types";
import removeDuplicates from "../utils/RemoveDuplicates";
import React from "react";

const API_URL = "https://api.artic.edu/api/v1";
const API_IMG_URL = "https://www.artic.edu/iiif/2";

const api = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const fetchData = async (
  searchItem: string | null,
  currentPage: number,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
) => {
  console.log("API: ", typeof searchItem);
  try {
    const url = searchItem ? "/artworks/search" : "/artworks";
    const response = await api.get(url, {
      params: {
        q: searchItem,
        fields: "id,title,artist_display,date_display,image_id,pagination",
        limit: 10,
        page: currentPage || 1,
      },
    });
    setTotalPages(response.data.pagination.total_pages || 1);
    let data = response.data.data;
    console.log(data);
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
