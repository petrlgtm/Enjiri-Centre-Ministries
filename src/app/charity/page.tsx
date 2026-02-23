import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";
import { charityPrograms } from "@/data/charityPrograms";

export const metadata: Metadata = {
  title: "Charity",
  description:
    "How We Give Back to Society — Enjiri Center Ministries International's community outreach, feeding programs, and the #IAMASOULWINNER campaign.",
};

export default function CharityPage() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <PageHeader
        label="How We Give Back"
        title="Our Outreach Mission"
        description="Through the love of Christ, Enjiri Center Ministries International serves communities across East Africa with outreach, feeding programs, and the hope of the gospel."
      />

      <SectionDivider accent />

      {/* SECTION 2 — Mission (Split Layout) */}
      <section className="relative overflow-hidden py-28">
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Text Content */}
            <div className="lg:w-1/2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-muted)] ring-1 ring-gold/20">
                <HiHeart className="text-gold" size={28} />
              </div>

              <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground sm:text-3xl">
                Preaching Christ, Restoring Hope
              </h2>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--gray-400)]">
                Under the leadership of Evangelist Peter Kalagi, Enjiri Center
                Ministries International is committed to giving back to society.
                From feeding the hungry to planting churches in unreached areas,
                our charity work extends the love of Christ to communities across
                East Africa.
              </p>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--gray-400)]">
                We believe that the gospel is not only preached with words but
                demonstrated through acts of love, compassion, and service to
                those in need. Reaching out to communities through meeting some
                of their needs in different locations of Uganda and beyond.
              </p>

              {/* Gold divider */}
              <div className="mt-8 flex items-center gap-2">
                <span className="h-px w-8 bg-gold/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              </div>
            </div>

            {/* RIGHT — Image Panel */}
            <div className="lg:w-1/2">
              <div className="relative h-56 overflow-hidden rounded-3xl transition-transform duration-700 hover:scale-[1.02] lg:h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&fm=webp&fit=crop"
                  alt="Community outreach and charity programs in East Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-gold/90 px-4 py-1.5 text-xs font-semibold text-navy">
                    Giving Back to Society
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider accent />

      {/* SECTION 3 — Programs Visual Grid */}
      <section className="relative overflow-hidden py-28 lg:py-32">
        <div className="absolute inset-0 bg-cream" />

        <Container className="relative">
          <SectionHeading
            label="Our Programs"
            title="How We Serve Communities"
            subtitle="Through faith-driven initiatives, we bring practical help and spiritual hope to those who need it most."
            onCream
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[220px]">
            {charityPrograms.map((program) => (
              <Link
                key={program.title}
                href={`/charity/${program.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${program.span}`}
              >
                {/* Background image */}
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-navy/60 transition-colors duration-500 group-hover:bg-navy/50" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <program.icon size={18} />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold font-[family-name:var(--font-playfair)]">
                    {program.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                    {program.description}
                  </p>
                  {/* Learn More indicator */}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    Learn More <HiArrowRight size={12} />
                  </span>
                </div>

                {/* Bottom gold line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5">
                  <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-gold transition-all duration-700 group-hover:left-0 group-hover:w-full group-hover:translate-x-0" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider accent />

      {/* SECTION 4 — #IAMASOULWINNER Campaign Spotlight */}
      <section className="relative overflow-hidden py-28">
        <Container>
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Image Panel with Stats */}
            <div className="lg:w-1/2">
              <div className="relative h-56 overflow-hidden rounded-3xl lg:h-[450px]">
                <Image
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80&fm=webp&fit=crop"
                  alt="Soul Winner Campaign — community outreach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-navy/60" />

                {/* Overlaid quick stats */}
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <div className="flex flex-wrap gap-6">
                    <div className="text-center">
                      <CountUp
                        end={1000}
                        suffix="+"
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Lives Touched
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={50}
                        suffix="+"
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Outreach Events
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={3}
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Nations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Campaign Details */}
            <div className="lg:w-1/2">
              <SectionHeading
                label="Featured Campaign"
                title="#I Am A Soul Winner"
                subtitle="The season is now to take the gospel of our Lord Jesus Christ to nations and cities of the world."
                centered={false}
              />

              <div className="card-premium rounded-2xl border border-white/[0.06] bg-[var(--gray-50)] p-6">
                <h3 className="font-bold text-foreground">
                  What This Campaign Does
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-[var(--gray-400)]">
                  {[
                    {
                      label: "Gospel Crusades",
                      detail:
                        "Organizing large-scale evangelism crusades in communities across Uganda and East Africa.",
                    },
                    {
                      label: "Hospital & School Outreach",
                      detail:
                        "Visiting the sick, orphans, the elderly, and students — sharing practical love and the gospel.",
                    },
                    {
                      label: "House Fellowships",
                      detail:
                        "Establishing house-to-house fellowships and Enjiri Center Fellowships in cities.",
                    },
                    {
                      label: "Annual Prayer March",
                      detail:
                        "Leading prayer walks on the streets of Kampala and other cities, interceding for the nation.",
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>
                        <strong className="text-foreground">
                          {item.label}:
                        </strong>{" "}
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <div className="btn-magnetic">
                  <Button
                    href="/donate"
                    variant="primary"
                    size="lg"
                    icon={<HiHeart size={18} />}
                  >
                    Support the Mission
                  </Button>
                </div>
                <div className="btn-magnetic">
                  <Button href="/contact" variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — Impact Statistics */}
      <section className="relative overflow-hidden py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative p-10 sm:p-14">
              <div className="absolute inset-0 bg-navy" />
              <div className="absolute inset-0 bg-navy" />
              <div className="noise-overlay absolute inset-0 opacity-[0.03]" />

              <div className="relative">
                <SectionHeading
                  label="Our Impact"
                  title="Lives Touched by Grace"
                  subtitle="By God's grace, our outreach continues to grow and transform communities across East Africa."
                  light
                />

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {[
                    { end: 15, suffix: "+", label: "Communities Reached" },
                    { end: 5000, suffix: "+", label: "Meals Served" },
                    { end: 2000, suffix: "+", label: "Lives Touched" },
                    { end: 30, suffix: "+", label: "Crusades Held" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        className="block font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground sm:text-5xl"
                      />
                      <span className="mt-2 block text-xs font-medium tracking-wider text-gold/80">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 6 — Scripture Quote */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative p-10 sm:p-12">
              <div className="absolute inset-0 bg-navy" />
              <div className="absolute inset-0 bg-navy" />
              <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
              <div className="relative text-center">
                <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
                  &ldquo;Now that you have purified yourselves by obeying the
                  truth so that you have sincere love for each other, love one
                  another deeply, from the heart.&rdquo;
                </p>
                <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold/30" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
                  <span className="h-px w-8 bg-gold/30" />
                </div>
                <p className="mt-4 text-sm font-semibold tracking-wider text-gold">
                  1 PETER 1:22
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 relative overflow-hidden rounded-3xl">
            <div className="relative p-10 sm:p-12">
              <div className="absolute inset-0 bg-navy" />
              <div className="absolute inset-0 bg-navy" />
              <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
              <div className="relative text-center">
                <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
                  &ldquo;And He said unto them, go ye into all the world and
                  preach the gospel to every creature.&rdquo;
                </p>
                <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold/30" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
                  <span className="h-px w-8 bg-gold/30" />
                </div>
                <p className="mt-4 text-sm font-semibold tracking-wider text-gold">
                  MARK 16:15
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 7 — Get Involved CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80&fm=webp&fit=crop"
            alt="Community gathering and worship"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-navy" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              label="Get Involved"
              title="Partner With Us"
              subtitle="Whether through giving, volunteering, or prayer, your support helps us continue to serve communities and share the love of Christ."
              light
            />

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="btn-magnetic">
                <Button
                  href="/donate"
                  variant="primary"
                  size="lg"
                  icon={<HiHeart size={18} />}
                >
                  Give Today
                </Button>
              </div>
              <div className="btn-magnetic">
                <Button href="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/50">
              <span className="h-px w-6 bg-gold/20" />
              <span>+256 779 226290</span>
              <span className="h-1 w-1 rounded-full bg-gold/30" />
              <span>@ev_k_peter</span>
              <span className="h-px w-6 bg-gold/20" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
