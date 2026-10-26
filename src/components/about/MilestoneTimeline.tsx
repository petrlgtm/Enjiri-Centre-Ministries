"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Chapter {
  year: string;
  title: string;
  description: string;
}

interface MilestoneTimelineProps {
  chapters: Chapter[];
}

/**
 * Alternating "chapters" timeline: a centre gold line fills with scroll progress,
 * and each giant outlined year floods with gold as it enters the viewport.
 */
export default function MilestoneTimeline({ chapters }: MilestoneTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative lg:pb-4">
      {/* Track + scroll-linked fill */}
      <span aria-hidden className="absolute top-0 bottom-0 left-[0.4rem] w-px bg-white/15 lg:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : progress }}
        className="absolute top-0 bottom-0 left-[0.4rem] w-px origin-top bg-gold lg:left-1/2"
      />

      {chapters.map((c, i) => {
        const right = i % 2 === 1;
        return (
          <li
            key={`${c.year}-${c.title}`}
            className={cn("relative grid pb-14 pl-10 last:pb-0 lg:grid-cols-2 lg:pb-0 lg:pl-0", i > 0 && "lg:-mt-24")}
          >
            {/* Marker */}
            <span
              aria-hidden
              className="absolute top-5 left-0 h-3.5 w-3.5 bg-gold ring-[6px] ring-ink-deep lg:left-1/2 lg:-translate-x-1/2"
            />

            <div className={cn("lg:px-14", right ? "lg:col-start-2" : "lg:text-right")}>
              {/* Year: outline that floods with gold */}
              <span className="relative inline-block font-display text-6xl leading-none font-bold sm:text-8xl">
                <span className="text-outline-gold">{c.year}</span>
                <motion.span
                  aria-hidden
                  className="absolute inset-0 text-gold"
                  initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c.year}
                </motion.span>
              </span>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-5 font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
                  Chapter {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">{c.title}</h3>
                <p className={cn("mt-3 max-w-sm text-[15px] leading-relaxed text-white/65", !right && "lg:ml-auto")}>
                  {c.description}
                </p>
              </motion.div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
