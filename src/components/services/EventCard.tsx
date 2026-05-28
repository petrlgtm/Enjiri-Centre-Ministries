"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiLocationMarker, HiClock, HiCalendar, HiExternalLink, HiArrowRight } from "react-icons/hi";
import { generateICS } from "@/lib/utils";

interface EventCardProps {
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  rsvpUrl?: string;
  image?: string;
  index?: number;
}

export default function EventCard({
  title,
  slug,
  date,
  time,
  location,
  description,
  category,
  rsvpUrl,
  image,
  index = 0,
}: EventCardProps) {
  const icsUrl = generateICS({
    title,
    date: new Date().toISOString(),
    location,
    description,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-3d group relative aspect-[4/5] sm:aspect-auto sm:h-[480px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-500"
    >
      <Link href={`/services/${slug}`} className="absolute inset-0 z-0">
        {/* Full Card Background Image */}
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Dynamic Gradients for Readability */}
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-navy/20 transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
      </Link>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 z-10 pointer-events-none">
        {/* Top: Category & Date */}
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md border border-gold/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold/30 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {category || "Event"}
          </span>
          
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/10">
              {date}
            </span>
          </div>
        </div>

        {/* Bottom: Info & Actions */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-(family-name:--font-playfair) leading-tight drop-shadow-md">
            {title}
          </h3>

          {/* Icon details */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <HiClock className="text-gold" size={16} />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <HiLocationMarker className="text-gold" size={16} />
              <span className="truncate max-w-[150px]">{location}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-white/70 line-clamp-2 sm:line-clamp-3">
            {description}
          </p>

          {/* Action Buttons — need pointer-events-auto to be clickable */}
          <div className="pt-2 flex flex-wrap items-center gap-3 pointer-events-auto">
            {rsvpUrl ? (
              <a
                href={rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-navy transition-all duration-300 hover:bg-white hover:scale-105"
              >
                <HiExternalLink size={14} />
                RSVP NOW
              </a>
            ) : (
              <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-navy transition-all duration-300 hover:bg-white hover:scale-105"
              >
                VIEW DETAILS
                <HiArrowRight size={14} />
              </Link>
            )}
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = icsUrl;
                link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.ics`;
                link.click();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              aria-label="Add to Calendar"
            >
              <HiCalendar size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover visual effect */}
      <div className="absolute inset-0 border-2 border-gold/0 transition-all duration-500 group-hover:border-gold/30 pointer-events-none rounded-3xl" />
    </motion.div>
  );
}
