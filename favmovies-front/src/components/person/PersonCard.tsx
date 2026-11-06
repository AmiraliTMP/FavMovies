import { useTranslations } from "next-intl";

type PersonCardProps = {
  name: string;
  role: "actor" | "director";
  knownForMovieSlug: string;
  image?: string;
};

export default function PersonCard({
  name,
  role,
  knownForMovieSlug,
  image,
}: PersonCardProps) {
  const t = useTranslations("PersonCard");
  const tMovies = useTranslations("MovieTitles");

  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2) ?? "?";

  const movieTitle = (() => {
    if (!knownForMovieSlug) return "—";

    try {
      return tMovies.has(knownForMovieSlug)
        ? tMovies(knownForMovieSlug)
        : knownForMovieSlug;
    } catch {
      return knownForMovieSlug;
    }
  })();

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition duration-300 hover:-translate-y-1 hover:border-[#F5C518]/50">
      <div className="aspect-[3/4] overflow-hidden bg-[#242424]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-black text-[#F5C518]">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#F5C518]">
          {t(role)}
        </p>

        <h3 className="mt-2 truncate text-lg font-bold text-white">{name}</h3>

        <p className="mt-2 text-sm text-neutral-400">{t("knownFor")}</p>

        <p className="mt-1 truncate text-sm text-neutral-200">{movieTitle}</p>
      </div>
    </article>
  );
}
