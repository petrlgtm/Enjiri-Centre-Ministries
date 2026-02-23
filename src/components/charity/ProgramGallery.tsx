"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProgramGalleryProps {
  gallery: string[];
  title: string;
}

export default function ProgramGallery({
  gallery,
  title,
}: ProgramGalleryProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 bg-cream" />
      <Container className="relative">
        <SectionHeading
          label="Gallery"
          title="Moments That Matter"
          subtitle={`See the impact of ${title} through the lives touched and communities transformed.`}
          onCream
        />

        <div className="columns-2 gap-4 sm:columns-3">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4 overflow-hidden rounded-2xl"
            >
              <div
                className={`relative ${i % 3 === 0 ? "h-64 sm:h-80" : "h-48 sm:h-60"}`}
              >
                <Image
                  src={src}
                  alt={`${title} gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
