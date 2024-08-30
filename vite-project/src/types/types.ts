export type CardProps = {
  id: number;
  title: string;
  date_display: string;
  artist_display: string;
  image_id: string;
  image: string | null;
};

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
