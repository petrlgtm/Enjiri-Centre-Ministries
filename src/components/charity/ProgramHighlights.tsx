"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProgramHighlightsProps {
  highlights: { title: string; description: string }[];
}

export default function ProgramHighlights({
  highlights,
}: ProgramHighlightsProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 bg-cream" />
      <Container className="relative">
        <SectionHeading
          label="What We Do"
          title="Program Highlights"
          subtitle="Key areas of impact and focus within this program."
          onCream
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-2xl border border-gold-dark/10 bg-white/80 p-6 shadow-sm transition-all duration-500 hover:shadow-md hover:border-gold-dark/25"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-dark/10 font-[family-name:var(--font-playfair)] text-lg font-bold text-gold-dark transition-transform duration-500 group-hover:scale-110">
                {i + 1}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-body">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
