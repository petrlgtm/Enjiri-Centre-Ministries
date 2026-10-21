"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface PlayerItem {
  /** YouTube video id */
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  thumbnail?: string;
}

interface PlayerContextValue {
  current: PlayerItem | null;
  queue: PlayerItem[];
  /** Path the theatre was opened on; on any other page the player shows as a corner pop-up. */
  theaterPath: string | null;
  play: (item: PlayerItem, queue?: PlayerItem[]) => void;
  expand: () => void;
  minimize: () => void;
  stop: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

/** Site-wide video player state, so playback survives page navigation. */
export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<PlayerItem | null>(null);
  const [queue, setQueue] = useState<PlayerItem[]>([]);
  const [theaterPath, setTheaterPath] = useState<string | null>(null);

  const play = useCallback((item: PlayerItem, nextQueue?: PlayerItem[]) => {
    setCurrent(item);
    if (nextQueue) setQueue(nextQueue);
    setTheaterPath(window.location.pathname);
  }, []);

  const expand = useCallback(() => setTheaterPath(window.location.pathname), []);
  const minimize = useCallback(() => setTheaterPath(null), []);
  const stop = useCallback(() => setCurrent(null), []);

  const value = useMemo(
    () => ({ current, queue, theaterPath, play, expand, minimize, stop }),
    [current, queue, theaterPath, play, expand, minimize, stop]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
