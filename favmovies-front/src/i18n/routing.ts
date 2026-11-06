import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "fa"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
});
