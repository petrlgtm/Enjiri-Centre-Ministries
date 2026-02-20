import type { Metadata } from "next";
import Image from "next/image";
import { HiHeart, HiGlobe, HiUserGroup, HiBookOpen } from "react-icons/hi";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the work of Enjiri Center Ministries International through your generous giving.",
};

const impactAreas = [
  {
    icon: HiGlobe,
    title: "Missions & Outreach",
    description: "Spreading the gospel to unreached communities and nations.",
  },
  {
    icon: HiUserGroup,
    title: "Community Service",
    description:
      "Feeding the hungry, clothing the needy, and supporting families.",
  },
  {
    icon: HiBookOpen,
    title: "Ministry Programs",
    description:
      "Youth, women's, and men's programs that build strong foundations.",
  },
  {
    icon: HiHeart,
    title: "Church Development",
    description:
      "Building and maintaining facilities for worship and fellowship.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        label="Support Our Mission"
        title="Give Generously"
        description="Your generosity fuels our mission to reach more people with the love of Christ and serve our communities."
      />

      {/* SECTION 1 — Donation CTA (Split Layout) */}
      <section className="relative overflow-hidden py-28">
        <div className="dot-grid-animated absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[350px] w-[350px] rounded-full opacity-[0.03]"><div className="morph-blob h-full w-full bg-gradient-to-tr from-gold to-transparent" /></div>
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Text Content */}
            <div className="lg:w-1/2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-muted)] ring-1 ring-gold/20">
                <HiHeart className="text-gold" size={28} />
              </div>

              <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-white sm:text-3xl">
                Online Donations Coming Soon
              </h2>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--gray-400)]">
                We are setting up secure online donation options for your
                convenience. In the meantime, you can give during our services or
                contact us for giving options.
              </p>

              <div className="card-premium mt-8 max-w-md rounded-2xl border border-white/[0.06] bg-[var(--gray-50)] p-6">
                <h3 className="font-bold text-white">How to Give</h3>
                <ul className="mt-4 space-y-3 text-sm text-[var(--gray-400)]">
                  {[
                    {
                      label: "In Person",
                      detail:
                        "During Sunday services and midweek gatherings",
                    },
                    {
                      label: "Contact Us",
                      detail: "Reach out for bank transfer details",
                    },
                    {
                      label: "Email",
                      detail: "info@enjiriministries.org",
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>
                        <strong className="text-white">{item.label}:</strong>{" "}
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

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
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=70"
                  alt="Hands reaching out in community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-gold/90 px-4 py-1.5 text-xs font-semibold text-navy">
                    Every Gift Matters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — Scripture Quote */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative p-10 sm:p-12">
              <div className="absolute inset-0 bg-navy" />
              <div className="absolute inset-0 mesh-gradient" />
              <div className="noise-subtle absolute inset-0 opacity-[0.03]" />
              <div className="relative text-center">
                <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-white/80 sm:text-2xl">
                  &ldquo;Each of you should give what you have decided in your
                  heart to give, not reluctantly or under compulsion, for God
                  loves a cheerful giver.&rdquo;
                </p>
                <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold/30" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
                  <span className="h-px w-8 bg-gold/30" />
                </div>
                <p className="mt-4 text-sm font-semibold tracking-wider text-gold">
                  2 CORINTHIANS 9:7
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — Impact Areas (Split, Reversed) */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-[var(--gray-50)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />
        <Container className="relative">
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Image Panel with Stats */}
            <div className="lg:w-1/2">
              <div className="relative h-56 overflow-hidden rounded-3xl lg:h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=70"
                  alt="Community outreach and service"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-navy/60" />
                {/* Overlaid Stats */}
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <div className="flex flex-wrap gap-6">
                    <div className="text-center">
                      <CountUp
                        end={4}
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-white"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Programs
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={100}
                        suffix="+"
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-white"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Families
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={3}
                        className="block font-[family-name:var(--font-playfair)] text-3xl font-bold text-white"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Nations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Heading + Impact Cards */}
            <div className="lg:w-1/2">
              <SectionHeading
                label="Where Your Gift Goes"
                title="Your Giving Makes an Impact"
                subtitle="Every contribution supports the advancement of God's kingdom."
                centered={false}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {impactAreas.map((area) => (
                  <div
                    key={area.title}
                    className="card-hover card-premium group rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-6"
                  >
                    <div className="icon-breathe flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold-muted)] text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-black">
                      <area.icon size={22} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white">
                      {area.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--gray-400)]">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
