"use client";

import { HiSearch } from "react-icons/hi";
import { cn } from "@/lib/utils";

export type DateRange = "all" | "month" | "3months" | "year";

const DATE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "all", label: "All" },
  { value: "month", label: "This Month" },
  { value: "3months", label: "3 Months" },
  { value: "year", label: "This Year" },
];

interface SermonFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (value: DateRange) => void;
}

export default function SermonFilter({ searchQuery, onSearchChange, dateRange, onDateRangeChange }: SermonFilterProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-muted" size={18} />
        <input
          type="text"
          placeholder="Search sermons…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search sermons"
          className="w-full bg-white py-4 pr-4 pl-11 text-sm text-cream-heading outline-none transition-shadow duration-300 placeholder:text-cream-muted focus:shadow-[0_0_0_2px_var(--gold)]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {DATE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onDateRangeChange(opt.value)}
            className={cn(
              "px-4 py-3 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors duration-300",
              dateRange === opt.value ? "bg-cream-heading text-cream" : "bg-white text-cream-body hover:text-gold-dark"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
