import "server-only";

import type { AppLocale, TMDBMovieDetails, TMDBMovieList } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TMDB_LANGUAGES: Record<AppLocale, string> = {
  en: "en-US",
  fr: "fr-FR",
  fa: "fa-IR",
};

type TMDBFetchOptions = {
  locale?: AppLocale;
  query?: Record<string, string | number | undefined>;
};

async function tmdbFetch<T>(
  path: string,
  { locale = "fr", query = {} }: TMDBFetchOptions = {},
): Promise<T> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "TMDB_ACCESS_TOKEN is missing. Check your .env.local file.",
    );
  }

  const params = new URLSearchParams({
    language: TMDB_LANGUAGES[locale],
  });

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const response = await fetch(`${TMDB_BASE_URL}${path}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export function getTMDBImage(
  imagePath: string | null | undefined,
  size: "w185" | "w342" | "w500" | "w780" | "original" = "w500",
): string | null {
  if (!imagePath) {
    return null;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${imagePath}`;
}

export function getTrendingMovies(
  locale: AppLocale = "fr",
): Promise<TMDBMovieList> {
  return tmdbFetch<TMDBMovieList>("/trending/movie/week", {
    locale,
  });
}

export function getPopularMovies(
  locale: AppLocale = "fr",
  page = 1,
): Promise<TMDBMovieList> {
  return tmdbFetch<TMDBMovieList>("/movie/popular", {
    locale,
    query: { page },
  });
}

export function getTopRatedMovies(
  locale: AppLocale = "fr",
  page = 1,
): Promise<TMDBMovieList> {
  return tmdbFetch<TMDBMovieList>("/movie/top_rated", {
    locale,
    query: { page },
  });
}

export function searchMovies(
  locale: AppLocale,
  query: string,
  page = 1,
): Promise<TMDBMovieList> {
  return tmdbFetch<TMDBMovieList>("/search/movie", {
    locale,
    query: {
      query: query.trim(),
      page,
      include_adult: false,
    },
  });
}

export function getMovieDetails(
  locale: AppLocale,
  movieId: number,
): Promise<TMDBMovieDetails> {
  return tmdbFetch<TMDBMovieDetails>(`/movie/${movieId}`, {
    locale,
    query: {
      append_to_response: "credits,videos,recommendations",
    },
  });
}
