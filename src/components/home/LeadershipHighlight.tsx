"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface LeaderProp {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface LeadershipHighlightProps {
  leader?: LeaderProp | null;
}

const fallbackLeader: LeaderProp = {
  name: "Our Pastor",
  role: "Lead Pastor",
  bio: "Our leadership team is dedicated to shepherding the flock with wisdom, compassion, and unwavering commitment to the Word of God. Guided by the Holy Spirit, we strive to equip every believer for the work of ministry.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fm=webp&fit=crop",
};

export default function LeadershipHighlight({ leader }: LeadershipHighlightProps) {
  const displayLeader = leader || fallbackLeader;

  return (
    <section className="relative overflow-hidden py-28">

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="card-premium overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)]"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:w-5/12">
              <Image
                src={displayLeader.image}
                alt={displayLeader.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--gray-100)]/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--gray-100)]" />
            </div>

            {/* Content */}
            <div className="relative p-5 sm:p-8 lg:w-7/12 lg:p-12">
              <span className="inline-block rounded-full bg-[var(--gold-muted)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark border border-gold/10">
                Meet Our Pastor
              </span>

              <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground sm:text-3xl">
                {displayLeader.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-gold">
                {displayLeader.role}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-px w-10 bg-gold/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-red" />
                <span className="h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>

              <p className="mt-5 max-w-lg text-[0.95rem] leading-[1.85] text-[var(--gray-400)]">
                {displayLeader.bio}
              </p>

              <div className="mt-8">
                <Button
                  href="/about"
                  variant="outline"
                  icon={<HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
                >
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
