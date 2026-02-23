"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

interface ProgramScriptureProps {
  text: string;
  reference: string;
}

export default function ProgramScripture({
  text,
  reference,
}: ProgramScriptureProps) {
  return (
    <section className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="relative p-10 sm:p-12">
            <div className="absolute inset-0 bg-navy" />
            <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
            <div className="relative text-center">
              <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
                &ldquo;{text}&rdquo;
              </p>
              <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-gold/30" />
                <span className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
                <span className="h-px w-8 bg-gold/30" />
              </div>
              <p className="mt-4 text-sm font-semibold tracking-wider text-gold">
                {reference.toUpperCase()}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
