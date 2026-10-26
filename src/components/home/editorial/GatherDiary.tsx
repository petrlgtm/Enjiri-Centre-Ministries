import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";
import EditorialLink from "./EditorialLink";

interface DiaryEvent {
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
}

interface GatherDiaryProps {
  events: DiaryEvent[];
  schedule?: Array<{ day: string; time: string; serviceName: string }>;
  address?: string;
  photo?: { src: string; alt: string } | null;
}

export default function GatherDiary({ events, schedule, address, photo }: GatherDiaryProps) {
  const next = schedule?.[0];

  return (
    <section className="relative flow-root overflow-x-clip bg-royal-deep pb-14 sm:pb-16">
      {/* Next-gathering card — rises into the section above */}
      {next && (
        <Container className="relative z-10 -mt-14 flex justify-end">
          <Link
            href="/services"
            className="group grid w-full max-w-xl grid-cols-[auto_1fr_auto] items-center gap-4 bg-gold px-5 py-5 sm:gap-6 sm:px-7 sm:py-6 text-navy shadow-[0_24px_60px_-24px_rgba(10,10,10,0.5)] transition-colors duration-300 hover:bg-gold-light"
          >
            <span className="font-display text-4xl leading-none font-semibold uppercase sm:text-5xl">{next.day.slice(0, 3)}</span>
            <span>
              <span className="block font-mono text-xs tracking-[0.2em] uppercase opacity-70">Next gathering</span>
              <span className="mt-1 block font-display text-lg leading-tight font-semibold sm:text-2xl">{next.serviceName}</span>
              <span className="mt-1 block font-mono text-xs">{next.time}</span>
            </span>
            <HiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Container>
      )}
      <Container className="relative pt-10">
        <SectionMasthead label="Gather With Us" index="03" linkLabel="All events" href="/services" tone="dark" />

        <div className="mt-10 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-4xl leading-[1.08] font-semibold text-white sm:text-5xl">
              Plan your <em className="not-italic text-gold">visit</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              We&apos;d love to welcome you. Come as you are. Here&apos;s when the church family meets each week.
            </p>
            {address && (
              <p className="mt-8 font-mono text-xs tracking-[0.18em] text-gold-light uppercase">{address}</p>
            )}
            <div className="mt-10">
              <EditorialLink href="/contact">Plan your visit</EditorialLink>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            {events.length > 0 && (
              <>
                <p className="border-b border-white/15 pb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  Coming up
                </p>
                <ul className="mb-12">
                  {events.map((e, i) => (
                    <Reveal as="li" key={e.title} delay={i * 0.06} className="grid grid-cols-[5.5rem_1fr] gap-6 border-b border-white/10 py-6">
                      <span className="leading-none">
                        <span className="block font-display text-6xl font-semibold text-gold tabular-nums">{e.day}</span>
                        <span className="mt-1 block font-mono text-xs tracking-[0.2em] text-white/50 uppercase">{e.month}</span>
                      </span>
                      <span>
                        <span className="block font-display text-2xl text-white">{e.title}</span>
                        <span className="mt-2 block font-mono text-xs text-white/50">
                          {e.time} · {e.location}
                        </span>
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </>
            )}

            {schedule && schedule.length > 0 && (
              <>
                <p className="border-b border-white/15 pb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  Every week
                </p>
                <ul>
                  {schedule.map((s, i) => (
                    <Reveal as="li" key={s.serviceName} delay={i * 0.06} className="group grid grid-cols-[5rem_1fr] items-center gap-x-4 gap-y-1 border-b border-white/10 py-5 sm:grid-cols-[9.5rem_1fr_auto] sm:gap-x-6 sm:py-6">
                      <span className="text-outline-gold font-display text-4xl leading-none font-semibold uppercase sm:text-6xl">
                        {s.day.slice(0, 3)}
                      </span>
                      <span className="font-display text-lg text-white sm:text-2xl">{s.serviceName}</span>
                      <span className="col-start-2 font-mono text-xs text-white/55 sm:col-start-auto sm:text-right">{s.time}</span>
                    </Reveal>
                  ))}
                </ul>
              </>
            )}

            {photo && (
              <div className="relative z-10 mt-12 ml-auto hidden h-96 w-72 overflow-hidden lg:-mb-60 lg:block">
                <Image src={photo.src} alt={photo.alt} fill sizes="288px" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
