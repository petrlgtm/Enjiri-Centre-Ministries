"use client";

import { motion } from "framer-motion";
import {
  HiEye,
  HiLightBulb,
  HiStar,
  HiShieldCheck,
  HiHeart,
} from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const coreValues = [
  {
    icon: HiStar,
    title: "Faith",
    description: "Living by faith and trusting in God's promises for our lives.",
  },
  {
    icon: HiHeart,
    title: "Love",
    description: "Demonstrating Christ's unconditional love in all we do.",
  },
  {
    icon: HiShieldCheck,
    title: "Integrity",
    description: "Walking in truth and transparency before God and man.",
  },
  {
    icon: HiLightBulb,
    title: "Excellence",
    description: "Serving God and people with the highest standard of excellence.",
  },
];

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-[var(--gray-50)] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,168,76,0.13),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(185,28,28,0.12),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />

      <Container>
        {/* Vision & Mission — side by side */}
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-8 lg:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold-muted)] border border-gold/10">
              <HiEye className="text-gold" size={24} />
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Our Vision
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.85] text-[var(--gray-400)]">
              To be a global ministry that transforms lives through the power
              of the gospel, raising leaders who impact their communities and
              nations for the kingdom of God.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-8 lg:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold-muted)] border border-gold/10">
              <HiLightBulb className="text-gold" size={24} />
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Our Mission
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.85] text-[var(--gray-400)]">
              To glorify God by making disciples of all nations through worship,
              teaching of the Word, fellowship, outreach, and service to
              humanity — demonstrating the love of Christ in tangible ways.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <SectionHeading
            label="What Guides Us"
            title="Core Values"
            className="mb-12"
          />

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-6 text-center transition-all duration-300 hover:border-gold/20 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold-muted)] text-gold transition-all duration-400 group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_16px_rgba(201,168,76,0.2)]">
                  <value.icon size={22} />
                </div>
                <h4 className="mt-4 font-bold text-white transition-colors duration-300 group-hover:text-gold">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm leading-[1.7] text-[var(--gray-400)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
