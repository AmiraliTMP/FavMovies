import { getMovies } from "@/data/movies";
import { Link } from "@/i18n/navigation";
import { Film, Search, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function MoviesPage({ params }: Props) {
  const { locale } = await params;
  const movies = getMovies(locale);
  const t = await getTranslations({
    locale,
    namespace: "Movies",
  });

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#F5C518]">
            <Film size={16} />
            {t("eyebrow")}
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            {t("title")}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
            {t("description")}
          </p>
        </div>

        {/* Collection information */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">
            {t("movieCount", { count: movies.length })}
          </p>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#181818] px-3 py-2 text-sm text-neutral-400">
            <Search size={16} />
            <span>{t("browseCollection")}</span>
          </div>
        </div>

        {/* Movie collection */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => {
              return (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.slug}`}
                  className="group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition duration-300 hover:-translate-y-1 hover:border-[#F5C518]/50"
                >
                  {/* Movie poster */}
                  <div
                    className={`relative flex aspect-2/3 items-center justify-center overflow-hidden bg-linear-to-br ${movie.posterStyle}`}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-white/5" />

                    <span className="relative px-4 text-center text-xl font-black uppercase tracking-wider text-white drop-shadow-lg sm:text-2xl">
                      {movie.title}
                    </span>

                    <span className="absolute bottom-3 left-3 right-3 text-center text-xs font-semibold uppercase tracking-widest text-white/50">
                      FavMovies
                    </span>
                  </div>

                  {/* Movie information */}
                  <div className="p-4">
                    <h2 className="truncate font-bold transition group-hover:text-[#F5C518]">
                      {movie.title}
                    </h2>

                    <div className="mt-2 flex items-center justify-between gap-2 text-sm text-neutral-400">
                      <span>{movie.year}</span>

                      <span className="flex items-center gap-1 text-[#F5C518]">
                        <Star size={14} fill="currentColor" />
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>

                    <p className="mt-3 truncate text-xs text-neutral-500">
                      {movie.genres.join(" · ")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-10 text-center">
            <Film size={32} className="mx-auto text-neutral-500" />

            <p className="mt-4 font-semibold">{t("emptyState")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
