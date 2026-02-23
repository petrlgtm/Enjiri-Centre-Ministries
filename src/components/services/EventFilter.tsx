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
    <div className="mb-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter events by category">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          role="tab"
          aria-selected={active === cat.value}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none",
            active === cat.value
              ? "bg-gold text-navy shadow-[0_4px_16px_rgba(201,168,76,0.3)]"
              : "border border-black/[0.06] bg-white text-cream-muted hover:border-gold-dark/30 hover:text-gold-dark"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
