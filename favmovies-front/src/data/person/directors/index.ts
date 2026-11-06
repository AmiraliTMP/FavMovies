import { movies as baseMovies } from "./base";
import { movieTitles as enTitles } from "./en";
import { movieTitles as faTitles } from "./fa";
import { movieTitles as frTitles } from "./fr";

const titlesByLocale = {
  en: enTitles,
  fr: frTitles,
  fa: faTitles,
} as const;

export type SupportedLocale = keyof typeof titlesByLocale;

export function getMovieTitle(locale: string, slug: string): string {
  const titles = titlesByLocale[locale as SupportedLocale] ?? frTitles;

  const localizedTitle = (titles as Record<string, string>)[slug];

  if (localizedTitle) {
    return localizedTitle;
  }

  return baseMovies.find((movie) => movie.slug === slug)?.title ?? slug;
}

export function getMovies(locale: string) {
  return baseMovies.map((movie) => ({
    ...movie,
    title: getMovieTitle(locale, movie.slug),
  }));
}

export function getMovieBySlug(locale: string, slug: string) {
  return getMovies(locale).find((movie) => movie.slug === slug);
}

export { baseMovies };
