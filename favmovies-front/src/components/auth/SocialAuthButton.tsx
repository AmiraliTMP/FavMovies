"use client";

import { useTranslations } from "next-intl";

type SocialAuthButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function SocialAuthButton({
  onClick,
  disabled = false,
}: SocialAuthButtonProps) {
  const t = useTranslations("Auth");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-[9px] border border-white/15 bg-white/3 text-sm font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.78-.07-1.53-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v2.95h3.87c2.27-2.09 3.57-5.17 3.57-8.59Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.87-2.95c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.04A12 12 0 0 0 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.33A7.2 7.2 0 0 1 4.9 12c0-.81.14-1.59.37-2.33V6.63H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.37l4-3.04Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.72c1.76 0 3.34.61 4.59 1.82l3.44-3.44C17.95 1.14 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.04c.95-2.84 3.6-4.95 6.73-4.95Z"
        />
      </svg>
      {t("google")}
    </button>
  );
}
