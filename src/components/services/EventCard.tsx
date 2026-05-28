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
      className="card-3d group relative overflow-hidden rounded-3xl border border-white/6 shadow-sm transition-all duration-500 hover:shadow-xl"
    >
      <Link href={`/services/${slug}`} className="block">
        {/* Background image */}
        {image && (
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-900 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy/70 transition-colors duration-500 group-hover:bg-navy/60" />
            
            {/* Category Badge overlay on image */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold/30 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                {category || "Event"}
              </span>
            </div>
          </div>
        )}

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-semibold text-gold border border-gold/20 backdrop-blur-sm">
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[1.2rem] font-bold text-foreground transition-colors duration-300 group-hover:text-gold font-(family-name:--font-playfair) line-clamp-1">
            {title}
          </h3>

          {/* Info rows */}
          <div className="mt-5 space-y-3">
            {[
              { icon: HiClock, text: time },
              { icon: HiLocationMarker, text: location },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-sm text-foreground/70"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold/20">
                  <item.icon className="text-gold/80" size={14} />
                </div>
                <span className="truncate">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="mt-5 text-[0.85rem] leading-[1.7] text-foreground/60 line-clamp-2">
            {description}
          </p>
          
          {/* View Details Link */}
          <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <span>View Event Details</span>
            <HiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>

      {/* Buttons (Separated from the main Link to prevent nested anchor errors) */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
        {rsvpUrl && (
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-4 py-2 text-xs font-semibold text-gold transition-all duration-300 hover:bg-gold/25 border border-gold/20 backdrop-blur-sm"
          >
            <HiExternalLink size={12} />
            RSVP
          </a>
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
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground/70 backdrop-blur-sm transition-all duration-300 hover:border-gold/25 hover:text-gold"
        >
          <HiCalendar size={12} />
          Add to Calendar
        </button>
      </div>

      {/* Bottom gold line — center-out expand on hover */}
      <div className="relative h-[2px] w-full bg-white/[0.04]">
        <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-linear-to-r from-gold-light via-gold to-gold-light transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
