import React from 'react';

export interface CardProps {
  id: number;
  title: string;
  date_display: string;
  artist_display: string;
  image_id: string;
  image: string | null;
}

export interface Links {
  name: string;
  url: string;
}

export type CardDetailProps = {
  image_id: string;
  title: string;
  artist_titles: [string];
  date_display: string;
  dimensions: string;
  place_of_origin: string;
  short_description?: string;
  description: string;
  category_titles: [string];
};

export interface ApiResponse {
  preference: null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: CardProps[];
  info: {
    license_text: string;
    license_links: [string];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}
export interface DataApi {
  cards: CardProps[];
  total_pages: number;
}
export interface ThemeType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>> | null;
}
export type Theme = 'light' | 'dark';
