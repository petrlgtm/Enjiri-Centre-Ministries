import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";

interface CallingSectionProps {
  missionText?: string;
  visionText?: string;
  stats?: Array<{ title: string; description: string }>;
}

export default function CallingSection({ missionText, visionText, stats }: CallingSectionProps) {
  if (!missionText && !visionText && !stats?.length) return null;

  return (
    <section className="bg-cream pt-28 pb-14 text-cream-heading sm:pt-24 sm:pb-16">
      <Container>
        <SectionMasthead label="Our Calling" index="01" linkLabel="About us" href="/about" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {missionText && (
            <Reveal className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">The Mission</p>
              <p className="mt-5 font-display text-xl leading-snug text-cream-heading sm:text-[1.6rem] sm:leading-[1.45]">
                {missionText}
              </p>
            </Reveal>
          )}

          {visionText && (
            <Reveal delay={0.1} className="lg:col-span-4 lg:border-l lg:border-cream-heading/15 lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">The Vision</p>
              <p className="mt-5 text-base leading-relaxed text-cream-body">{visionText}</p>
            </Reveal>
          )}
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.description} delay={i * 0.08}>
                <dt className="sr-only">{s.description}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-gold-dark sm:text-6xl">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted sm:mt-3 sm:tracking-[0.2em]">
                    {s.description}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
