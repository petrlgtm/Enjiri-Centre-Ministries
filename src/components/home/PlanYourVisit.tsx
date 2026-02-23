"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiClock, HiLocationMarker, HiShieldCheck, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const details = [
  {
    icon: HiClock,
    label: "Next Service",
    value: "Sunday at 9:00 AM",
  },
  {
    icon: HiLocationMarker,
    label: "Location",
    value: "Enjiri Center, Main Sanctuary",
  },
  {
    icon: HiShieldCheck,
    label: "Childcare",
    value: "Available for ages 0–12",
  },
];

export default function PlanYourVisit() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-cream" />
      <Container className="relative">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <div className="relative h-64 overflow-hidden rounded-3xl shadow-lg lg:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&q=80&fm=webp&fit=crop"
                alt="Church interior with warm lighting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <SectionHeading
              label="First Time?"
              title="Plan Your Visit"
              subtitle="We'd love to welcome you. Here's everything you need to know for your first time at Enjiri Center."
              centered={false}
              onCream
            />

            <div className="space-y-4">
              {details.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-dark/10 text-gold-dark">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cream-muted">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-cream-heading">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Button
                href="/services"
                variant="primary"
                icon={<HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Plan Your Visit
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
