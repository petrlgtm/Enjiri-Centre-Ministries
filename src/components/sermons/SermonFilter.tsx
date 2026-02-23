"use client";

import { motion } from "framer-motion";
import { HiSearch } from "react-icons/hi";

interface SermonFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSeries: string;
  onSeriesChange: (value: string) => void;
  seriesList: string[];
}

export default function SermonFilter({
  searchQuery,
  onSearchChange,
  selectedSeries,
  onSeriesChange,
  seriesList,
}: SermonFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="frosted-panel shadow-premium-sm mb-12 rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
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

        {/* Series select */}
        <select
          value={selectedSeries}
          onChange={(e) => onSeriesChange(e.target.value)}
          aria-label="Filter by series"
          className="rounded-2xl border border-white/[0.08] bg-[var(--gray-50)] px-4 py-3.5 text-sm text-foreground/70 outline-none transition-all duration-300 focus:border-gold focus:border-l-gold focus:bg-navy-light focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] focus:ring-inset focus:ring-l-2 focus:ring-gold/40"
        >
          <option value="">All Series</option>
          {seriesList.map((series) => (
            <option key={series} value={series}>
              {series}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
