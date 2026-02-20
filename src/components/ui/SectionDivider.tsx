"use client";

import { cn } from "@/lib/utils";

type DividerVariant = "wave" | "curve" | "angle" | "gold-fade";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
  className?: string;
}

export default function SectionDivider({
  variant = "curve",
  flip = false,
  fromColor = "var(--background)",
  toColor = "var(--gray-50)",
  className,
}: SectionDividerProps) {
  if (variant === "gold-fade") {
    return (
      <div
        className={cn(
          "relative h-24 overflow-hidden",
          className
        )}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}
        />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div
        className={cn(
          "relative h-20 sm:h-28 overflow-hidden -mt-px",
          flip && "rotate-180",
          className
        )}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
            fill={toColor}
          />
          <path
            d="M0,72 C360,120 720,16 1080,72 C1260,100 1380,88 1440,72 L1440,120 L0,120 Z"
            fill={toColor}
            opacity="0.5"
          />
        </svg>
      </div>
    );
  }

  if (variant === "angle") {
    return (
      <div
        className={cn(
          "relative h-16 sm:h-24 overflow-hidden -mt-px",
          flip && "rotate-180",
          className
        )}
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <polygon points="0,40 1440,0 1440,100 0,100" fill={toColor} />
        </svg>
      </div>
    );
  }

  // Default: curve
  return (
    <div
      className={cn(
        "relative h-16 sm:h-24 overflow-hidden -mt-px",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q720,120 1440,0 L1440,100 L0,100 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
