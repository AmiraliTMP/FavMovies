"use client";

import { Clapperboard, Search, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

export default function AppHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();

  const navigation = [
    { label: t("home"), href: "/" },
    { label: t("movies"), href: "/movies" },
    { label: t("topRated"), href: "/top-rated" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101010]/95 backdrop-blur-xl">
      <div className="container-main flex min-h-16 items-center gap-4 py-3">
        <Link
          href="/"
          aria-label="FavMovies"
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5C518] text-black">
            <Clapperboard size={21} />
          </span>

          <span className="text-lg font-black tracking-tight text-white">
            Fav<span className="text-[#F5C518]">Movies</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          action={`/${locale}/search`}
          role="search"
          className="ml-auto flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition focus-within:border-[#F5C518]/60"
        >
          <Search
            size={17}
            aria-hidden="true"
            className="shrink-0 text-neutral-500"
          />

          <input
            type="search"
            name="q"
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />

          <button
            type="submit"
            aria-label={t("search")}
            className="hidden rounded-md bg-[#F5C518] px-3 py-1 text-xs font-bold text-black transition hover:bg-yellow-300 sm:block"
          >
            {t("search")}
          </button>
        </form>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <LanguageSwitcher />

          <Link
            href="/sign-in"
            className="text-sm font-medium text-neutral-300 transition hover:text-white"
          >
            {t("signIn")}
          </Link>

          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-lg bg-[#F5C518] px-3 py-2 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            <UserRound size={16} />
            {t("signUp")}
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <LanguageSwitcher />

          <Link
            href="/sign-in"
            aria-label={t("signIn")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <UserRound size={18} />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-5 overflow-x-auto border-t border-white/5 px-4 py-3 lg:hidden"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 text-sm text-neutral-400 transition hover:text-[#F5C518]"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/sign-up"
          className="shrink-0 text-sm font-medium text-[#F5C518] sm:hidden"
        >
          {t("signUp")}
        </Link>
      </nav>
    </header>
  );
}
