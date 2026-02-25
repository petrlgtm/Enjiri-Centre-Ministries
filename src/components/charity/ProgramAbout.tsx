"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";

interface ProgramAboutProps {
  title: string;
  paragraphs: string[];
  aboutImage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

export default function ProgramAbout({
  title,
  paragraphs,
  aboutImage,
  body,
}: ProgramAboutProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <span className="inline-block rounded-full border border-gold/25 bg-gold/[0.1] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              About This Program
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-8 bg-gold/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
            </div>
            <div className="mt-6">
              {body && body.length > 0 ? (
                <PortableTextRenderer value={body} />
              ) : (
                <div className="space-y-4">
                  {paragraphs.map((text, i) => (
                    <p
                      key={i}
                      className="text-[0.95rem] leading-relaxed text-[var(--gray-400)]"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src={aboutImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
