"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import EventFilter from "@/components/services/EventFilter";

interface EventItem {
  title: string;
  slug: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  rsvpUrl?: string;
  image?: string;
}

interface EventsGridProps {
  events: EventItem[];
}

/** Upcoming events as a diary: big date, image, details. */
export default function EventsGrid({ events }: EventsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? events : events.filter((e) => e.category === activeCategory);

  if (events.length === 0) {
    return (
      <p className="max-w-xl font-display text-3xl leading-snug text-white/80">
        Nothing new on the calendar just yet. New gatherings are announced here first, so check back soon.
      </p>
    );
  }

  return (
    <>
      <EventFilter active={activeCategory} onChange={setActiveCategory} />
      <ul>
        {filtered.map((event) => (
          <li key={event.slug} className="border-b border-white/10">
            <Link
              href={`/services/${event.slug}`}
              className="group grid items-center gap-6 py-8 sm:grid-cols-[6rem_12rem_1fr_auto] sm:gap-8"
            >
              <span className="leading-none">
                <span className="block font-display text-6xl font-semibold text-gold">{event.day}</span>
                <span className="mt-1 block font-mono text-xs tracking-[0.2em] text-white/50 uppercase">{event.month}</span>
              </span>
              {event.image && (
                <span className="relative block aspect-4/3 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="192px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
              )}
              <span>
                <span className="block font-mono text-[10px] tracking-[0.2em] text-gold-light uppercase">
                  {event.category || "Event"}
                </span>
                <span className="mt-2 block font-display text-3xl text-white transition-colors duration-300 group-hover:text-gold-light">
                  {event.title}
                </span>
                <span className="mt-2 block font-mono text-xs text-white/50">
                  {event.time} · {event.location}
                </span>
              </span>
              <HiArrowRight className="hidden text-xl text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold sm:block" />
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <li className="py-12 text-white/60">No events in this category yet.</li>}
      </ul>
    </>
  );
}
