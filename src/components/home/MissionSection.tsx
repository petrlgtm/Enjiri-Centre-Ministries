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
    image: "https://cdn.sanity.io/images/shcw5txc/production/e4baa1e0a5b3d6d1ac60be1e81b03f9e512aa58e-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    accent: "from-gold/20 to-gold/5",
    href: "/services",
  },
  {
    title: "Teachings",
    number: "02",
    description:
      "Grounded in the Word of God, our teachings equip you for daily living and spiritual growth.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=600&q=80&fm=webp&fit=crop",
    accent: "from-red/15 to-red/5",
    href: "/sermons",
  },
  {
    title: "Outreach",
    number: "03",
    description:
      "Impacting communities and nations through missions, charity, and the gospel of Jesus Christ.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/7af02c1fe9ba39271e8ba9c9d97f2ae8871b2732-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
    accent: "from-gold/15 to-gold/5",
    href: "/charity",
  },
  {
    title: "Community",
    number: "04",
    description:
      "A family of believers connected by love, supporting one another through every season of life.",
    image: "https://cdn.sanity.io/images/shcw5txc/production/cfebaa48374a9e505d13c8600ba52f621c2c427a-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    accent: "from-red/20 to-red/5",
    href: "/about",
  },
];

const accents = ["from-gold/20 to-gold/5", "from-red/15 to-red/5", "from-gold/15 to-gold/5", "from-red/20 to-red/5"];

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
        accent: accents[i % accents.length],
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

        {/* 2x2 grid — alternating image heights for visual rhythm */}
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {displayValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={value.href}
                className="card-premium group relative block overflow-hidden border border-white/6 bg-(--gray-100) transition-all duration-500 hover:border-gold/15 hover:shadow-xl hover:shadow-gold/5"
              >
                {/* Image section — aspect-ratio on mobile, fixed heights on desktop */}
                <div className={`relative overflow-hidden ${index % 2 === 0 ? "aspect-16/10 sm:aspect-video" : "aspect-16/10 sm:aspect-3/2"}`}>
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--gray-100) via-navy/40 to-transparent" />

                  {/* Number overlay */}
                  <span className="absolute bottom-3 right-5 font-(family-name:--font-playfair) text-[4.5rem] font-bold leading-none text-foreground/8 transition-all duration-700 group-hover:text-gold/12">
                    {value.number}
                  </span>
                </div>

                {/* Content section */}
                <div className="relative px-5 pb-6 pt-7 sm:px-6 sm:pb-7 sm:pt-8">
                  {/* Subtle gradient accent */}
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 bg-linear-to-bl ${value.accent} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />

                  <div className="relative">
                    {/* Number label */}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/50">
                      {value.number} — {value.title}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 font-(family-name:--font-playfair) text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                      {value.title}
                    </h3>

                    {/* Decorative line */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-px w-10 bg-linear-to-r from-gold/40 to-transparent transition-all duration-500 group-hover:w-16" />
                      <span className="h-1 w-1 bg-gold/30 transition-colors duration-500 group-hover:bg-gold/60" />
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-[0.9rem] leading-[1.8] text-(--gray-400)">
                      {value.description}
                    </p>

                    {/* Learn More — appears on hover */}
                    <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <span>Learn More</span>
                      <HiArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
