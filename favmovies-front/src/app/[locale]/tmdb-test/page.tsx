import { notFound } from "next/navigation";

import { getTrendingMoviesService } from "@/services/movie.service";
import type { AppLocale } from "@/types/movie";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TMDBTestPage({ params }: Props) {
  const { locale } = await params;

  if (!["en", "fr", "fa"].includes(locale)) {
    notFound();
  }

  const movies = await getTrendingMoviesService(locale as AppLocale);

  return (
    <main className="min-h-screen bg-[#101010] p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold text-[#F5C518]">
        TMDB Connection Test
      </h1>

      <p className="mb-4">Movies received: {movies.length}</p>

      <ul className="space-y-3">
        {movies.slice(0, 10).map((movie) => (
          <li key={movie.id} className="rounded-lg border border-white/10 p-4">
            <h2 className="font-semibold">{movie.title}</h2>
            <p className="text-sm text-white/60">
              Release date: {movie.release_date || "Unknown"}
            </p>
            <p className="text-sm text-white/60">
              Rating: {movie.vote_average.toFixed(1)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
