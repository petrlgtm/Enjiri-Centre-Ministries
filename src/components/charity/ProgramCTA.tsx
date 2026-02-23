"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiHeart } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface ProgramCTAProps {
  ctaTitle: string;
  ctaDescription: string;
  heroImage: string;
}

export default function ProgramCTA({
  ctaTitle,
  ctaDescription,
  heroImage,
}: ProgramCTAProps) {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Get involved"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 bg-navy" />
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionHeading
            label="Get Involved"
            title={ctaTitle}
            subtitle={ctaDescription}
            light
          />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
