"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 10, suffix: "+", label: "Years of Ministry" },
  { value: 1000, suffix: "+", label: "Lives Touched" },
  { value: 50, suffix: "+", label: "Outreach Programs" },
];

const timeline = [
  { year: "2015", title: "Founded", description: "A small group of believers gathered in faith to spread the gospel." },
  { year: "2018", title: "First Outreach", description: "Expanded impact to surrounding communities through service." },
  { year: "2020", title: "Digital Ministry", description: "Reaching the world through online platforms during a global shift." },
  { year: "2023", title: "International Expansion", description: "Spreading the gospel across nations and borders." },
];

interface ChurchHistoryProps {
  image?: string;
}

export default function ChurchHistory({ image }: ChurchHistoryProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={image || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80&fm=webp&fit=crop"}
                alt="Enjiri Center Ministries — Our Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
              <div className="noise-overlay absolute inset-0" />

              {/* Decorative gold frame */}
              <div className="absolute inset-3 rounded-2xl border border-gold/10 pointer-events-none" />
            </div>

            {/* Stats bar overlapping the image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative -mt-16 mx-4 sm:mx-6"
            >
              <div className="glass rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                      <div className="text-center">
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix}
                          className="block font-[family-name:var(--font-playfair)] text-xl font-bold text-gold sm:text-2xl"
                        />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/60">
                          {stat.label}
                        </span>
                      </div>
                      {i < stats.length - 1 && (
                        <div className="mx-3 h-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:mx-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Story Content */}
          <div>
            <SectionHeading
              label="Our Story"
              title="A Legacy of Faith & Service"
              centered={false}
              className="mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-4 text-[0.95rem] leading-[1.85] text-[var(--gray-400)]"
            >
              <p>
                Enjiri Center Ministries International was founded on a deep
                conviction to spread the gospel of Jesus Christ and serve
                communities with the love of God. From humble beginnings, the
                ministry has grown into a vibrant community of believers.
              </p>
              <p>
                Through the years, God has been faithful in expanding our reach,
                touching lives across cities and nations. Our doors are open to
                everyone — regardless of background or walk of life.
              </p>
            </motion.div>

            {/* Scripture quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 border-l-2 border-gold/30 pl-6"
            >
              <p className="font-[family-name:var(--font-playfair)] text-lg italic text-foreground/80">
                &ldquo;For I know the plans I have for you, declares the Lord...&rdquo;
              </p>
              <p className="mt-2 text-sm font-semibold text-gold-dark">
                Jeremiah 29:11
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="mt-12 relative pl-8">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-transparent"
              />

              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-2.5 flex items-center justify-center">
                      <span className="h-3 w-3 rounded-full border-2 border-gold bg-navy shadow-[0_0_6px_rgba(201,168,76,0.3)]" />
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[var(--gray-100)] p-4 transition-all duration-300 hover:border-gold/20 hover:shadow-sm">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">
                          {item.year}
                        </span>
                        <span className="font-semibold text-foreground text-sm">
                          {item.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--gray-400)]">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
