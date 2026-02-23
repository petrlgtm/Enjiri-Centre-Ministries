"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
}

function SplitTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </>
  );
}

export default function PageHeader({
  label,
  title,
  description,
}: PageHeaderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 bg-navy" />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Subtle pattern grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
        className="pattern-grid absolute inset-0"
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      {/* Content */}
      <Container className="relative z-10">
        <motion.div style={{ opacity }} className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block rounded-full border border-gold/25 bg-gold/[0.1] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm"
          >
            {label}
          </motion.span>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl leading-[1.05]">
            <SplitTitle text={title} />
          </h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 flex origin-center items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="h-2 w-2 rotate-45 bg-red/80"
            />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-foreground/75"
          >
            {description}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
