import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
import MovieCard from "@/components/movie/MovieCard";
import ActorCard from "@/components/person/ActorCard";
import DirectorCard from "@/components/person/DirectorCard";
import SectionHeader from "@/components/shared/SectionHeader";

import { actors } from "@/data/actors";
import { directors } from "@/data/directors";
import { getMovies } from "@/data/movies";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Set the locale for this request.
  setRequestLocale(locale);

  // Load translations for the current locale.
  const t = await getTranslations({
    locale,
    namespace: "Home",
  });

  // getMovies is a function, so call it with the current locale.
  const movies = getMovies(locale);

  // Select the featured movie.
  const featuredMovie =
    movies.find((movie) => movie.featured) ?? movies[0] ?? null;

  // Exclude the featured movie from trending movies.
  const trendingMovies = featuredMovie
    ? movies.filter((movie) => movie.id !== featuredMovie.id).slice(0, 4)
    : movies.slice(0, 4);

  // Sort movies by rating without mutating the original array.
  const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <AppHeader />

      <main className="container-main">
        {featuredMovie ? (
          <section className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-indigo-950/60 via-[#181818] to-[#101010] p-6 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F5C518]/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 px-3 py-1.5 text-xs font-semibold text-[#F5C518]">
                  <Sparkles size={14} />
                  {t("eyebrow")}
                </span>

                <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {t("title")}
                  <br />
                  <span className="text-[#F5C518]">{t("titleAccent")}</span>
                </h1>

                <p className="mt-5 max-w-lg leading-7 text-neutral-400">
                  {t("description")}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/movies/${featuredMovie.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#F5C518] px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
                  >
                    <Play size={17} fill="currentColor" />
                    {t("exploreFeatured")}
                  </Link>

                  <Link
                    href="/movies"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    {t("browseMovies")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <Link
                href={`/movies/${featuredMovie.slug}`}
                className={`group relative mx-auto flex aspect-4/5 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br ${featuredMovie.posterStyle} p-6 ring-1 ring-white/15 transition hover:ring-[#F5C518]/60`}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-white/5" />

                <span className="relative text-center text-3xl font-black uppercase tracking-[0.18em] text-white/90 drop-shadow-xl transition group-hover:scale-105">
                  {featuredMovie.posterLabel}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#F5C518]">
                    {t("featuredMovie")}
                  </span>

                  <h2 className="mt-2 text-xl font-bold">
                    {featuredMovie.title}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-300">
                    {featuredMovie.year} · {featuredMovie.genres.join(" / ")}
                  </p>
                </div>
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#181818] p-10 text-center">
            <h1 className="text-2xl font-bold">{t("noFeatured")}</h1>
            <p className="mt-2 text-neutral-400">{t("addMovies")}</p>
          </section>
        )}

        {/* Trending Movies */}
        <section className="mt-12">
          <SectionHeader
            title={t("trending")}
            description={t("trendingDescription")}
            href="/movies"
          />

          {trendingMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 bg-[#181818] p-6 text-sm text-neutral-400">
              {t("moreSoon")}
            </p>
          )}
        </section>

        {/* Popular Actors */}
        <section className="mt-14">
          <SectionHeader
            title={t("popularActors")}
            description={t("popularActorsDescription")}
          />

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {actors.map((actor) => (
              <ActorCard
                key={actor.id}
                name={actor.name}
                knownFor={actor.knownFor}
              />
            ))}
          </div>
        </section>

        {/* Popular Directors */}
        <section className="mt-14">
          <SectionHeader
            title={t("popularDirectors")}
            description={t("popularDirectorsDescription")}
          />

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {directors.map((director) => (
              <DirectorCard
                key={director.id}
                name={director.name}
                knownFor={director.knownFor}
              />
            ))}
          </div>
        </section>

        {/* Top Rated Movies */}
        <section className="mt-14">
          <SectionHeader
            title={t("topRated")}
            description={t("topRatedDescription")}
            href="/top-rated"
          />

          <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
            <TrendingUp size={16} className="text-[#F5C518]" />
            {t("rankedByRating")}
          </div>

          {topRatedMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 bg-[#181818] p-6 text-sm text-neutral-400">
              {t("noRatedMovies")}
            </p>
          )}
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
