import "server-only";

import type {
  AppLocale,
  TMDBMovie,
  TMDBMovieDetails,
  TMDBPerson,
} from "@/types/movie";

import {
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
} from "@/lib/tmdb";

export async function getTrendingMoviesService(
  locale: AppLocale,
): Promise<TMDBMovie[]> {
  const data = await getTrendingMovies(locale);
  return data.results;
}

export async function getPopularMoviesService(
  locale: AppLocale,
  page = 1,
): Promise<TMDBMovie[]> {
  const data = await getPopularMovies(locale, page);
  return data.results;
}

export async function getTopRatedMoviesService(
  locale: AppLocale,
  page = 1,
): Promise<TMDBMovie[]> {
  const data = await getTopRatedMovies(locale, page);
  return data.results;
}

export async function searchMoviesService(
  locale: AppLocale,
  query: string,
  page = 1,
) {
  if (!query.trim()) {
    return {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0,
    };
  }

  return searchMovies(locale, query, page);
}

export async function getMovieDetailsService(
  locale: AppLocale,
  movieId: number,
): Promise<TMDBMovieDetails> {
  return getMovieDetails(locale, movieId);
}

export async function getMovieCastService(
  locale: AppLocale,
  movieId: number,
): Promise<TMDBPerson[]> {
  const movie = await getMovieDetails(locale, movieId);
  return movie.credits.cast;
}

export async function getMovieDirectorsService(
  locale: AppLocale,
  movieId: number,
): Promise<TMDBPerson[]> {
  const movie = await getMovieDetails(locale, movieId);

  return movie.credits.crew.filter((person) => person.job === "Director");
}

export async function getMovieRecommendationsService(
  locale: AppLocale,
  movieId: number,
): Promise<TMDBMovie[]> {
  const movie = await getMovieDetails(locale, movieId);
  return movie.recommendations.results;
}
