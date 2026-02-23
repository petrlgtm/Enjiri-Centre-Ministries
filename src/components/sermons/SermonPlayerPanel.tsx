"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface SermonPlayerPanelProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  speaker: string;
  date: string;
  onClose: () => void;
}

type PlayerMode = "video" | "audio";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function SermonPlayerPanel({
  videoId,
  title,
  thumbnail,
  speaker,
  date,
  onClose,
}: SermonPlayerPanelProps) {
  const [mode, setMode] = useState<PlayerMode>("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playerElementId = `yt-player-${videoId}`;

  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time);
        if (dur > 0) setDuration(dur);
      }
    }, 250);
  }, []);

  const stopTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    function initPlayer() {
      if (!mounted || !document.getElementById(playerElementId)) return;

      playerRef.current = new window.YT!.Player(playerElementId, {
        videoId,
        playerVars: {
          autoplay: 1,
          enablejsapi: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (!mounted) return;
            setPlayerReady(true);
            setIsPlaying(true);
            const dur = playerRef.current?.getDuration() ?? 0;
            if (dur > 0) setDuration(dur);
            startTimeTracking();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (!mounted) return;
            const state = event.data;
            setIsPlaying(state === 1);
            if (state === 1) {
              startTimeTracking();
            } else {
              stopTimeTracking();
            }
            if (state === 0) {
              setCurrentTime(0);
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
    }

    return () => {
      mounted = false;
      stopTimeTracking();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId, playerElementId, startTimeTracking, stopTimeTracking]);

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || !playerReady) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !playerReady || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    playerRef.current.seekTo(fraction * duration, true);
    setCurrentTime(fraction * duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 overflow-hidden rounded-3xl border border-gold/20 bg-[var(--gray-100)] shadow-gold-glow"
        ref={containerRef}
      >
        {/* Control bar — above iframe, high z-index to prevent iframe touch steal */}
        <div className="relative z-20 border-b border-white/[0.06] px-4 py-3 sm:px-5">
          {/* Row 1: Title + Close */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-2 w-2 shrink-0 rounded-full bg-gold animate-pulse" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{title}</p>
                <p className="text-[11px] text-[var(--gray-400)] truncate">
                  {speaker} &middot; {date}
                </p>
              </div>
            </div>

            {/* Close — always visible, large touch target */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[var(--gray-300)] transition-colors active:bg-red-500/30 active:text-red-400 hover:bg-red-500/20 hover:text-red-400"
              aria-label="Close player"
            >
              <HiX size={22} />
            </button>
          </div>

          {/* Row 2: Mode toggle — full width on mobile for easy tapping */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex flex-1 rounded-full bg-[var(--gray-50)] p-1 border border-white/[0.06]">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMode("video"); }}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-xs font-semibold transition-all duration-300 sm:py-2",
                  mode === "video"
                    ? "bg-gold text-navy shadow-sm"
                    : "text-[var(--gray-500)] active:text-foreground hover:text-foreground"
                )}
              >
                Video
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMode("audio"); }}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-xs font-semibold transition-all duration-300 sm:py-2",
                  mode === "audio"
                    ? "bg-gold text-navy shadow-sm"
                    : "text-[var(--gray-500)] active:text-foreground hover:text-foreground"
                )}
              >
                Audio Only
              </button>
            </div>
          </div>
        </div>

        {/* Player area */}
        <div className="relative">
          {/* YouTube iframe — always in DOM for audio continuity */}
          <div
            className={cn(
              "transition-all duration-500",
              mode === "video"
                ? "aspect-video"
                : "h-0 overflow-hidden pointer-events-none"
            )}
          >
            <div id={playerElementId} className="h-full w-full" />
          </div>

          {/* Audio mode UI */}
          <AnimatePresence>
            {mode === "audio" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:gap-6 sm:p-6"
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-premium sm:h-28 sm:w-28">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-[var(--gray-200)]" />
                  )}
                  {/* Waveform overlay */}
                  <div className="absolute inset-0 flex items-end justify-center gap-[2px] bg-gradient-to-t from-navy/70 to-transparent p-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] rounded-t-full bg-gold/70"
                        animate={
                          isPlaying
                            ? {
                                height: [
                                  `${3 + Math.sin(i * 0.8) * 4}px`,
                                  `${3 + Math.cos(i * 0.6 + 1) * 8}px`,
                                  `${3 + Math.sin(i * 0.8) * 4}px`,
                                ],
                              }
                            : { height: "3px" }
                        }
                        transition={{
                          duration: 0.8 + (i % 5) * 0.08,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.04,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Controls + progress */}
                <div className="flex-1 w-full min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{title}</p>
                  <p className="mt-0.5 text-xs text-[var(--gray-400)]">
                    {speaker} &middot; {date}
                  </p>

                  {/* Playback controls */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      disabled={!playerReady}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-sm transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <HiPause size={22} /> : <HiPlay size={22} className="ml-0.5" />}
                    </button>

                    {/* Progress bar */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="sermon-progress group relative h-2 cursor-pointer rounded-full bg-white/[0.08]"
                        onClick={handleSeek}
                        role="progressbar"
                        aria-valuenow={Math.round(currentTime)}
                        aria-valuemin={0}
                        aria-valuemax={Math.round(duration)}
                        aria-label="Seek"
                      >
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-200"
                          style={{ width: `${progress}%` }}
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ left: `calc(${progress}% - 7px)` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-[10px] text-[var(--gray-400)] tabular-nums">
                        <span>{formatTime(currentTime)}</span>
                        <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
                      </div>
                    </div>

                    {/* Volume */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      disabled={!playerReady}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--gray-400)] transition-colors active:text-foreground hover:text-foreground disabled:opacity-50"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video mode bottom bar — compact controls */}
        {mode === "video" && (
          <div className="relative z-20 flex items-center gap-3 border-t border-white/[0.06] px-4 py-2.5 sm:px-5">
            <button
              type="button"
              onClick={togglePlay}
              disabled={!playerReady}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors active:bg-gold/30 hover:bg-gold/20 disabled:opacity-50"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <HiPause size={16} /> : <HiPlay size={16} className="ml-0.5" />}
            </button>

            <div className="flex-1 min-w-0">
              <div
                className="sermon-progress group relative h-1.5 cursor-pointer rounded-full bg-white/[0.08]"
                onClick={handleSeek}
                role="progressbar"
                aria-valuenow={Math.round(currentTime)}
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-label="Seek"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <span className="text-[11px] tabular-nums text-[var(--gray-400)] shrink-0">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : "--:--"}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              disabled={!playerReady}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--gray-400)] transition-colors active:text-foreground hover:text-foreground disabled:opacity-50"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <HiVolumeOff size={15} /> : <HiVolumeUp size={15} />}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
