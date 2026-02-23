"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface TestimonyProp {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonies?: TestimonyProp[] | null;
}

const fallbackTestimonials: TestimonyProp[] = [
  {
    quote:
      "Enjiri Center Ministries changed my life. The teachings are grounded in the Word and the community feels like family.",
    name: "Grace M.",
    role: "Church Member",
  },
  {
    quote:
      "I came broken and found healing. The prayer ministry and pastoral care here are unlike anything I've experienced.",
    name: "David K.",
    role: "Youth Leader",
  },
  {
    quote:
      "The outreach programs have impacted our community in ways we never imagined. God is truly at work through this ministry.",
    name: "Sarah N.",
    role: "Volunteer",
  },
  {
    quote:
      "My children love the Sunday school, and our entire family has grown in faith since we joined. Truly a blessing.",
    name: "Joseph R.",
    role: "Church Member",
  },
];

const AUTOPLAY_MS = 6000;

export default function TestimonialsCarousel({ testimonies }: TestimonialsCarouselProps) {
  const displayTestimonials = testimonies && testimonies.length > 0 ? testimonies : fallbackTestimonials;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % displayTestimonials.length);
  }, [displayTestimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  }, [displayTestimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-cream" />

      <Container className="relative">
        <SectionHeading
          label="Testimonies"
          title="Lives Transformed"
          subtitle="Hear from those whose lives have been touched by the ministry."
          onCream
        />

        <div
          className="relative mx-auto max-w-3xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[200px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-[1.8] text-cream-heading/80 sm:text-2xl">
                  &ldquo;{displayTestimonials[current].quote}&rdquo;
                </p>
                <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold-dark/30" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-gold-dark/40" />
                  <span className="h-px w-8 bg-gold-dark/30" />
                </div>
                <footer className="mt-4">
                  <p className="text-sm font-bold text-cream-heading">
                    {displayTestimonials[current].name}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-cream-muted">
                    {displayTestimonials[current].role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-cream-muted transition-all duration-300 hover:border-gold-dark/30 hover:text-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none ${
                    i === current
                      ? "w-6 bg-gold-dark"
                      : "w-2 bg-black/10 hover:bg-black/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-cream-muted transition-all duration-300 hover:border-gold-dark/30 hover:text-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none"
              aria-label="Next testimonial"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
