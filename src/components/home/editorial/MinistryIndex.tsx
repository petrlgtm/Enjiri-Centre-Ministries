import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";
import EditorialLink from "./EditorialLink";

interface MinistryIndexProps {
  ministries?: Array<{ title: string; description: string; ctaUrl: string }>;
}

export default function MinistryIndex({ ministries }: MinistryIndexProps) {
  if (!ministries?.length) return null;

  return (
    <section className="bg-cream pt-6 pb-14 text-cream-heading sm:pt-8 sm:pb-16">
      <Container>
        <SectionMasthead label="Our Ministries" index="04" />

        <h2 className="mt-10 max-w-2xl font-display text-3xl leading-[1.1] font-semibold sm:text-4xl">
          Rooted in faith, <em className="not-italic text-gold-dark">growing in purpose</em>
        </h2>

        <ol className="mt-10 border-b border-cream-heading/15">
          {ministries.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 0.05}>
              <Link
                href={m.ctaUrl}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-5 gap-y-3 border-t border-cream-heading/15 px-2 py-8 transition-colors duration-500 hover:bg-navy sm:px-5 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:gap-x-10"
              >
                <span className="font-display text-3xl font-semibold text-gold-dark tabular-nums transition-colors duration-500 group-hover:text-gold sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-semibold transition-colors duration-500 group-hover:text-white sm:text-3xl">
                  {m.title}
                </span>
                <span className="col-span-3 col-start-1 text-sm leading-relaxed text-cream-body transition-colors duration-500 group-hover:text-white/70 sm:col-start-2 md:col-span-1 md:col-start-auto">
                  {m.description}
                </span>
                <HiArrowRight
                  aria-hidden
                  className="row-start-1 col-start-3 self-center text-xl text-cream-heading transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold md:col-start-4"
                />
              </Link>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8">
          <EditorialLink href="/charity" variant="outline-dark">Explore our outreach</EditorialLink>
        </div>
      </Container>
    </section>
  );
}
