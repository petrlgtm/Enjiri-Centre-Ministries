import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";

interface LeaderProp {
  name: string;
  role: string;
  bio: string;
  image: string;
  isCutout: boolean;
}

interface LeadershipTeamProps {
  leaders?: LeaderProp[] | null;
}

function paragraphs(bio: string) {
  return bio.split("\n").filter((p) => p.trim().length > 0);
}

export default function LeadershipTeam({ leaders }: LeadershipTeamProps) {
  if (!leaders?.length) return null;
  const [head, ...others] = leaders;
  const [lead, ...rest] = paragraphs(head.bio);

  return (
    <section className="relative overflow-hidden bg-navy pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div aria-hidden className="hero-editorial-glow absolute inset-0" />
      <Container className="relative">
        <SectionMasthead label="Our Shepherds" index="02" tone="dark" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[38rem] lg:sticky lg:top-32 lg:col-span-5 lg:h-[46rem] lg:max-w-none">
            <Image
              src={head.image}
              alt={head.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={head.isCutout ? "object-contain object-bottom" : "object-cover object-top"}
            />
          </Reveal>

          <div className="lg:col-span-7 lg:pt-10">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.18em] text-gold-light uppercase">{head.role}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-semibold text-white sm:text-5xl">{head.name}</h2>
              {lead && <p className="mt-6 font-display text-lg leading-snug text-white/90 sm:mt-8 sm:text-[1.7rem]">{lead}</p>}
            </Reveal>
            {rest.length > 0 && (
              <Reveal delay={0.1} className="mt-8 gap-10 text-[15px] leading-[1.85] text-white/65 md:columns-2">
                {rest.map((p, i) => (
                  <p key={i} className="mb-4 break-inside-avoid">
                    {p}
                  </p>
                ))}
              </Reveal>
            )}
          </div>
        </div>

        {others.length > 0 && (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 0.08}>
                <div className="relative aspect-4/5 overflow-hidden bg-navy-mid">
                  <Image
                    src={l.image}
                    alt={l.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={l.isCutout ? "object-contain object-bottom" : "object-cover object-top"}
                  />
                </div>
                <p className="mt-4 font-display text-2xl text-white">{l.name}</p>
                <p className="mt-1 font-mono text-xs tracking-[0.16em] text-gold-light uppercase">{l.role}</p>
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
