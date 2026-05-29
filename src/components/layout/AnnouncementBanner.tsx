"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiX, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatDate, formatTime } from "@/lib/utils";

export interface BannerSlide {
  id: string;
  message: string;
  linkText?: string;
  linkUrl: string;
  style?: "info" | "warning" | "celebration";
}

interface AnnouncementBannerProps {
  slides: BannerSlide[];
  onDismiss?: () => void;
}

const styleClasses: Record<string, string> = {
  info: "bg-navy/95 text-white border-white/10",
  warning: "bg-amber-900/90 text-amber-50 border-amber-700/30",
  celebration: "bg-linear-to-r from-gold-dark/95 to-gold/95 text-navy border-gold/30",
};

export default function AnnouncementBanner({
  slides,
  onDismiss,
}: AnnouncementBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  if (dismissed || !slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={cn(
        "relative z-[60] border-b px-4 py-2 text-center text-sm transition-colors duration-500",
        styleClasses[currentSlide.style || "info"]
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Navigation - Hidden on mobile if only 1 slide */}
        <div className="flex shrink-0 gap-1 opacity-0 sm:opacity-100 transition-opacity">
          {slides.length > 1 && (
            <>
              <button 
                onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="rounded-full p-1 hover:bg-black/5"
                aria-label="Previous announcement"
              >
                <HiChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
                className="rounded-full p-1 hover:bg-black/5"
                aria-label="Next announcement"
              >
                <HiChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        <div className="relative flex-1 overflow-hidden h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 font-medium"
            >
              <span className="truncate">{currentSlide.message}</span>
              {currentSlide.linkUrl && (
                <Link
                  href={currentSlide.linkUrl}
                  className="shrink-0 font-bold underline underline-offset-2 hover:no-underline transition-all"
                >
                  {currentSlide.linkText || "Details"}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-full p-1 hover:bg-black/5"
          aria-label="Dismiss announcement"
        >
          <HiX size={16} />
        </button>
      </div>
      
      {/* Progress bar for multi-slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black/5">
          <motion.div
            key={currentIndex}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-white/20"
          />
        </div>
      )}
    </div>
  );
}
