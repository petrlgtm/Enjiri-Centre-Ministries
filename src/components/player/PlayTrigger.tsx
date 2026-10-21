"use client";

import { usePlayer, type PlayerItem } from "./PlayerProvider";

interface PlayTriggerProps {
  item: PlayerItem;
  queue?: PlayerItem[];
  className?: string;
  children: React.ReactNode;
}

/** Wraps any content in a button that opens the video in the site-wide theatre player. */
export default function PlayTrigger({ item, queue, className, children }: PlayTriggerProps) {
  const { play } = usePlayer();
  return (
    <button type="button" onClick={() => play(item, queue)} className={className} aria-label={`Play: ${item.title}`}>
      {children}
    </button>
  );
}
