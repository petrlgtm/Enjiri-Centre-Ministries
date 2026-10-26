"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export interface AlbumPhoto {
  thumb: string;
  full: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

interface AlbumGridProps {
  photos: AlbumPhoto[];
}

/** Masonry photo grid with a full-screen lightbox (arrow keys / Esc). */
export default function AlbumGrid({ photos }: AlbumGridProps) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {photos.map((photo, i) => (
          <li key={photo.thumb} className="mb-3 break-inside-avoid sm:mb-4">
            <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Open photo ${i + 1}`}>
              <span className="block overflow-hidden bg-navy">
                <Image
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              {photo.caption && <span className="mt-2 block text-xs text-cream-muted sm:text-sm">{photo.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[70] flex flex-col bg-ink-deep/[0.97]">
          <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
            <span className="font-mono text-xs tracking-[0.18em] text-white/60">
              {String(open + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center ring-1 ring-white/25 hover:bg-white/10">
              <HiX size={20} />
            </button>
          </div>

          <div className="relative flex-1">
            <Image src={current.full} alt={current.alt} fill sizes="100vw" className="object-contain" />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-gold hover:text-navy sm:left-6"
                >
                  <HiChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-gold hover:text-navy sm:right-6"
                >
                  <HiChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <p className="min-h-14 px-4 py-4 text-center text-sm text-white/75 sm:px-8">{current.caption || current.alt}</p>
        </div>
      )}
    </>
  );
}
