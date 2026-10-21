"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
  backgroundImage?: string;
  /** Colour of the section that follows — the lead image straddles into it. */
  nextTone?: "cream" | "navy";
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Editorial page opener: kicker, display title with a gold italic last word, standfirst, and an optional lead image band. */
export default function PageHeader({ label, title, description, backgroundImage, nextTone = "cream" }: PageHeaderProps) {
  // Gold accent: everything after the last "&" (e.g. "Reach Outs"), otherwise the last word
  const clean = title.trim();
  const amp = clean.lastIndexOf("& ");
  const split = amp > 0 ? amp + 2 : clean.lastIndexOf(" ") + 1;
  const lead = clean.slice(0, split).trimEnd();
  const accent = clean.slice(split);

  return (
    <section className="relative overflow-hidden bg-navy">
      <div aria-hidden className="hero-editorial-glow absolute inset-0" />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0" />

      <Container className="relative pt-40 pb-12 sm:pt-44 lg:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light"
        >
          <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
          {label}
        </motion.p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-display text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:col-span-8 lg:text-[4rem]"
          >
            {lead && <>{lead} </>}
            <em className="whitespace-nowrap not-italic text-gold">{accent}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="max-w-md border-l-2 border-gold/60 pl-5 text-base leading-relaxed text-white/70 lg:col-span-4 lg:pb-3"
          >
            {description}
          </motion.p>
        </div>
      </Container>

      {backgroundImage && (
        <div className={cn("relative", nextTone === "cream" ? "header-straddle-cream" : "header-straddle-navy")}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="relative aspect-[16/9] overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,10,10,0.6)] sm:aspect-[21/8]"
            >
              <Image src={backgroundImage} alt="" fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
            </motion.div>
          </Container>
        </div>
      )}
    </section>
  );
}
