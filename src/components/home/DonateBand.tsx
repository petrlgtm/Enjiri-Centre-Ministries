"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiHeart, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const amounts = [25, 50, 100, 250];

export default function DonateBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      {/* Parallax background */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-[-20%]">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fm=webp&fit=crop"
          alt="Community gathered together"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-navy/85" />
      <div className="noise-overlay absolute inset-0" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mx-auto mb-8"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red/15 ring-1 ring-red/30">
              <HiHeart className="text-red-light" size={34} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-[1.1]"
          >
            Partner With Us in{" "}
            <span className="text-gradient-gold-animated">God&apos;s Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-[1.8] text-foreground/75"
          >
            Your generous giving supports our outreach, community services, and the spreading of the gospel to the nations.
          </motion.p>

          {/* Amount pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {amounts.map((amount) => (
              <span
                key={amount}
                className="rounded-full border border-gold/30 bg-gold/[0.08] px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold/20 hover:border-gold/50 cursor-pointer"
              >
                ${amount}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <div className="btn-magnetic">
              <Button
                href="/donate"
                variant="primary"
                size="lg"
                icon={<HiHeart size={18} />}
              >
                Give Now
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
        </div>
      </Container>
    </section>
  );
}
