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