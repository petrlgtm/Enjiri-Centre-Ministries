"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiArrowRight, HiPlay } from "react-icons/hi";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80&fm=webp&fit=crop",
    alt: "Worship service with raised hands",
  },
  {
    src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1400&q=80&fm=webp&fit=crop",
    alt: "Beautiful church interior with warm lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1400&q=80&fm=webp&fit=crop",
    alt: "Congregation gathered together in prayer",
  },
  {
    src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1400&q=80&fm=webp&fit=crop",
    alt: "Community fellowship and togetherness",
  },
];

const INTERVAL_MS = 7000;

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextImage]);

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.1,
      x: dir > 0 ? "3%" : "-3%",
    }),
    center: {
      opacity: 1,
      scale: 1.05,
      x: "0%",
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1,
      x: dir > 0 ? "-3%" : "3%",
    }),
  };

  return (
    <section className="relative h-dvh min-h-[700px] overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Hero image carousel">

      {/* ── Full-screen Image Carousel ── */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={currentImage}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImage].src}
            alt={HERO_IMAGES[currentImage].alt}
            fill
            sizes="100vw"
            priority={currentImage === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Dark overlays for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <Container className="relative z-10 flex h-full flex-col justify-center pt-[130px] pb-20 sm:pt-[140px] sm:pb-24 lg:pt-[156px] lg:pb-28">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative inline-flex items-center gap-1.5 min-[375px]:gap-2 overflow-hidden rounded-full border border-gold/20 bg-gold/[0.08] px-3 min-[375px]:px-4 sm:px-5 py-2 text-[10px] min-[375px]:text-[11px] sm:text-[12px] font-medium tracking-[0.08em] min-[375px]:tracking-[0.12em] sm:tracking-[0.15em] text-gold/90 backdrop-blur-md">
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-light opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-light" />
              </span>
              <span className="relative">PREACHING CHRIST IN ALL NATIONS</span>
            </span>
          </motion.div>


          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-[1.05rem] font-light leading-[1.85] text-white/75 drop-shadow-sm"
          >
            Preaching Christ and Restoring Hope through the power of the Holy Spirit.
            Ministering the Gospel through repentance and remission of sins to all nations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <div className="btn-magnetic">
              <Button
                href="/services"
                variant="primary"
                size="lg"
                icon={<HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Join Us Sunday
              </Button>
            </div>
            <div className="btn-magnetic">
              <Button
                href="/sermons"
                variant="outline"
                size="lg"
                icon={<HiPlay size={16} />}
              >
                Watch Sermons
              </Button>
            </div>
          </motion.div>

        </div>
      </Container>

    </section>
  );
}
