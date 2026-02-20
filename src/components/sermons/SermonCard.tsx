"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiArrowRight } from "react-icons/hi";

const sermonImages = [
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=70",
  "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=400&q=70",
  "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=70",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=70",
];

interface SermonCardProps {
  title: string;
  speaker: string;
  date: string;
  series?: string;
  slug: string;
  index?: number;
}

export default function SermonCard({
  title,
  speaker,
  date,
  series,
  slug,
  index = 0,
}: SermonCardProps) {
  const imageUrl = sermonImages[index % sermonImages.length];

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
      <Link
        href={`/sermons/${slug}`}
        className="card-3d card-premium group block overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] shadow-sm ring-1 ring-transparent transition-all duration-500 hover:shadow-xl hover:shadow-black/20 hover:ring-gold/15"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.12] group-hover:brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent" />

          {/* Hover overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Play button with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-navy shadow-[0_4px_25px_rgba(201,168,76,0.5)] transition-all duration-500 group-hover:shadow-[0_8px_35px_rgba(201,168,76,0.7)]"
              >
                <HiPlay size={24} className="ml-0.5" />
              </motion.div>
            </div>
          </div>

          {/* Series badge */}
          {series && (
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full bg-navy/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gold backdrop-blur-md border border-white/5">
                {series}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-[1.05rem] font-bold text-white transition-colors duration-300 group-hover:text-gold">
            {title}
          </h3>
          <div className="mt-2.5 flex items-center gap-2 text-sm text-[var(--gray-500)]">
            <span className="font-medium">{speaker}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--gray-300)]" />
            <span>{date}</span>
          </div>

          {/* Hover CTA */}
          <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <span>Listen</span>
            <HiArrowRight size={11} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
