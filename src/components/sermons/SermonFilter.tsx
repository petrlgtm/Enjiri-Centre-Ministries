"use client";

import { motion } from "framer-motion";
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

export default function SermonFilter({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: SermonFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="frosted-panel shadow-premium-sm mb-12 rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <HiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search sermons..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search sermons"
            className="w-full rounded-2xl border border-white/[0.08] bg-[var(--gray-50)] py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground/30 focus:border-gold focus:bg-navy-light focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]"
          />
        </div>

        {/* Date range pills */}
        <div className="flex rounded-2xl bg-[var(--gray-50)] p-1 border border-white/[0.06]">
          {DATE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onDateRangeChange(opt.value)}
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 whitespace-nowrap",
                dateRange === opt.value
                  ? "bg-gold text-navy shadow-sm"
                  : "text-[var(--gray-500)] hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
