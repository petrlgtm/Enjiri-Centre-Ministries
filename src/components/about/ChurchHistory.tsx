import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import { PortableTextContent } from "@/types/sanity";

const defaultStats = [
  { value: 10, suffix: "+", label: "Years of Ministry" },
  { value: 1000, suffix: "+", label: "Lives Touched" },
  { value: 50, suffix: "+", label: "Outreach Programs" },
];

const defaultTimeline = [
  { year: "2015", title: "Founded", description: "A small group of believers gathered in faith to spread the gospel." },
  { year: "2018", title: "First Outreach", description: "Expanded impact to surrounding communities through service." },
  { year: "2020", title: "Digital Ministry", description: "Reaching the world through online platforms during a global shift." },
  { year: "2023", title: "International Expansion", description: "Spreading the gospel across nations and borders." },
];

interface ChurchHistoryProps {
  image?: string;
  title?: string;
  text?: PortableTextContent;
  stats?: Array<{ label: string; value: number; suffix?: string }>;
  timeline?: Array<{ year: string; title: string; description: string }>;
}

export default function ChurchHistory({ image, title, text, stats, timeline }: ChurchHistoryProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;
  const displayTimeline = timeline && timeline.length > 0 ? timeline : defaultTimeline;

  return (
    <section className="bg-cream pt-6 pb-14 text-cream-heading sm:pt-8 sm:pb-16">
      <Container>
        <SectionMasthead label="Our Story" index="01" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
              {title || "A Legacy of Faith & Service"}
            </h2>
            <div className="mt-8 space-y-4 text-base leading-[1.85] text-cream-body">
              {text ? (
                <PortableTextRenderer value={text} />
              ) : (
                <p>
                  Enjiri Center Ministries International was founded on a deep conviction to spread the gospel of Jesus
                  Christ and serve communities with the love of God.
                </p>
              )}
            </div>
            <blockquote className="mt-10 bg-white px-7 py-6">
              <p className="font-display text-xl leading-snug italic sm:text-2xl">
                &ldquo;For I know the plans I have for you, declares the Lord&hellip;&rdquo;
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-gold-dark uppercase">Jeremiah 29:11</p>
            </blockquote>
          </Reveal>

          {image && (
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={image}
                  alt="Enjiri Center Ministries — our story"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>

        <dl className="mt-14 grid grid-cols-3 gap-4 sm:gap-8">
          {displayStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp
                  end={s.value}
                  suffix={s.suffix}
                  className="block font-display text-3xl font-semibold text-gold-dark sm:text-6xl"
                />
                <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-cream-muted sm:text-[11px] sm:tracking-[0.2em]">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">The journey so far</p>
          <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {displayTimeline.map((item, i) => (
              <Reveal as="li" key={`${item.year}-${item.title}`} delay={i * 0.08}>
                <span className="block font-display text-3xl font-semibold text-gold sm:text-5xl">{item.year}</span>
                <span className="mt-2 block font-display text-lg font-semibold sm:mt-3 sm:text-2xl">{item.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-cream-body">{item.description}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
