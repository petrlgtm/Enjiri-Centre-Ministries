"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const defaultValues = [
  {
    title: "Worship",
    number: "01",
    description:
      "Experience heartfelt worship that draws you closer to God and transforms your life from the inside out.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/e4baa1e0a5b3d6d1ac60be1e81b03f9e512aa58e-3508x2480.jpg?w=900&q=80&fm=webp&fit=crop",
    href: "/services",
  },
  {
    title: "Teachings",
    number: "02",
    description:
      "Grounded in the Word of God, our teachings equip you for daily living and spiritual growth.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=900&q=80&fm=webp&fit=crop",
    href: "/sermons",
  },
  {
    title: "Outreach",
    number: "03",
    description:
      "Impacting communities and nations through missions, charity, and the gospel of Jesus Christ.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/7af02c1fe9ba39271e8ba9c9d97f2ae8871b2732-1890x1417.jpg?w=900&q=80&fm=webp&fit=crop",
    href: "/charity",
  },
  {
    title: "Community",
    number: "04",
    description:
      "A family of believers connected by love, supporting one another through every season of life.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/cfebaa48374a9e505d13c8600ba52f621c2c427a-3508x2480.jpg?w=900&q=80&fm=webp&fit=crop",
    href: "/about",
  },
];

interface MissionSectionProps {
  missionText?: string;
  values?: Array<{
    title: string;
    description: string;
    image: string;
    link?: string;
  }>;
}

export default function MissionSection({ missionText, values }: MissionSectionProps) {
  const displayValues = values && values.length > 0
    ? values.map((v, i) => ({
        ...v,
        number: `0${i + 1}`,
        href: v.link || "/contact",
      }))
    : defaultValues;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-(--gray-50)" />

      <Container className="relative">
        <SectionHeading
          label="What We Stand For"
          title="Rooted in Faith, Growing in Purpose"
          subtitle={missionText || "Ministering the Gospel of our Lord Jesus Christ through repentance and remission of sins to all nations. — Luke 24:47"}
          centered
        />

        {/* Alternating editorial rows */}
        <div className="space-y-4 sm:space-y-5">
          {displayValues.map((value, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={value.href}
                  className={`group relative flex flex-col overflow-hidden border border-white/6 bg-(--gray-100) transition-all duration-500 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5 sm:flex-row ${reversed ? "sm:flex-row-reverse" : ""}`}
                >
                  {/* Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-auto sm:h-[22rem] sm:w-1/2 lg:h-[26rem]">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-(--gray-100) via-transparent to-transparent sm:hidden" />
                    <div
                      className={`absolute inset-0 hidden sm:block ${
                        reversed
                          ? "bg-linear-to-l from-(--gray-100) via-transparent to-transparent"
                          : "bg-linear-to-r from-(--gray-100) via-transparent to-transparent"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative flex w-full flex-col justify-center overflow-hidden p-8 sm:w-1/2 sm:p-12 lg:p-16">
                    {/* Giant ghost number watermark */}
                    <span
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-(family-name:--font-playfair) text-[9rem] font-bold leading-none text-foreground/[0.04] transition-colors duration-700 group-hover:text-gold/[0.06] lg:text-[11rem] ${
                        reversed ? "-left-4 sm:-right-6 sm:left-auto" : "-left-4"
                      }`}
                    >
                      {value.number}
                    </span>

                    <div className="relative">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold/60">
                        {value.number} — What We Stand For
                      </span>

                      <h3 className="mt-3 font-(family-name:--font-playfair) text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-gold sm:text-4xl">
                        {value.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="h-px w-12 bg-linear-to-r from-gold/50 to-transparent transition-all duration-500 group-hover:w-20" />
                        <span className="h-1.5 w-1.5 bg-gold/40 transition-colors duration-500 group-hover:bg-gold/70" />
                      </div>

                      <p className="mt-5 max-w-md text-[0.95rem] leading-[1.85] text-(--gray-400)">
                        {value.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        <span>Learn More</span>
                        <HiArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
