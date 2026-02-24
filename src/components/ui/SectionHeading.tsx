"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
  light?: boolean;
  onCream?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  centered = true,
  light = false,
  onCream = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-10 sm:mb-14 lg:mb-16", centered && "text-center", className)}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "mb-4 sm:mb-5 inline-block rounded-full px-4 py-1.5 text-[10px] sm:px-5 sm:py-2 sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]",
            onCream
              ? "bg-gold-dark/10 text-gold-dark border border-gold-dark/15"
              : light
                ? "bg-gold/15 text-gold-light border border-gold/10"
                : "bg-[var(--gold-muted)] text-gold-dark border border-gold/10"
          )}
        >
          {label}
        </motion.span>
      )}
      <h2
        className={cn(
          "font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] sm:leading-[1.12]",
          onCream ? "text-cream-heading" : "text-foreground"
        )}
      >
        {title}
      </h2>

      {/* Elegant divider with animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "mt-5 flex origin-left items-center gap-2",
          centered ? "justify-center origin-center" : ""
        )}
      >
        <span className={cn("h-px w-10", onCream ? "bg-gold-dark/40" : "bg-gold/50")} />
        <span className="h-1.5 w-1.5 rounded-full bg-red" />
        <span className={cn("h-px w-20 bg-gradient-to-r", onCream ? "from-gold-dark/40 to-transparent" : "from-gold to-transparent")} />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            "mt-4 sm:mt-5 max-w-2xl text-[0.9rem] sm:text-[1.05rem] leading-[1.7] sm:leading-[1.75]",
            centered && "mx-auto",
            onCream ? "text-cream-body" : light ? "text-gray-300" : "text-[var(--gray-400)]"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
