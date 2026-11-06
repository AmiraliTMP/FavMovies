"use client";

import { useTranslations } from "next-intl";

export default function PasswordStrength({ password }: { password: string }) {
  const t = useTranslations("Auth");
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (!password) return null;

  const label =
    score < 2
      ? t("passwordStrength.weak")
      : score < 4
        ? t("passwordStrength.fair")
        : t("passwordStrength.strong");

  return (
    <div className="mt-2" aria-live="polite">
      <div className="h-0.75 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#F5C518] transition-all duration-300"
          style={{ width: `${score * 25}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-white/45">{label}</p>
    </div>
  );
}
