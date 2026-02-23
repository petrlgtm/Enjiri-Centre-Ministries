"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface LeaderProp {
  name: string;
  role: string;
  bio: string | string[];
  image: string;
}

interface LeadershipTeamProps {
  leaders?: LeaderProp[] | null;
}

const fallbackLeaders: LeaderProp[] = [
  {
    name: "Evangelist Peter Kalagi",
    role: "President, Enjiri Center Ministries",
    bio: [
      "God called Evangelist Kalagi Peter into the ministry of evangelism at the age of 14. He never knew anything about preaching, but the fire to evangelize to people never stopped burning on the inside of him.",
      "In 2004 Evangelist Kalagi joined a local church in Uganda, Africa; there he started ministering in church through different ministerial departments such as the Choir, the PA system, Youth and Outreach Evangelizing. It was through all those areas of ministry he learnt how to speak in the congregation of the church.",
      "In 2012 Evangelist Kalagi joined Miracle Center Cathedral, there he learnt many things about ministry operations which developed through prayer and fasting, and much indulgent studying of the Word of God which became his daily bread to date.",
      "In 2014 Evangelist Kalagi joined the ministerial department of hospitality through which he enjoyed serving the people of God within his local church as well as the community.",
      "Following hospitality, Evangelist Kalagi's hunger for the things of God continued to grow and so he later joined the leadership training at Miracle Bible College. His passion for winning souls and ever showing the love of God never ceased. The mandate on his life to preach the gospel of Jesus Christ kept increasing.",
      "Evangelist Kalagi started holding crusades on a small scale, through hospital outreach, visiting the orphans, the elderly, schools and started house to house fellowships. The fire of God never ceased from manifesting throughout his life and ministry, with bodies healed supernaturally and hearts set free by the Power of Almighty God. Evangelist Kalagi has travelled extensively preaching and teaching, leading many souls to Christ both locally and internationally.",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
  },
];

function getBioParagraphs(bio: string | string[]): string[] {
  if (Array.isArray(bio)) return bio;
  return bio.split("\n").filter((p) => p.trim().length > 0);
}

export default function LeadershipTeam({ leaders }: LeadershipTeamProps) {
  const displayLeaders = leaders && leaders.length > 0 ? leaders : fallbackLeaders;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
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
                  src={displayLeaders[0].image}
                  alt={displayLeaders[0].name}
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
                  {displayLeaders[0].name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gold">
                  {displayLeaders[0].role}
                </p>
                <div className="mt-4 space-y-3">
                  {getBioParagraphs(displayLeaders[0].bio).map((paragraph, i) => (
                    <p key={i} className="text-sm leading-[1.75] text-foreground/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other leaders — 3-column grid */}
          {displayLeaders.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-3">
              {displayLeaders.slice(1).map((leader, index) => (
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
                    <div className="mt-3 space-y-2">
                      {getBioParagraphs(leader.bio).map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed text-foreground/70">
                          {paragraph}
                        </p>
                      ))}
                    </div>
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
