"use client";

import { Link } from "@/i18n/navigation";
import { Clapperboard, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function AppFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    {
      heading: t("explore"),
      links: [
        { label: nav("home"), href: "/" },
        { label: nav("movies"), href: "/movies" },
        { label: nav("topRated"), href: "/top-rated" },
      ],
    },
    {
      heading: t("account"),
      links: [
        { label: nav("signIn"), href: "/login" },
        { label: nav("signUp"), href: "/register" },
        { label: nav("favorites"), href: "/favorites" },
      ],
    },
    {
      heading: t("information"),
      links: [
        { label: t("about"), href: "/about" },
        { label: t("privacy"), href: "/privacy" },
        { label: t("contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#101010]">
      <div className="container-main py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="FavMovies"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5C518] text-black">
                <Clapperboard size={20} />
              </span>

              <span className="text-lg font-black text-white">
                Fav<span className="text-[#F5C518]">Movies</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-400">
              {t("description")}
            </p>

            <Link
              href="/movies"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] transition hover:text-yellow-300"
            >
              {t("exploreMovies")}
              <Clapperboard size={15} />
            </Link>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-4 text-sm font-bold text-white">
                {group.heading}
              </h2>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition hover:text-[#F5C518]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {year ?? 2026} FavMovies. {t("allRights")}
          </p>

          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
            {t("madeForMovieLovers")}
            <Heart size={13} className="text-[#F5C518]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
