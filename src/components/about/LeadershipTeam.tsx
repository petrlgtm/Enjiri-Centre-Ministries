"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const leaders = [
  {
    name: "Evangelist Peter Kalagi",
    role: "President, Enjiri Center Ministries",
    bio: "God called Evangelist Kalagi Peter into the ministry of evangelism at the age of 14. Starting from serving in choir, PA systems, youth, and outreach evangelism, he grew through prayer, fasting, and studying the Word of God. After leadership training at Miracle Bible College, his passion for winning souls continued to grow. He has travelled extensively preaching and teaching, leading many souls to Christ both locally and internationally — with bodies healed supernaturally and hearts set free by the power of Almighty God.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
  },
];

export default function LeadershipTeam() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_20%,rgba(196,125,42,0.05),transparent_55%),radial-gradient(ellipse_at_35%_80%,rgba(201,168,76,0.04),transparent_50%)]" />
      <Container>
        <SectionHeading
          label="Our Shepherds"
          title="Meet the Leadership"
          subtitle="Dedicated leaders who shepherd and serve our church family with love, wisdom, and integrity."
        />

        {/* Asymmetric layout: Senior Pastor wide, others in 3-column row */}
        <div className="space-y-6">
          {/* Senior Pastor — wide horizontal card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-navy shadow-lg"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-72 sm:h-auto sm:w-[45%] overflow-hidden">
                <Image
                  src={leaders[0].image}
                  alt={leaders[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:w-[55%] sm:p-10">
                <span className="mb-2 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold border border-gold/10">
                  President &amp; Founder
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-gold-light">
                  {leaders[0].name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gold">
                  {leaders[0].role}
                </p>
                <p className="mt-4 text-sm leading-[1.75] text-foreground/70">
                  {leaders[0].bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Other leaders — 3-column grid */}
          {leaders.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-3">
              {leaders.slice(1).map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-navy shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold-light">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-gold">
                      {leader.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {leader.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
