import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EditorialLink from "./EditorialLink";

interface PartnerBandProps {
  heading?: string;
  text?: string;
}

export default function PartnerBand({ heading, text }: PartnerBandProps) {
  return (
    <section className="relative overflow-x-clip bg-navy pt-20 pb-32 sm:pt-28 sm:pb-36">
      <span
        aria-hidden
        className="text-outline-gold pointer-events-none absolute top-0 right-4 -translate-y-1/2 font-display text-[5.5rem] leading-none font-bold select-none sm:right-10 sm:text-[13rem]"
      >
        Give
      </span>
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
            <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
            Partnership
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
            {heading || "Partner With Us in Ministry"}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:pb-3">
          {text && <p className="text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EditorialLink href="/donate">Give today</EditorialLink>
            <EditorialLink href="/charity" variant="outline-light">Our outreach</EditorialLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
