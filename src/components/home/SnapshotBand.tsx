"use client";

import { motion } from "framer-motion";
import { HiClock, HiCalendar, HiUserGroup, HiLocationMarker } from "react-icons/hi";
import Container from "@/components/ui/Container";

const snapshots = [
  {
    icon: HiClock,
    label: "Sunday Service",
    value: "9:00 AM",
  },
  {
    icon: HiCalendar,
    label: "Midweek Service",
    value: "Wednesday 6 PM",
  },
  {
    icon: HiUserGroup,
    label: "Community",
    value: "1,000+ Members",
  },
  {
    icon: HiLocationMarker,
    label: "Location",
    value: "Enjiri Center",
  },
];

export default function SnapshotBand() {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 bg-cream" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-2.5 min-[375px]:gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {snapshots.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex items-center gap-2.5 min-[375px]:gap-3 sm:gap-4 rounded-2xl bg-white/80 backdrop-blur-md border border-black/[0.06] px-3 py-3 min-[375px]:px-4 sm:px-5 sm:py-4 shadow-sm transition-all duration-500 hover:border-gold-dark/20 hover:shadow-md"
            >
              <div className="flex h-9 w-9 min-[375px]:h-10 min-[375px]:w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gold-dark/10 text-gold-dark transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                <item.icon className="h-4 w-4 min-[375px]:h-[18px] min-[375px]:w-[18px] sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] min-[375px]:text-[11px] font-semibold uppercase tracking-[0.1em] min-[375px]:tracking-[0.15em] text-cream-muted truncate">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs min-[375px]:text-sm font-bold text-cream-heading truncate">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
