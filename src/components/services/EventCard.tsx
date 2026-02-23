"use client";

import { motion } from "framer-motion";
import { HiLocationMarker, HiClock } from "react-icons/hi";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  index?: number;
}

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  index = 0,
}: EventCardProps) {
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
      className="card-3d card-premium group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] shadow-sm ring-1 ring-transparent transition-all duration-500 hover:shadow-xl hover:shadow-gold/5 hover:ring-gold/20"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-7">
        {/* Top row */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red/60 transition-colors duration-300 group-hover:bg-red" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--gray-400)]">
              Event
            </span>
          </div>
          <span className="rounded-full bg-[var(--gold-muted)] px-3.5 py-1.5 text-xs font-semibold text-gold-dark border border-gold/10">
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[1.1rem] font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
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
              className="flex items-center gap-3 text-sm text-[var(--gray-500)]"
            >
              <div className="icon-breathe flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--gold-muted)] transition-all duration-300 group-hover:bg-gold/15">
                <item.icon className="text-gold/70" size={14} />
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mt-5 text-[0.85rem] leading-[1.7] text-[var(--gray-500)]">
          {description}
        </p>
      </div>

      {/* Bottom gold line — center-out expand on hover */}
      <div className="relative h-[2px] w-full bg-[var(--gray-50)]">
        <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-gradient-to-r from-gold-light via-gold to-gold-light transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
