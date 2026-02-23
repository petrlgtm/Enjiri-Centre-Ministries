"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProgramHeroProps {
  title: string;
  heroImage: string;
}

export default function ProgramHero({ title, heroImage }: ProgramHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
      <Image
        src={heroImage}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />

      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 flex origin-left items-center gap-2"
            >
              <span className="h-px w-10 bg-gold/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="h-px w-20 bg-gradient-to-r from-gold to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
