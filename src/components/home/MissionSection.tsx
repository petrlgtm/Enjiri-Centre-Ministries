"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiHeart, HiBookOpen, HiGlobe, HiUserGroup, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  {
    icon: HiHeart,
    title: "Worship",
    number: "01",
    description:
      "Experience heartfelt worship that draws you closer to God and transforms your life from the inside out.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=70",
    accent: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/10 group-hover:bg-gold",
    href: "/services",
  },
  {
    icon: HiBookOpen,
    title: "Teachings",
    number: "02",
    description:
      "Grounded in the Word of God, our teachings equip you for daily living and spiritual growth.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=70",
    accent: "from-red/15 to-red/5",
    iconBg: "bg-red/10 group-hover:bg-red",
    href: "/sermons",
  },
  {
    icon: HiGlobe,
    title: "Outreach",
    number: "03",
    description:
      "Impacting communities and nations through missions, charity, and the gospel of Jesus Christ.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=70",
    accent: "from-gold/15 to-gold/5",
    iconBg: "bg-gold/10 group-hover:bg-gold",
    href: "/charity",
  },
  {
    icon: HiUserGroup,
    title: "Community",
    number: "04",
    description:
      "A family of believers connected by love, supporting one another through every season of life.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=70",
    accent: "from-red/20 to-red/5",
    iconBg: "bg-red/10 group-hover:bg-red",
    href: "/about",
  },
];

export default function MissionSection() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-32">
      <div className="absolute inset-0 bg-[var(--gray-50)]" />

      <Container className="relative">
        <SectionHeading
          label="What We Stand For"
          title="Rooted in Faith, Growing in Purpose"
          subtitle="Ministering the Gospel of our Lord Jesus Christ through repentance and remission of sins to all nations. — Luke 24:47"
        />

        {/* 2x2 grid — alternating image heights for visual rhythm */}
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {values.map((value, index) => (
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
                className="card-premium group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] transition-all duration-500 hover:border-gold/15 hover:shadow-xl hover:shadow-gold/5"
              >
                {/* Image section — alternating heights */}
                <div className={`relative overflow-hidden ${index % 2 === 0 ? "h-64" : "h-52"}`}>
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-100)] via-navy/40 to-transparent" />

                  {/* Number overlay */}
                  <span className="absolute bottom-3 right-5 font-[family-name:var(--font-playfair)] text-[4.5rem] font-bold leading-none text-foreground/[0.08] transition-all duration-700 group-hover:text-gold/[0.12]">
                    {value.number}
                  </span>

                  {/* Icon badge */}
                  <div className="absolute -bottom-5 left-6 z-10">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.iconBg} text-gold ring-4 ring-[var(--gray-100)] transition-all duration-500 group-hover:text-foreground group-hover:shadow-lg group-hover:ring-[var(--gray-100)]`}>
                      <value.icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="relative px-6 pb-7 pt-8">
                  {/* Subtle gradient accent */}
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-bl ${value.accent} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />

                  <div className="relative">
                    {/* Number label */}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/50">
                      {value.number} — {value.title}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                      {value.title}
                    </h3>

                    {/* Decorative line */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-px w-10 bg-gradient-to-r from-gold/40 to-transparent transition-all duration-500 group-hover:w-16" />
                      <span className="h-1 w-1 rounded-full bg-gold/30 transition-colors duration-500 group-hover:bg-gold/60" />
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-[0.9rem] leading-[1.8] text-[var(--gray-400)]">
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
