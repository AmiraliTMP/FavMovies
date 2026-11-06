"use client";

import { Clapperboard, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link, { usePathname } from "next/navigation";

const languages = [
  { locale: "en", label: "EN", name: "English" },
  { locale: "fr", label: "FR", name: "Français" },
  { locale: "fa", label: "فا", name: "فارسی" },
] as const;

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const isPersian = locale === "fa";

  return (
    <div
      dir={isPersian ? "rtl" : "ltr"}
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#101010] text-[#f5f5f5]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_32%,#76551b_0%,#352714_20%,#151310_47%,#101010_74%)]" />
        <div className="absolute right-[-8%] top-[8%] hidden h-[78vh] w-[45vw] rotate-[4deg] border border-[#6c531d]/70 bg-[radial-gradient(ellipse_at_50%_35%,#9b741d55,transparent_34%),linear-gradient(145deg,#302719,#111_65%)] shadow-[0_25px_90px_#000] md:block">
          <span className="absolute right-[12%] top-[5%] select-none text-[min(45vw,580px)] font-black leading-none text-[#f5c518]/10">
            F
          </span>
          <span className="absolute bottom-[8%] left-[8%] whitespace-pre-line text-3xl font-black tracking-widest text-white/40 lg:text-4xl">
            THE STORIES{"\n"}THAT STAY WITH YOU
          </span>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#101010_0%,#101010ed_32%,#101010b8_64%,#10101066),linear-gradient(0deg,#101010_0%,transparent_45%)]" />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-xl font-black tracking-tight text-white sm:text-2xl"
        >
          <span className="rounded-xl bg-[#F5C518] p-2 text-[#101010] transition-transform group-hover:-rotate-3">
            <Clapperboard size={23} strokeWidth={2.5} />
          </span>
          <span>
            Fav<span className="text-[#F5C518]">Movies</span>
          </span>
        </Link>

        <div className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 md:block">
          {t("brandLine")}
        </div>

        <nav
          aria-label={t("languageLabel")}
          className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 p-1"
        >
          <Languages
            size={15}
            className="mx-1 text-white/50"
            aria-hidden="true"
          />
          {languages.map((language) => (
            <Link
              key={language.locale}
              href={pathname}
              locale={language.locale}
              aria-label={language.name}
              aria-current={locale === language.locale ? "page" : undefined}
              className={`rounded-md px-2 py-1.5 text-xs font-bold transition ${
                locale === language.locale
                  ? "bg-[#F5C518] text-[#101010]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {language.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 items-center px-5 pb-12 pt-5 sm:px-8 sm:pb-16 lg:px-20">
        <div className="mx-auto w-full max-w-110 lg:mx-0">{children}</div>
      </main>

      <footer className="relative z-10 flex flex-col gap-2 px-5 pb-5 text-[10px] tracking-[0.12em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-20">
        <span>© {new Date().getFullYear()} FAVMOVIES</span>
        <span>{t("footerLine")}</span>
      </footer>
    </div>
  );
}
