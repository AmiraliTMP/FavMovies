"use client";

import { Bookmark, Heart, Play } from "lucide-react";
import { useState } from "react";

export default function MovieActions() {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function scrollToTrailer() {
    document
      .getElementById("movie-trailer")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={scrollToTrailer}
        className="inline-flex items-center gap-2 rounded-lg bg-[#F5C518] px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
      >
        <Play size={17} fill="currentColor" />
        Watch trailer
      </button>

      <button
        type="button"
        onClick={() => setInWatchlist((current) => !current)}
        aria-pressed={inWatchlist}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
      >
        <Bookmark size={17} className={inWatchlist ? "text-[#F5C518]" : ""} />
        {inWatchlist ? "In watchlist" : "Add to watchlist"}
      </button>

      <button
        type="button"
        onClick={() => setIsFavorite((current) => !current)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        className={`flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-3 transition hover:border-pink-400/50 hover:text-pink-400 ${
          isFavorite ? "text-pink-400" : ""
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
