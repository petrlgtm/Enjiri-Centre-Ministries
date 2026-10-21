"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  /** Kept for compatibility — editorial headings are always left-aligned. */
  centered?: boolean;
  light?: boolean;
  onCream?: boolean;
  className?: string;
}

/** Editorial section opener: square-bullet kicker, display title. */
export default function SectionHeading({
  title,
  subtitle,
  label,
  onCream = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-8 sm:mb-12", className)}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.22em]",
            onCream ? "text-cream-heading" : "text-gold-light"
          )}
        >
          {label || title}
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-end">
        <h2
          className={cn(
            "font-display text-3xl leading-[1.1] font-semibold sm:text-4xl lg:col-span-7 lg:text-5xl",
            onCream ? "text-cream-heading" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "max-w-xl text-[0.95rem] leading-relaxed sm:text-base lg:col-span-5 lg:pb-2",
              onCream ? "text-cream-body" : "text-foreground/65"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
