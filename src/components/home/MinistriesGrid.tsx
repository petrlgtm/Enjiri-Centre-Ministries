"use client";

import { motion } from "framer-motion";
import { HiUserGroup, HiHeart, HiMusicNote, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const ministries = [
  {
    icon: HiUserGroup,
    title: "Youth Ministry",
    blurb:
      "Empowering the next generation through Bible study, mentorship, and engaging activities that build lifelong faith.",
    cta: "Learn More",
  },
  {
    icon: HiHeart,
    title: "Women's Fellowship",
    blurb:
      "A sisterhood of believers supporting one another through prayer, fellowship, and community service.",
    cta: "Get Involved",
  },
  {
    icon: HiMusicNote,
    title: "Worship Team",
    blurb:
      "Leading the congregation into the presence of God through anointed praise and worship.",
    cta: "Join Us",
  },
];

export default function MinistriesGrid() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-cream" />

      <Container className="relative">
        <SectionHeading
          label="Get Involved"
          title="Our Ministries"
          subtitle="Discover where God is calling you to serve and grow in community."
          onCream
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-2xl border border-black/[0.06] bg-white p-7 shadow-sm transition-all duration-500 hover:border-gold-dark/20 hover:shadow-xl hover:shadow-gold-dark/5"
            >
              <div className="icon-breathe flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-dark/10 text-gold-dark transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110">
                <ministry.icon size={26} />
              </div>

              <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream-heading transition-colors duration-300 group-hover:text-gold-dark">
                {ministry.title}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-gold-dark/30 to-transparent transition-all duration-500 group-hover:w-14" />
                <span className="h-1 w-1 rounded-full bg-gold-dark/20 transition-colors duration-500 group-hover:bg-gold-dark/50" />
              </div>

              <p className="mt-4 text-[0.88rem] leading-[1.75] text-cream-body">
                {ministry.blurb}
              </p>

              <div className="mt-5">
                <Button
                  href="/contact"
                  variant="ghost"
                  size="sm"
                  icon={<HiArrowRight size={14} />}
                  className="text-gold-dark hover:bg-gold-dark/5"
                >
                  {ministry.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
