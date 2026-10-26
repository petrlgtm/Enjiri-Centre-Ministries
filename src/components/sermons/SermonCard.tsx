"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiMusicNote } from "react-icons/hi";
import { cn } from "@/lib/utils";

const fallbackImages = [
  "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/14e519858d8961e071fd34dc3fb0d0c85e20ac84-1890x1417.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/95925a5125bd0c15009c393c655ea99bc31d9a05-3508x2480.jpg?w=400&q=80&fm=webp&fit=crop",
  "https://cdn.sanity.io/images/shcw5txc/production/2ae5e82e49aad44aca9eafac04b3eccd9a8ceb2d-1600x1066.jpg?w=400&q=80&fm=webp&fit=crop",
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

/** Editorial sermon tile for the cream library: image, date, title — no box. */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" onClick={onClick} data-slug={slug} className="group block w-full text-left">
        <span className="relative block aspect-video overflow-hidden bg-navy">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:gap-2 sm:px-4 sm:py-2.5 font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
              isActive ? "bg-gold text-navy" : "bg-ink text-white group-hover:bg-gold group-hover:text-navy"
            )}
          >
            {isActive ? <HiMusicNote size={13} className="animate-pulse" /> : <HiPlay size={13} />}
            {isActive ? "Now playing" : "Watch"}
          </span>
        </span>
        <span className="mt-3 block font-mono text-xs text-gold-dark sm:mt-4">
          {date}
          {series && <> · {series}</>}
        </span>
        <span className="mt-1 block font-display text-sm leading-snug text-cream-heading sm:mt-1.5 sm:text-xl transition-colors duration-300 group-hover:text-gold-dark line-clamp-2">
          {title}
        </span>
        <span className="mt-1 block text-xs text-cream-muted">{speaker}</span>
      </button>
    </motion.div>
  );
}
