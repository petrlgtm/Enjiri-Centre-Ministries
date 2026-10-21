"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiX, HiArrowsExpand, HiCalendar, HiUser } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { usePlayer } from "./PlayerProvider";

/**
 * Theatre-style player: opens large over a dark backdrop with an "Up next" rail.
 * Clicking outside or changing page shrinks it to a corner pop-up that keeps playing;
 * Escape closes it.
 */
export default function VideoTheater() {
  const { current, queue, theaterPath, play, expand, minimize, stop } = usePlayer();
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  // Navigating away (or clicking outside) keeps playback going in the corner
  const popup = theaterPath !== pathname;

  useEffect(() => {
    if (!current || popup) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
    };
    const onPointer = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) minimize();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [current, popup, stop, minimize]);

  if (!current) return null;

  const index = queue.findIndex((q) => q.id === current.id);
  const upNext = (index >= 0 ? [...queue.slice(index + 1), ...queue.slice(0, index)] : queue.filter((q) => q.id !== current.id)).slice(0, 8);
  const src = `https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      role="presentation"
      className={cn(
        "fixed z-[60]",
        popup
          ? "right-3 bottom-24 w-[min(22rem,calc(100vw-1.5rem))] sm:right-6"
          : "inset-0 overflow-y-auto overscroll-contain bg-royal-deep/[0.97] pt-20 backdrop-blur-sm lg:pt-24"
      )}
    >
      <section
        ref={panelRef}
        tabIndex={-1}
        aria-label={`Now playing: ${current.title}`}
        className={cn("outline-none", popup && "overflow-hidden bg-royal-deep shadow-[0_20px_50px_rgba(0,0,0,0.55)] ring-1 ring-gold/40")}
      >
        <div
          className={cn(
            !popup && "mx-auto grid max-w-[92rem] gap-8 px-0 pb-14 sm:px-6 lg:px-10",
            !popup && upNext.length > 0 && "lg:grid-cols-[minmax(0,1fr)_22rem]"
          )}
        >
          <div className="min-w-0">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {current.thumbnail && <Image src={current.thumbnail} alt="" fill sizes="80vw" className="object-cover opacity-40" />}
              <iframe
                key={current.id}
                src={src}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              {popup && (
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={expand}
                    aria-label="Expand video player"
                    className="grid h-9 w-9 place-items-center bg-royal/90 text-gold ring-1 ring-white/30 transition-colors hover:bg-navy-surface"
                  >
                    <HiArrowsExpand size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={stop}
                    aria-label="Close video and stop playback"
                    className="grid h-9 w-9 place-items-center bg-royal/90 text-white ring-1 ring-white/30 transition-colors hover:bg-red-dark"
                  >
                    <HiX size={16} />
                  </button>
                </div>
              )}
            </div>

            {popup ? (
              <p className="truncate px-3 py-2.5 text-xs font-semibold text-white">{current.title}</p>
            ) : (
              <div className="px-4 sm:px-0">
                <div className="mt-6 flex items-start justify-between gap-6">
                  <h2 className="font-display text-2xl leading-tight font-semibold text-balance text-white sm:text-3xl">{current.title}</h2>
                  <button
                    type="button"
                    onClick={stop}
                    aria-label="Close video"
                    className="grid h-10 w-10 shrink-0 place-items-center text-white/70 ring-1 ring-white/20 transition-colors hover:text-white hover:ring-white/60"
                  >
                    <HiX size={18} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-5 font-mono text-xs text-white/55">
                  {current.subtitle && (
                    <span className="inline-flex items-center gap-2">
                      <HiUser className="text-gold" /> {current.subtitle}
                    </span>
                  )}
                  {current.date && (
                    <span className="inline-flex items-center gap-2">
                      <HiCalendar className="text-gold" /> {current.date}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {!popup && upNext.length > 0 && (
            <aside aria-label="Up next" className="px-4 sm:px-0">
              <p className="pb-3 font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase">Up next</p>
              <ul className="grid gap-x-5 sm:grid-cols-2 lg:grid-cols-1">
                {upNext.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => play(item)}
                      className="group grid w-full grid-cols-[8rem_minmax(0,1fr)] items-center gap-3 py-3 text-left"
                    >
                      <span className="relative block aspect-video overflow-hidden bg-royal">
                        {item.thumbnail && (
                          <Image
                            src={item.thumbnail}
                            alt=""
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-3 text-[13px] leading-snug font-semibold text-white transition-colors group-hover:text-gold-light">
                          {item.title}
                        </span>
                        {item.date && <span className="mt-1.5 block font-mono text-[11px] text-white/45">{item.date}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}
