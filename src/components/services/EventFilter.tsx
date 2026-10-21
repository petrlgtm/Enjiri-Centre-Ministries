"use client";

import { cn } from "@/lib/utils";

const categories = [
  { label: "All", value: "all" },
  { label: "Worship", value: "worship" },
  { label: "Youth", value: "youth" },
  { label: "Outreach", value: "outreach" },
  { label: "Fellowship", value: "fellowship" },
  { label: "Conference", value: "conference" },
];

interface EventFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function EventFilter({ active, onChange }: EventFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter events by category">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          role="tab"
          aria-selected={active === cat.value}
          className={cn(
            "px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2 focus-visible:ring-offset-navy focus-visible:outline-none",
            active === cat.value
              ? "bg-gold text-navy"
              : "border border-white/15 text-white/60 hover:border-gold hover:text-gold-light"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
