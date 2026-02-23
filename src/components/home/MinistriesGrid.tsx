"use client";

import { motion } from "framer-motion";
import { HiUserGroup, HiHeart, HiMusicNote, HiBookOpen, HiGlobe, HiStar, HiArrowRight } from "react-icons/hi";
import type { IconType } from "react-icons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface MinistryProp {
  title: string;
  description: string;
  icon?: string;
  ctaText?: string;
  ctaUrl?: string;
}

interface MinistriesGridProps {
  ministries?: MinistryProp[] | null;
}

const iconMap: Record<string, IconType> = {
  userGroup: HiUserGroup,
  heart: HiHeart,
  music: HiMusicNote,
  book: HiBookOpen,
  globe: HiGlobe,
  star: HiStar,
};

const fallbackMinistries: (MinistryProp & { iconComponent: IconType })[] = [
  {
    iconComponent: HiUserGroup,
    title: "Youth Ministry",
    description:
      "Empowering the next generation through Bible study, mentorship, and engaging activities that build lifelong faith.",
    ctaText: "Learn More",
    ctaUrl: "/contact",
  },
  {
    iconComponent: HiHeart,
    title: "Women's Fellowship",
    description:
      "A sisterhood of believers supporting one another through prayer, fellowship, and community service.",
    ctaText: "Get Involved",
    ctaUrl: "/contact",
  },
  {
    iconComponent: HiMusicNote,
    title: "Worship Team",
    description:
      "Leading the congregation into the presence of God through anointed praise and worship.",
    ctaText: "Join Us",
    ctaUrl: "/contact",
  },
];

function getIcon(iconName?: string): IconType {
  if (iconName && iconMap[iconName]) return iconMap[iconName];
  return HiStar;
}

export default function MinistriesGrid({ ministries }: MinistriesGridProps) {
  const useFallback = !ministries || ministries.length === 0;

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
          {useFallback
            ? fallbackMinistries.map((ministry, index) => (
                <MinistryCard
                  key={ministry.title}
                  title={ministry.title}
                  description={ministry.description}
                  IconComponent={ministry.iconComponent}
                  ctaText={ministry.ctaText || "Learn More"}
                  ctaUrl={ministry.ctaUrl || "/contact"}
                  index={index}
                />
              ))
            : ministries.map((ministry, index) => (
                <MinistryCard
                  key={ministry.title}
                  title={ministry.title}
                  description={ministry.description}
                  IconComponent={getIcon(ministry.icon)}
                  ctaText={ministry.ctaText || "Learn More"}
                  ctaUrl={ministry.ctaUrl || "/contact"}
                  index={index}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}

function MinistryCard({
  title,
  description,
  IconComponent,
  ctaText,
  ctaUrl,
  index,
}: {
  title: string;
  description: string;
  IconComponent: IconType;
  ctaText: string;
  ctaUrl: string;
  index: number;
}) {
  return (
    <motion.div
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
        <IconComponent size={26} />
      </div>

      <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream-heading transition-colors duration-300 group-hover:text-gold-dark">
        {title}
      </h3>

      <div className="mt-3 flex items-center gap-2">
        <span className="h-px w-8 bg-gradient-to-r from-gold-dark/30 to-transparent transition-all duration-500 group-hover:w-14" />
        <span className="h-1 w-1 rounded-full bg-gold-dark/20 transition-colors duration-500 group-hover:bg-gold-dark/50" />
      </div>

      <p className="mt-4 text-[0.88rem] leading-[1.75] text-cream-body">
        {description}
      </p>

      <div className="mt-5">
        <Button
          href={ctaUrl}
          variant="ghost"
          size="sm"
          icon={<HiArrowRight size={14} />}
          className="text-gold-dark hover:bg-gold-dark/5"
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
}
