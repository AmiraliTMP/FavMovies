"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Replace with your error-reporting service when one is configured.
    console.error("FavMovies page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-[#101010] text-white">
      <AppHeader />

      <main className="container-main flex flex-1 items-center justify-center py-16">
        <section className="w-full max-w-2xl text-center">
          {/* Error illustration */}
          <div className="relative mx-auto flex h-56 max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-red-950/30 via-[#181818] to-[#101010] sm:h-64">
            <div className="absolute h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-[#F5C518]/30 bg-[#F5C518]/10 text-[#F5C518] sm:h-28 sm:w-28">
              <AlertTriangle size={56} strokeWidth={1.4} />
            </div>

            <span className="absolute bottom-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Unexpected interruption
            </span>
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#F5C518]">
            Something went wrong
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            The show must go on.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
            An unexpected error interrupted this page. You can try again or
            return to FavMovies and continue exploring.
          </p>

          {error.digest && (
            <p className="mt-4 text-xs text-neutral-600">
              Reference: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F5C518] px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
