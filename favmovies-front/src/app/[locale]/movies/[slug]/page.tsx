import MovieActions from "@/components/movie/MovieActions";
import { movieDetails } from "@/data/movieDetails";
import { getMovieBySlug, getMovies } from "@/data/movies";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  Clapperboard,
  Clock3,
  Film,
  Info,
  Music,
  Newspaper,
  Play,
  Star,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type CastMember = {
  name: string;
  character: string;
};

type MovieDetail = {
  tagline: string;
  director: string[];
  writers: string[];
  composers: string[];
  productionCompanies: string[];
  cast: CastMember[];
  soundtrack: string[];
  awards: string[];
  news: string[];
  reviews: string[];
};

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 py-8 sm:py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-[#F5C518]">{icon}</span>
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/2 p-5 text-sm text-neutral-500">
      {message}
    </div>
  );
}

function PersonList({
  people,
  emptyMessage,
}: {
  people: string[];
  emptyMessage: string;
}) {
  if (!people.length) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => (
        <span
          key={person}
          className="rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-neutral-200"
        >
          {person}
        </span>
      ))}
    </div>
  );
}

function getMovieDetails(slug: string): MovieDetail | undefined {
  return (movieDetails as Record<string, MovieDetail | undefined>)[slug];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const movie = getMovieBySlug(locale, slug);

  if (!movie) {
    return {
      title: "Movie Not Found | FavMovies",
    };
  }

  const t = await getTranslations({
    locale,
    namespace: "MovieMetadata",
  });

  const description = t("description", {
    title: movie.title,
    year: movie.year,
  });

  return {
    title: movie.title,
    description,
    openGraph: {
      title: `${movie.title} | FavMovies`,
      description,
      type: "video.movie",
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "MovieDetails",
  });

  const movie = getMovieBySlug(locale, slug);

  if (!movie) {
    notFound();
  }

  const details = getMovieDetails(movie.slug);

  if (!details) {
    notFound();
  }

  // The existing movie data localizes titles only.
  // Other descriptive fields remain in their source language.
  const localizedMovie = {
    title: movie.title,
    tagline: details.tagline,
    genres: movie.genres,
    description: movie.description,
    characters: details.cast.map((person) => person.character),
  };

  const movies = getMovies(locale);

  const relatedMovies = movies
    .filter(
      (item) =>
        item.slug !== movie.slug &&
        item.genres.some((genre) => movie.genres.includes(genre)),
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      {/* Cinematic backdrop */}
      <div className="relative isolate overflow-hidden">
        <div
          className={`absolute inset-0 -z-20 bg-linear-to-br ${movie.posterStyle}`}
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#101010] via-[#101010]/90 to-[#101010]/50" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#101010] via-transparent to-black/20" />

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 lg:px-8">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-[#F5C518]"
          >
            <ArrowLeft size={16} />
            {t("backToMovies")}
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr] md:items-end lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Poster */}
            <div
              className={`relative flex aspect-2/3 w-full max-w-57.5 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br ${movie.posterStyle} shadow-2xl shadow-black/50 ring-1 ring-white/15 md:max-w-none`}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-white/5" />
              <span className="relative px-5 text-center text-3xl font-black uppercase tracking-widest text-white drop-shadow-xl">
                {localizedMovie.title}
              </span>
              <span className="absolute bottom-4 left-4 right-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                FavMovies
              </span>
            </div>

            {/* Main movie information */}
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F5C518]">
                <Film size={15} />
                {t("movieProfile")}
                {movie.featured && (
                  <span className="rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 px-2 py-1">
                    {t("featured")}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {localizedMovie.title}
                <span className="ml-3 text-2xl font-medium text-neutral-400 sm:text-3xl">
                  ({movie.year})
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                {localizedMovie.tagline}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-neutral-300">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-neutral-500" />
                  {movie.year}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} className="text-neutral-500" />
                  {movie.duration}
                </span>
                <span className="rounded border border-white/20 px-2 py-1 text-xs">
                  {t("featureFilm")}
                </span>
              </div>

              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">
                {localizedMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/15 bg-white/6 px-3 py-1.5 text-sm text-neutral-200 transition hover:border-[#F5C518]/50"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {t("rating")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star size={26} fill="#F5C518" className="text-[#F5C518]" />
                    <span className="text-3xl font-black tabular-nums">
                      {movie.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-neutral-500">/ 10</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10">
                    <Clapperboard size={20} className="text-[#F5C518]" />
                  </div>
                  <div>
                    <p className="font-semibold">{t("movieDetails")}</p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {t("castCrewMore")}
                    </p>
                  </div>
                </div>
              </div>

              <MovieActions />
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            {/* Synopsis */}
            <Section title={t("synopsis")} icon={<Info size={22} />}>
              <p className="max-w-3xl text-base leading-8 text-neutral-300">
                {localizedMovie.description}
              </p>
            </Section>

            {/* Cast */}
            <Section title={t("cast")} icon={<Users size={22} />}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {details.cast.map((person) => (
                  <div
                    key={`${person.name}-${person.character}`}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#181818] p-4 transition hover:border-white/20"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-neutral-700 to-neutral-900 text-sm font-bold text-[#F5C518] ring-1 ring-white/10">
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{person.name}</p>
                      <p className="mt-1 truncate text-sm text-neutral-400">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Directors */}
            <Section title={t("directors")} icon={<Clapperboard size={22} />}>
              <PersonList
                people={details.director}
                emptyMessage={t("noDirectorCredits")}
              />
            </Section>

            {/* Writers */}
            <Section title={t("writers")} icon={<Film size={22} />}>
              <PersonList
                people={details.writers}
                emptyMessage={t("noWriterCredits")}
              />
            </Section>

            {/* Soundtrack */}
            <Section title={t("soundtrack")} icon={<Music size={22} />}>
              <h3 className="mb-3 text-sm font-semibold text-neutral-400">
                {t("originalComposer")}
              </h3>
              <PersonList
                people={details.composers}
                emptyMessage={t("noComposerCredits")}
              />

              <h3 className="mb-3 mt-6 text-sm font-semibold text-neutral-400">
                {t("featuredTracks")}
              </h3>
              <div className="space-y-2">
                {details.soundtrack.map((track, index) => (
                  <div
                    key={track}
                    className="flex items-center gap-3 rounded-lg bg-white/3 p-3"
                  >
                    <span className="w-5 text-sm text-neutral-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Music size={16} className="text-[#F5C518]" />
                    <span className="text-sm text-neutral-200">{track}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Production companies */}
            <Section title={t("productionCompanies")} icon={<Film size={22} />}>
              <PersonList
                people={details.productionCompanies}
                emptyMessage={t("noProductionCredits")}
              />
            </Section>

            {/* Trailer */}
            <Section title={t("trailer")} icon={<Play size={22} />}>
              <div id="movie-trailer" className="scroll-mt-8">
                <EmptyState message={t("noTrailer")} />
              </div>
            </Section>

            {/* Gallery */}
            <Section title={t("gallery")} icon={<Film size={22} />}>
              <EmptyState message={t("noGallery")} />
            </Section>

            {/* News */}
            <Section title={t("news")} icon={<Newspaper size={22} />}>
              {details.news.length ? (
                <PersonList people={details.news} emptyMessage={t("noNews")} />
              ) : (
                <EmptyState message={t("noNews")} />
              )}
            </Section>

            {/* Reviews */}
            <Section title={t("reviews")} icon={<Star size={22} />}>
              {details.reviews.length ? (
                <PersonList
                  people={details.reviews}
                  emptyMessage={t("noReviews")}
                />
              ) : (
                <EmptyState message={t("noReviews")} />
              )}
            </Section>

            {/* Awards */}
            <Section title={t("awards")} icon={<Award size={22} />}>
              {details.awards.length ? (
                <PersonList
                  people={details.awards}
                  emptyMessage={t("noAwards")}
                />
              ) : (
                <EmptyState message={t("noAwards")} />
              )}
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 py-8 lg:py-10">
            <div className="rounded-xl border border-white/10 bg-[#181818] p-5">
              <h2 className="text-lg font-bold">{t("movieFacts")}</h2>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-500">{t("releaseYear")}</dt>
                  <dd className="mt-1 font-medium">{movie.year}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{t("runtime")}</dt>
                  <dd className="mt-1 font-medium">{movie.duration}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{t("genres")}</dt>
                  <dd className="mt-1 leading-6">
                    {localizedMovie.genres.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{t("director")}</dt>
                  <dd className="mt-1 leading-6">
                    {details.director.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{t("composer")}</dt>
                  <dd className="mt-1 leading-6">
                    {details.composers.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">{t("production")}</dt>
                  <dd className="mt-1 leading-6">
                    {details.productionCompanies.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Related movies */}
            <div className="rounded-xl border border-white/10 bg-[#181818] p-5">
              <h2 className="text-lg font-bold">{t("exploreMore")}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                {t("relatedDescription")}
              </p>

              <div className="mt-4 space-y-3">
                {relatedMovies.length ? (
                  relatedMovies.map((related) => (
                    <Link
                      key={related.id}
                      href={`/movies/${related.slug}`}
                      className="group flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
                    >
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-md bg-linear-to-br ${related.posterStyle}`}
                      >
                        <Film size={18} className="text-white/70" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold group-hover:text-[#F5C518]">
                          {related.title}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {related.year}
                        </p>
                      </div>

                      <ArrowRight
                        size={15}
                        className="shrink-0 text-neutral-500"
                      />
                    </Link>
                  ))
                ) : (
                  <EmptyState message={t("noRelatedMovies")} />
                )}
              </div>

              <Link
                href="/movies"
                className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-[#F5C518]/40 hover:text-[#F5C518]"
              >
                {t("browseMovies")}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Data disclaimer */}
            <p className="flex items-start gap-2 text-xs leading-5 text-neutral-500">
              <Check size={15} className="mt-0.5 shrink-0" />
              {t("dataDisclaimer")}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
