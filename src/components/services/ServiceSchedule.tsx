"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiClock } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const schedule = [
  {
    day: "Sunday",
    services: [
      { name: "Sunday Worship Service", time: "9:00 AM - 12:00 PM" },
      { name: "Children's Church", time: "9:30 AM - 11:30 AM" },
    ],
  },
  {
    day: "Wednesday",
    services: [
      { name: "Bible Study & Prayer", time: "6:00 PM - 8:00 PM" },
    ],
  },
  {
    day: "Friday",
    services: [
      { name: "Intercessory Prayer", time: "6:00 PM - 8:00 PM" },
      { name: "Youth Fellowship", time: "5:00 PM - 7:00 PM" },
    ],
  },
  {
    day: "Saturday",
    services: [
      { name: "Women's Fellowship (1st & 3rd)", time: "10:00 AM - 12:00 PM" },
      { name: "Men's Fellowship (2nd & 4th)", time: "10:00 AM - 12:00 PM" },
    ],
  },
];

export default function ServiceSchedule() {
  return (
    <section className="relative overflow-hidden py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left side */}
          <div className="lg:w-1/2">
            <SectionHeading
              label="Join Us"
              title="Weekly Services"
              centered={false}
            />

            <p className="mb-8 max-w-md text-[1.05rem] leading-[1.75] text-[var(--gray-400)]">
              Join us throughout the week for worship, prayer, and fellowship.
              Every gathering is an opportunity to grow in faith and community.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/10] sm:aspect-auto sm:h-64 overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80&fm=webp&fit=crop"
                alt="Congregation gathered in worship"
                fill
                className="object-contain sm:object-cover transition-all duration-[900ms] group-hover:scale-[1.08]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
              <div className="noise-overlay absolute inset-0" />

              {/* Scripture overlay with glass effect */}
              <div className="absolute inset-x-4 bottom-4">
                <div className="glass rounded-2xl p-5">
                  <p className="font-[family-name:var(--font-playfair)] text-sm leading-relaxed text-foreground/90 italic">
                    &ldquo;For where two or three gather in my name, there am I
                    with them.&rdquo;
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-gold/80">Matthew 18:20</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side — schedule cards */}
          <div className="space-y-4 lg:w-1/2">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-3d card-premium group overflow-hidden rounded-2xl border border-white/[0.06] border-l-2 border-l-gold bg-[var(--gray-100)]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                      {item.day}
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--gray-400)]">
                      {item.services.length} {item.services.length === 1 ? "service" : "services"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {item.services.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-4 rounded-xl bg-[var(--gray-50)] px-4 py-3 transition-all duration-300 group-hover:bg-gold/[0.04]"
                      >
                        <span className="text-[0.9rem] font-medium text-[var(--gray-600)]">
                          {service.name}
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-sm text-[var(--gray-500)]">
                          <HiClock size={14} className="text-gold/60" />
                          {service.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
