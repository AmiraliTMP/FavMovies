export type AppLocale = "en" | "fr" | "fa";

export type TMDBMovie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: TMDBGenre[];
  adult: boolean;
  original_language: string;
  video: boolean;
};

export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBPerson = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
  department?: string;
  known_for_department?: string;
  popularity: number;
};

export type TMDBVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

export type TMDBMovieList = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export type TMDBCredits = {
  cast: TMDBPerson[];
  crew: TMDBPerson[];
};

export type TMDBMovieDetails = TMDBMovie & {
  credits: TMDBCredits;
  videos: {
    results: TMDBVideo[];
  };
  recommendations: TMDBMovieList;
};
