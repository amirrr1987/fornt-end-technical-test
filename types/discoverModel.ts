export interface Discover {
  page: number;
  results: MovieItem[] | TvItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// export interface TvItem {
//   adult: boolean;
//   backdrop_path: null | string;
//   genre_ids: number[];
//   id: number;
//   origin_country: string[];
//   original_language: string;
//   original_name: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   first_air_date: Date;
//   name: string;
//   vote_average: number;
//   vote_count: number;
// }


export interface TvItem
  extends Omit<
    MovieItem,
    "backdrop_path" | "original_title" | "release_date" | "title" | "video"
  > {
  origin_country: string[];
  original_name: string;
  poster_path: string;
  first_air_date: Date;
  name: string;
}
export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Tl = "tl",
}
