import Image from "next/image";
import { HiPlay } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";
import PlayTrigger from "@/components/player/PlayTrigger";
import type { PlayerItem } from "@/components/player/PlayerProvider";

export interface WordItem {
  title: string;
  speaker?: string;
  date: string;
  videoId: string;
  image: string;
}

interface WordSectionProps {
  sermons: WordItem[];
}

export default function WordSection({ sermons }: WordSectionProps) {
  if (sermons.length === 0) return null;
  const [lead, ...rest] = sermons;
  const toItem = (s: WordItem): PlayerItem => ({ id: s.videoId, title: s.title, subtitle: s.speaker, date: s.date, thumbnail: s.image });
  const queue = sermons.map(toItem);

  return (
    <section className="bg-cream pt-6 pb-24 text-cream-heading sm:pt-8 sm:pb-28">
      <Container>
        <SectionMasthead label="The Word" index="02" linkLabel="All sermons" href="/sermons" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Lead message */}
          <Reveal as="article" className="lg:col-span-7">
            <PlayTrigger item={toItem(lead)} queue={queue} className="group block w-full text-left">
              <span className="relative block aspect-video overflow-hidden bg-navy">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
                <span className="absolute bottom-0 left-0 inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
                  <HiPlay size={16} /> Watch now
                </span>
              </span>
              <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Latest message · {lead.date}
              </span>
              <span className="mt-3 block font-display text-2xl leading-tight font-semibold transition-colors duration-300 group-hover:text-gold-dark sm:text-3xl">
                {lead.title}
              </span>
              {lead.speaker && <span className="mt-3 block text-sm text-cream-muted">{lead.speaker}</span>}
            </PlayTrigger>
          </Reveal>

          {/* Numbered list */}
          {rest.length > 0 && (
            <div className="lg:col-span-5">
              <p className="border-b border-cream-heading/20 pb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream-muted">
                More messages
              </p>
              <ol>
                {rest.map((s, i) => (
                  <Reveal as="li" key={s.videoId} delay={i * 0.06} className="border-b border-cream-heading/15">
                    <PlayTrigger item={toItem(s)} queue={queue} className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-5 py-5 text-left">
                      <span className="font-display text-3xl leading-none font-semibold text-gold-dark tabular-nums">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-display text-lg leading-snug transition-colors duration-300 group-hover:text-gold-dark">
                          {s.title}
                        </span>
                        <span className="mt-1.5 block font-mono text-xs text-cream-muted">{s.date}</span>
                      </span>
                      <span className="relative hidden h-16 w-24 overflow-hidden bg-navy sm:block">
                        <Image src={s.image} alt="" fill sizes="96px" className="object-cover" />
                      </span>
                    </PlayTrigger>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
