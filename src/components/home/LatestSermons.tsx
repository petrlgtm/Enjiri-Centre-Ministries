"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const placeholderSermons = [
  {
    title: "Walking in God's Purpose",
    speaker: "Pastor John",
    date: "February 16, 2026",
    series: "Living by Faith",
    duration: "42:15",
    slug: "walking-in-gods-purpose",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80&fm=webp&fit=crop",
  },
  {
    title: "The Power of Prayer",
    speaker: "Pastor John",
    date: "February 9, 2026",
    series: "Living by Faith",
    duration: "38:20",
    slug: "the-power-of-prayer",
    image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=400&q=80&fm=webp&fit=crop",
  },
  {
    title: "Grace That Transforms",
    speaker: "Guest Speaker",
    date: "February 2, 2026",
    series: "Amazing Grace",
    duration: "45:08",
    slug: "grace-that-transforms",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80&fm=webp&fit=crop",
  },
];

export default function LatestSermons() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[var(--gray-50)]" />

      <Container className="relative">
        <SectionHeading
          label="The Word of God"
          title="Latest Sermons"
          subtitle="Catch up on our most recent teachings and be encouraged by the Word."
        />

        {/* Staggered grid: middle card pushed down for visual rhythm */}
        <div className="perspective-container grid gap-7 md:grid-cols-3 md:items-start">
          {placeholderSermons.map((sermon, index) => (
            <motion.div
              key={sermon.slug}
              initial={{ opacity: 0, y: 50, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={index === 1 ? "md:mt-12" : ""}
            >
              <Link
                href={`/sermons?play=${sermon.slug}`}
                className="card-3d card-premium group block overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-[900ms] group-hover:scale-[1.12] group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />

                  {/* Play button with ring pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping" style={{ animationDuration: "2s" }} />
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-navy shadow-[0_4px_30px_rgba(201,168,76,0.5)] transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.7)]"
                      >
                        <HiPlay size={28} className="ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Series badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-navy/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gold backdrop-blur-md border border-white/5">
                      {sermon.series}
                    </span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-full bg-navy/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-foreground/70 backdrop-blur-md border border-white/5">
                      {sermon.duration}
                    </span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[1.05rem] font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                    {sermon.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
                    <span className="font-medium">{sermon.speaker}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{sermon.date}</span>
                  </div>

                  {/* Arrow hint on hover */}
                  <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Listen now</span>
                    <HiArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="btn-magnetic inline-block">
            <Button
              href="/sermons"
              variant="secondary"
              icon={<HiArrowRight size={16} />}
            >
              View All Sermons
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
