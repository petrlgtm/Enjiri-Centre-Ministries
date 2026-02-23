"use client";

import { useState } from "react";
import EventFilter from "@/components/services/EventFilter";
import EventCard from "@/components/services/EventCard";

interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  rsvpUrl?: string;
}

interface EventsGridProps {
  events: EventItem[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <>
      <EventFilter active={activeCategory} onChange={setActiveCategory} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event, index) => (
          <div key={event.title} className={index % 3 === 1 ? "lg:mt-10" : ""}>
            <EventCard {...event} index={index} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="text-cream-muted">No events in this category yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
