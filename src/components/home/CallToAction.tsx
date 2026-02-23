"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiHeart, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function FloatingParticle({ delay, left, size = 1.5 }: { delay: number; left: string; size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0.6, 0],
        y: [0, -50, -100, -140, -180],
        x: [0, 10, -5, 15, 0],
        scale: [0, 1, 0.8, 0.6, 0],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute bottom-0 rounded-full"
      style={{ left, width: size * 2, height: size * 2, background: delay % 2 < 1 ? 'rgba(201,168,76,0.5)' : 'rgba(196,125,42,0.5)' }}
    />
  );
}

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], [30, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-40">
      {/* Background image with parallax + scale */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-[-20%]">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fm=webp&fit=crop"
          alt="Community"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 mesh-gradient-animated opacity-60" />
      <div className="noise-overlay absolute inset-0" />

      {/* Aurora effect */}
      <div className="aurora-bg" style={{ opacity: 0.5 }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Pattern */}
      <div className="pattern-cross absolute inset-0 opacity-30" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticle delay={0} left="10%" size={1.5} />
        <FloatingParticle delay={1} left="22%" size={2} />
        <FloatingParticle delay={2.2} left="38%" size={1} />
        <FloatingParticle delay={0.5} left="50%" size={2.5} />
        <FloatingParticle delay={3} left="62%" size={1.5} />
        <FloatingParticle delay={1.5} left="75%" size={2} />
        <FloatingParticle delay={2.8} left="88%" size={1} />
        <FloatingParticle delay={0.3} left="45%" size={1.5} />
        <FloatingParticle delay={3.5} left="32%" size={2} />
        <FloatingParticle delay={1.8} left="58%" size={1} />
      </div>

      <Container className="relative z-10">
        <motion.div
          style={{ y: textY }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Icon with pulse ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mx-auto mb-10 relative"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red/15 ring-1 ring-red/30">
              <HiHeart className="text-red-light" size={34} />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 mx-auto h-20 w-20 rounded-full border border-red/20 animate-ping" style={{ animationDuration: "3s" }} />
          </motion.div>

          {/* Title with stagger */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground sm:text-5xl lg:text-[3.5rem] leading-[1.1]"
          >
            Partner With Us in{" "}
            <span className="text-gradient-gold-animated">God&apos;s Work</span>
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 flex origin-center items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="h-2 w-2 rotate-45 border border-gold/30"
            />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-8 max-w-xl text-lg leading-[1.8] text-foreground/75"
          >
            Your generous giving supports our outreach programs, community
            services, and the spreading of the gospel to the nations. Every
            contribution makes an eternal difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <div className="btn-magnetic">
              <Button
                href="/donate"
                variant="primary"
                size="lg"
                icon={<HiHeart size={18} />}
              >
                Give Today
              </Button>
            </div>
            <div className="btn-magnetic">
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                icon={<HiArrowRight size={16} />}
              >
                Get Involved
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
