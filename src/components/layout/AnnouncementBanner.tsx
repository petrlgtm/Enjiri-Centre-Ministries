"use client";

import Link from "next/link";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
  message: string;
  linkText?: string;
  linkUrl?: string;
  style?: "info" | "warning" | "celebration";
}

const styleClasses: Record<string, string> = {
  info: "bg-blue-900/90 text-blue-50 border-blue-700/30",
  warning: "bg-amber-900/90 text-amber-50 border-amber-700/30",
  celebration: "bg-gradient-to-r from-gold-dark/90 to-gold/90 text-navy border-gold/30",
};

export default function AnnouncementBanner({
  message,
  linkText,
  linkUrl,
  style = "info",
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "relative z-[60] border-b px-4 py-2.5 text-center text-sm",
        styleClasses[style] || styleClasses.info
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
        <span>{message}</span>
        {linkText && linkUrl && (
          <Link
            href={linkUrl}
            className="font-semibold underline underline-offset-2 hover:no-underline"
          >
            {linkText}
          </Link>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="ml-2 rounded-full p-1 hover:bg-black/10"
          aria-label="Dismiss announcement"
        >
          <HiX size={14} />
        </button>
      </div>
    </div>
  );
}
