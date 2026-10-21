import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";

interface TestimonyFeatureProps {
  testimonies?: Array<{ quote: string; name: string; role: string }>;
}

export default function TestimonyFeature({ testimonies }: TestimonyFeatureProps) {
  if (!testimonies?.length) return null;
  const [lead, ...rest] = testimonies;

  return (
    <section className="bg-cream pt-6 pb-24 text-cream-heading sm:pt-8 sm:pb-32">
      <Container>
        <SectionMasthead label="Lives Transformed" index="05" />

        <div className="mt-10 grid gap-14 lg:grid-cols-12">
          <Reveal as="article" className="lg:col-span-7">
            <span aria-hidden className="block font-display text-[7rem] leading-[0.6] text-gold">
              &ldquo;
            </span>
            <blockquote className="mt-4 font-display text-2xl leading-snug italic sm:text-[1.6rem] sm:leading-[1.45]">
              {lead.quote}
            </blockquote>
            <p className="mt-8 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-gold-dark" />
              <span>
                <span className="block text-sm font-semibold">{lead.name}</span>
                {lead.role && <span className="block text-xs text-cream-muted">{lead.role}</span>}
              </span>
            </p>
          </Reveal>

          {rest.length > 0 && (
            <ul className="lg:col-span-5">
              {rest.slice(0, 3).map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 0.06} className="border-t border-cream-heading/15 py-6">
                  <p className="text-[15px] leading-relaxed text-cream-body">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-heading">
                    {t.name}
                    {t.role && <span className="font-normal text-cream-muted"> · {t.role}</span>}
                  </p>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
