"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiMusicNote } from "react-icons/hi";
import { cn } from "@/lib/utils";

const fallbackImages = [
  "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/14e519858d8961e071fd34dc3fb0d0c85e20ac84-1890x1417.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/95925a5125bd0c15009c393c655ea99bc31d9a05-3508x2480.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=400&q=80&fm=webp&fit=crop",
];

interface SermonCardProps {
  title: string;
  speaker: string;
  date: string;
  series?: string;
  slug: string;
  thumbnail?: string;
  videoUrl?: string;
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SermonCard({
  title,
  speaker,
  date,
  series,
  slug,
  thumbnail,
  index = 0,
  isActive = false,
  onClick,
}: SermonCardProps) {
  const imageUrl = thumbnail || fallbackImages[index % fallbackImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={onClick}
        data-slug={slug}
        className={cn(
          "card-3d card-premium group block w-full overflow-hidden  border bg-(--gray-100) text-left shadow-sm ring-1 transition-all duration-500 hover:shadow-xl hover:shadow-black/20",
          isActive
            ? "border-gold/40 ring-gold/30 shadow-gold-glow"
            : "border-white/6 ring-transparent hover:ring-2 hover:ring-gold/30"
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-all duration-900 ease-out group-hover:scale-[1.12] group-hover:brightness-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/50 via-navy/10 to-transparent" />

          {/* Hover overlay glow */}
          <div className="absolute inset-0 bg-linear-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Play button with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" role="img" aria-label={`Play sermon: ${title}`}>
              <div className="absolute inset-0 bg-gold/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative flex h-14 w-14 items-center justify-center bg-gold/90 text-navy shadow-[0_4px_25px_rgba(201,168,76,0.5)] transition-all duration-500 group-hover:shadow-[0_8px_35px_rgba(201,168,76,0.7)]"
              >
                <HiPlay size={24} className="ml-0.5" />
              </motion.div>
            </div>
          </div>

          {/* Overlay title on thumbnail */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-linear-to-t from-navy/80 to-transparent pointer-events-none">
            <h4 className="text-sm font-bold text-white/90 line-clamp-2 drop-shadow-sm">{title}</h4>
          </div>

          {/* Series badge */}
          {series && (
            <div className="absolute top-3 left-3">
              <span className="bg-navy/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gold backdrop-blur-md border border-white/5">
                {series}
              </span>
            </div>
          )}

          {/* Now Playing badge */}
          {isActive && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1.5 bg-gold px-3 py-1.5 text-[11px] font-bold tracking-wide text-navy">
                <HiMusicNote size={12} className="animate-pulse" />
                Now Playing
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-[1.05rem] font-bold text-foreground transition-colors duration-300 group-hover:text-gold line-clamp-2">
            {title}
          </h3>
          <div className="mt-2.5 flex items-center gap-2 text-sm text-(--gray-500)">
            <span className="font-medium">{speaker}</span>
            <span className="h-1 w-1 bg-(--gray-300)" />
            <span>{date}</span>
          </div>

          {/* Hover CTA */}
          <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <span>{isActive ? "Playing" : "Listen"}</span>
            <HiPlay size={11} />
          </div>
        </div>
      </button>
    </motion.div>
  );
}
