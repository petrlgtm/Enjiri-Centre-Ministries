"use client";

import { useState } from "react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

export default function VideoPlayer({ videoId, title, thumbnail }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"video" | "audio">("video");

  if (!playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-dark">
        <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => { setMode("video"); setPlaying(true); }}
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-dark/50 text-white backdrop-blur-md transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_40px_rgba(255,199,44,0.2)]"
          >
            <svg className="ml-1.5 h-9 w-9" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => { setMode("video"); setPlaying(true); }}
              className="rounded-full bg-gold px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-maroon-dark transition-all hover:shadow-[0_0_20px_rgba(255,199,44,0.3)]"
            >
              Watch Video
            </button>
            <button
              onClick={() => { setMode("audio"); setPlaying(true); }}
              className="rounded-full border border-white/20 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70 transition-all hover:border-gold/40 hover:text-white"
            >
              Listen Audio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-dark">
      {mode === "video" ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="h-32 w-32 overflow-hidden rounded-full">
            <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
          </div>
          <p className="text-center font-heading text-lg font-bold text-white">{title}</p>
          <p className="text-xs text-white/40">Audio streaming via YouTube</p>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media"
            className="h-20 w-full max-w-md rounded-xl opacity-80"
          />
        </div>
      )}
      <button
        onClick={() => setPlaying(false)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-dark/70 text-white/60 backdrop-blur-md transition-all hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
