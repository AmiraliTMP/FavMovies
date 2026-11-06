import { Clock3, Star } from "lucide-react";
import Link from "next/link";

type Movie = {
  slug: string;
  posterStyle: string;
  posterLabel: string;
  genres: string[];
  title: string;
  rating: number;
  year: number;
  duration: string;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group min-w-0">
      <Link href={`/movies/${movie.slug}`} className="block">
        <div
          className={`relative flex aspect-2/3 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br ${movie.posterStyle} p-5 ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#F5C518]/50`}
        >
          <span className="text-center text-xl font-black uppercase tracking-[0.16em] text-white/80 drop-shadow-lg sm:text-2xl">
            {movie.posterLabel}
          </span>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-3 pt-12">
            <span className="text-xs font-medium text-neutral-300">
              {movie.genres.join(" · ")}
            </span>
          </div>
        </div>
      </Link>

      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/movies/${movie.slug}`}
            className="font-semibold text-white transition hover:text-[#F5C518]"
          >
            {movie.title}
          </Link>

          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#F5C518]">
            <Star size={14} fill="currentColor" />
            {movie.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <span>{movie.year}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {movie.duration}
          </span>
        </div>
      </div>
    </article>
  );
}
