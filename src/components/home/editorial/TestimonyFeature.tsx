import Image from "next/image";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "./SectionMasthead";

interface TestimonyItem {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonyFeatureProps {
  testimonies?: TestimonyItem[];
}

function Avatar({ name, image, size }: { name: string; image?: string; size: "sm" | "lg" }) {
  const dims = size === "lg" ? "h-14 w-14 text-lg" : "h-10 w-10 text-sm";
  if (image) {
    return (
      <span className={cn("relative block shrink-0 overflow-hidden rounded-full ring-2 ring-gold/60", dims)}>
        <Image src={image} alt={name} fill sizes={size === "lg" ? "56px" : "40px"} className="object-cover" />
      </span>
    );
  }
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center justify-center rounded-full bg-gold font-display font-semibold text-royal-deep", dims)}>
      {name.charAt(0)}
    </span>
  );
}

export default function TestimonyFeature({ testimonies }: TestimonyFeatureProps) {
  if (!testimonies?.length) return null;
  const [lead, ...rest] = testimonies;

  return (
    <section className="relative overflow-x-clip bg-royal-deep pt-20 pb-24 text-white sm:pt-24 sm:pb-32">
      <div aria-hidden className="hero-editorial-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0" />

      <Container className="relative">
        <SectionMasthead label="Lives Transformed" index="05" tone="dark" />

        <Reveal as="figure" className="mx-auto mt-14 max-w-4xl text-center">
          <span aria-hidden className="block font-display text-[6rem] leading-[0.5] text-gold sm:text-[8rem]">
            &ldquo;
          </span>
          <blockquote className="mt-6 font-display text-2xl leading-snug italic sm:text-[2rem] sm:leading-[1.4]">
            {lead.quote}
          </blockquote>
          <figcaption className="mt-10 inline-flex items-center gap-4 text-left">
            <Avatar name={lead.name} image={lead.image} size="lg" />
            <span>
              <span className="block font-semibold">{lead.name}</span>
              {lead.role && <span className="mt-0.5 block text-sm text-white/70">{lead.role}</span>}
            </span>
          </figcaption>
        </Reveal>

        {rest.length > 0 && (
          <ul className="mt-20 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 3).map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 0.06} className="flex flex-col bg-royal-deep p-6 sm:p-8">
                <p className="flex-1 text-[15px] leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-6 flex items-center gap-3">
                  <Avatar name={t.name} image={t.image} size="sm" />
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    {t.role && <span className="block text-xs text-white/60">{t.role}</span>}
                  </span>
                </p>
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
