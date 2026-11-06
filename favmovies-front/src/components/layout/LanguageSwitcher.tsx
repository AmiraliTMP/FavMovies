"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import type { ChangeEvent } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;

    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{t("label")}</span>

      <select
        value={locale}
        onChange={handleChange}
        aria-label={t("label")}
        className="max-w-28 rounded-lg border border-white/10 bg-[#181818] px-2 py-2 text-sm text-white outline-none transition focus:border-[#F5C518]/60"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {t(item)}
          </option>
        ))}
      </select>
    </label>
  );
}
