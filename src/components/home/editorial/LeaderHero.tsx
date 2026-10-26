import Image from "next/image";
import Link from "next/link";
import { HiPlay } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EditorialLink from "./EditorialLink";

interface LeaderHeroProps {
  heading?: string;
  subheading?: string;
  cta?: { label: string; url: string };
  secondaryText?: string;
  secondaryUrl?: string;
  leader?: { name: string; role: string; image: string; alt?: string; isCutout: boolean } | null;
  schedule?: Array<{ day: string; time: string; serviceName: string }>;
}

export default function LeaderHero({
  heading,
  subheading,
  cta,
  secondaryText,
  secondaryUrl,
  leader,
  schedule,
}: LeaderHeroProps) {
  const words = (heading || "Enjiri Center Ministries International").split(" ");
  const accentCount = words.length > 3 ? 2 : 1;
  const lead = words.slice(0, -accentCount).join(" ");
  const accent = words.slice(-accentCount).join(" ");

  return (
    <section className="hero-ink relative overflow-x-clip">
      {/* Daybreak rays rising behind the leader, fading out towards the copy */}
      <div aria-hidden className="hero-ink-rays absolute inset-0" />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0" />

      <Container className="relative grid items-end gap-8 pt-40 sm:pt-44 lg:grid-cols-12 lg:gap-10 lg:pt-40">
        {/* Copy */}
        <div className="pb-4 lg:col-span-5 lg:self-center lg:pb-24">
          <Reveal>
            <h1 className="max-w-xl font-display text-[2.4rem] leading-[1.08] font-semibold text-white sm:text-5xl xl:text-[3.6rem]">
              {lead} <em className="not-italic text-gold-light">{accent}</em>
            </h1>
          </Reveal>

          {subheading && (
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/75 sm:text-[1.05rem]">{subheading}</p>
            </Reveal>
          )}

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <EditorialLink href={cta?.url || "/contact"}>{cta?.label || "Plan Your Visit"}</EditorialLink>
            <Link
              href={secondaryUrl || "/sermons"}
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-gold-light"
            >
              <HiPlay className="text-gold" size={18} />
              {secondaryText || "Watch Sermons"}
            </Link>
          </Reveal>
        </div>

        {/* Leader portrait */}
        {leader && (
          <Reveal delay={0.1} className="relative mx-auto mt-2 h-[30rem] w-full max-w-xl sm:mt-6 sm:h-[46rem] lg:col-span-7 lg:h-[56rem] lg:max-w-none">
            <Image
              src={leader.image}
              alt={leader.alt || leader.name}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className={leader.isCutout ? "object-contain object-bottom" : "object-cover object-top"}
            />
            <div className="absolute bottom-24 left-0 max-w-[13rem] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] sm:bottom-12 sm:max-w-[15rem] sm:px-5 sm:py-4">
              <p className="font-display text-base leading-tight font-semibold text-cream-heading sm:text-xl">{leader.name}</p>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-gold-dark">{leader.role}</p>
            </div>
          </Reveal>
        )}
      </Container>

      {/* Weekly rhythm card — straddles the hero and the next section */}
      {schedule && schedule.length > 0 && (
        <Container className="relative z-10 -mb-16 sm:-mb-12">
          <div className="grid bg-white px-6 shadow-[0_24px_60px_-20px_rgba(18,15,11,0.5)] sm:grid-cols-3 sm:px-0">
            {schedule.slice(0, 3).map((item) => (
              <div key={item.serviceName} className="flex items-baseline gap-4 py-5 sm:px-7">
                <span className="font-mono text-xs tracking-[0.2em] text-gold-dark uppercase">{item.day.slice(0, 3)}</span>
                <span className="text-sm text-cream-heading">{item.serviceName}</span>
                <span className="ml-auto font-mono text-xs text-cream-muted">{item.time.split(" - ")[0]}</span>
              </div>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
