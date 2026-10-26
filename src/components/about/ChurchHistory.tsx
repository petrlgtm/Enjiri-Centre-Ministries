import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import MilestoneTimeline from "./MilestoneTimeline";
import { PortableTextContent } from "@/types/sanity";
import FitImage from "@/components/ui/FitImage";

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
  const [lead, ...others] = displayStats;

  return (
    <>
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
                <PortableTextRenderer value={text} tone="onLight" />
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
              <p className="mt-3 font-mono text-xs tracking-[0.18em] text-gold-dark uppercase">Jeremiah 29:11</p>
            </blockquote>
          </Reveal>

          {image && (
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative overflow-hidden">
                <FitImage src={image} alt="Enjiri Center Ministries — our story" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </Reveal>
          )}
        </div>

      </Container>
    </section>

    {/* Milestones — bento figures and a chapter timeline on a deep-blue band */}
    <section className="relative overflow-hidden bg-ink-deep py-16 text-white sm:py-24">
      <div aria-hidden className="hero-editorial-glow absolute inset-0 opacity-70" />
      <Container className="relative">
        <SectionMasthead label="Milestones" index="02" tone="dark" />

        {lead && (
          <dl className="mt-10 grid gap-3 sm:gap-4 lg:grid-cols-12">
            {/* Lead figure */}
            <Reveal className="flex flex-col-reverse justify-between gap-8 bg-gold p-7 text-navy sm:p-10 lg:col-span-6 lg:row-span-2 lg:min-h-[26rem]">
              <div>
                <dt className="font-mono text-xs tracking-[0.2em] uppercase opacity-70">{lead.label}</dt>
                <p className="mt-2 max-w-xs font-display text-xl leading-snug font-semibold sm:text-2xl">A decade of faithfulness, one soul at a time.</p>
              </div>
              <dd>
                <CountUp
                  end={lead.value}
                  suffix={lead.suffix}
                  className="block font-display text-[6.5rem] leading-[0.85] font-bold tracking-tight sm:text-[10rem]"
                />
              </dd>
            </Reveal>

            {others.map((s, i) => (
              <Reveal
                key={s.label}
                delay={0.08 * (i + 1)}
                className="flex flex-col-reverse justify-between bg-white/[0.06] p-7 ring-1 ring-white/10 sm:p-8 lg:col-span-6"
              >
                <dt className="mt-4 font-mono text-xs tracking-[0.2em] text-white/60 uppercase">{s.label}</dt>
                <dd>
                  <CountUp
                    end={s.value}
                    suffix={s.suffix}
                    className="block font-display text-6xl leading-none font-bold text-gold sm:text-7xl"
                  />
                </dd>
              </Reveal>
            ))}
          </dl>
        )}

        <div className="mt-20 sm:mt-28">
          <div className="mb-14 max-w-xl lg:mx-auto lg:text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-gold-light uppercase">The journey so far</p>
            <h3 className="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">Every chapter, written by grace.</h3>
          </div>
          <MilestoneTimeline chapters={displayTimeline} />
        </div>
      </Container>
    </section>
    </>
  );
}
