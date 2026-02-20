"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiArrowRight, HiPlay } from "react-icons/hi";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import Container from "@/components/ui/Container";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=70",
    alt: "Worship service with raised hands",
  },
  {
    src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=70",
    alt: "Beautiful church interior with warm lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=70",
    alt: "Congregation gathered together in prayer",
  },
  {
    src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=70",
    alt: "Community fellowship and togetherness",
  },
];

const INTERVAL_MS = 7000;

function SplitText({
  words,
  className,
  delay = 0,
}: {
  words: string[];
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

function FloatingParticle({ delay, x, y, size, color = "bg-gold" }: { delay: number; x: string; y: string; size: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0, 1, 0.8, 1, 0],
        y: [0, -30, -20, -40, -60],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

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
      scale: 1.15,
      x: dir > 0 ? "5%" : "-5%",
      filter: "brightness(0.3) blur(4px)",
    }),
    center: {
      opacity: 1,
      scale: 1.05,
      x: "0%",
      filter: "brightness(1) blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? "-5%" : "5%",
      filter: "brightness(0.2) blur(2px)",
    }),
  };

  return (
    <section className="relative h-[90dvh] overflow-hidden">
      {/* ── Ambient Background Layers ── */}
      <div className="mesh-gradient-animated absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/90" />
      <div className="aurora-bg" style={{ opacity: 0.4 }} />
      <div className="noise-overlay absolute inset-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2, delay: 1 }}
        className="pattern-grid absolute inset-0"
      />

      {/* ── Ambient Morph Blobs ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
        className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px]"
      >
        <div className="morph-blob h-full w-full bg-gradient-to-br from-red/[0.08] to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
        className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px]"
      >
        <div className="morph-blob h-full w-full bg-gradient-to-tr from-gold/[0.06] to-transparent" style={{ animationDelay: "-4s" }} />
      </motion.div>

      {/* ── Ambient Particles ── */}
      <FloatingParticle delay={0} x="8%" y="25%" size={3} />
      <FloatingParticle delay={2} x="20%" y="70%" size={2} color="bg-red/60" />
      <FloatingParticle delay={3.5} x="45%" y="85%" size={2} />

      {/* ── Main Content Grid ── */}
      <Container className="relative z-10 flex h-full items-center pt-[160px] pb-16 lg:pt-[180px] lg:pb-12">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* ════ LEFT COLUMN — Content ════ */}
          <div className="order-2 text-center lg:order-1 lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-start"
            >
              <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/20 bg-gold/[0.08] px-5 py-2 text-[12px] font-medium tracking-[0.15em] text-gold/90 backdrop-blur-md">
                <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-light" />
                </span>
                <span className="relative">WELCOME TO OUR CHURCH</span>
              </span>
            </motion.div>

            {/* Title — 3-line cinematic reveal */}
            <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-tight text-white">
              <SplitText words={["Experience"]} delay={0.3} />
              <br />
              <SplitText
                words={["God's", "Saving"]}
                className="text-gradient-gold-animated"
                delay={0.42}
              />
              <br />
              <SplitText
                words={["Power"]}
                className="text-gradient-gold-animated"
                delay={0.66}
              />
            </h1>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 flex origin-center items-center justify-center gap-3 lg:mx-0 lg:origin-left lg:justify-start"
            >
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50 lg:from-gold/50 lg:to-transparent" />
              <motion.span
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="h-2 w-2 rotate-45 border border-gold/50"
              />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-xl text-[1.05rem] font-light leading-[1.85] text-white/75 lg:mx-0 lg:max-w-md"
            >
              Reaching the world with the love of Christ through worship, outreach,
              and service. Come as you are and experience God&apos;s transforming power.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
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

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 flex items-center justify-center gap-5 sm:gap-8 lg:justify-start"
            >
              {[
                { end: 10, suffix: "+", label: "Years of Ministry" },
                { end: 1000, suffix: "+", label: "Lives Touched" },
                { end: 50, suffix: "+", label: "Outreach Programs" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-5 sm:gap-8">
                  {i > 0 && (
                    <motion.span
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 + i * 0.1 }}
                      className="h-10 w-px origin-center bg-gradient-to-b from-transparent via-white/15 to-transparent"
                    />
                  )}
                  <div className="text-center lg:text-left">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      className="block font-[family-name:var(--font-playfair)] text-xl font-bold text-gold sm:text-2xl"
                    />
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT COLUMN — Image Carousel ════ */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative w-full max-w-[360px] mx-auto lg:max-w-none lg:max-h-[60vh]">

              {/* Image Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-3"
              >
                {/* Corner accents — inside padding so they don't overflow */}
                <div className="absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-gold/30 rounded-tl-xl pointer-events-none z-10" />
                <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-gold/30 rounded-br-xl pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-7 w-7 border-t border-r border-red/20 rounded-tr-lg pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-red/20 rounded-bl-lg pointer-events-none z-10" />

                {/* Image container — landscape on mobile, portrait on desktop */}
                <div
                  className="relative aspect-[16/10] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40"
                >
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
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        priority={currentImage === 0}
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-navy/15 pointer-events-none" />
                  <div className="noise-overlay absolute inset-0 pointer-events-none" />

                  {/* Slide counter — glass pill */}
                  <div className="glass absolute bottom-4 left-4 rounded-lg px-3 py-1.5 text-[11px] font-medium tracking-widest text-white/60">
                    {String(currentImage + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
                  </div>

                  {/* Floating particles on image */}
                  <FloatingParticle delay={1} x="70%" y="20%" size={3} />
                  <FloatingParticle delay={2.5} x="25%" y="65%" size={2} color="bg-red/50" />
                  <FloatingParticle delay={4} x="85%" y="75%" size={2} />
                </div>

                {/* Slide progress indicators — below frame */}
                <div className="mt-6 flex justify-center gap-2">
                  {HERO_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentImage ? 1 : -1); setCurrentImage(i); }}
                      className="group relative h-1 w-8 overflow-hidden rounded-full bg-white/15 transition-all duration-300"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      {i === currentImage && (
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-light"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                        />
                      )}
                      {i !== currentImage && (
                        <div className="absolute inset-y-0 left-0 w-0 rounded-full bg-gold/50 transition-all duration-300 group-hover:w-full" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Discover
          </span>
          <div className="relative h-12 w-[1.5px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute h-1/2 w-full rounded-full bg-gradient-to-b from-gold/60 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
