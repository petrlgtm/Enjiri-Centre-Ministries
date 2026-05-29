export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HiHeart,
  HiArrowRight,
  HiGlobe,
  HiSparkles,
  HiUserGroup,
  HiAcademicCap,
  HiStar,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allCharityProgramsQuery, siteSettingsQuery, charityPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageBuilder } from "@/sanity/image";
import { charityPrograms as staticPrograms } from "@/data/charityPrograms";
import { CharityProgram, SiteSettings, CharityPageData } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<CharityPageData>(charityPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Charity";
  const description = pageData?.seo?.seoDescription || pageData?.description || "How We Give Back to Society — Enjiri Center Ministries International's community outreach, feeding programs, and the #IAMASOULWINNER campaign.";
  const image = pageData?.seo?.seoImage ? heroImageBuilder(pageData.seo.seoImage) : "";

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${settings?.churchName || "Enjiri Center"}`,
      description,
      images: image ? [{ url: image }] : [],
    },
  };
}

const iconMap: Record<string, IconType> = {
  globe: HiGlobe,
  sparkles: HiSparkles,
  heart: HiHeart,
  userGroup: HiUserGroup,
  academicCap: HiAcademicCap,
  star: HiStar,
};

function getIcon(name?: string): IconType {
  return (name && iconMap[name]) || HiStar;
}

export default async function CharityPage() {
  const [programs, settings, pageData] = await Promise.all([
    fetchSanity<CharityProgram[]>(allCharityProgramsQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<CharityPageData>(charityPageQuery),
  ]);

  const missionImage = pageData?.headerImage
    ? heroImageBuilder(pageData.headerImage)
    : settings?.charityHeaderImage 
      ? heroImageBuilder(settings.charityHeaderImage) 
      : settings?.defaultHeaderImage
        ? heroImageBuilder(settings.defaultHeaderImage)
        : "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&fm=webp&fit=crop";

  // Merge Sanity data with static fallback images
  const programsData = (programs && programs.length > 0 ? programs : []).map(
    (p) => {
      const staticMatch = staticPrograms.find((sp) => sp.slug === p.slug);
      return {
        title: p.title,
        slug: p.slug,
        description: p.description || "",
        icon: p.icon,
        gridSpan: p.gridSpan || staticMatch?.span || "",
        image: p.image
          ? cardImage(p.image)
          : staticMatch?.image || "",
      };
    }
  );

  // Use static data if Sanity returned nothing
  const gridPrograms =
    programsData.length > 0
      ? programsData
      : staticPrograms.map((sp) => ({
          title: sp.title,
          slug: sp.slug,
          description: sp.description,
          icon:
            sp.icon === HiGlobe
              ? "globe"
              : sp.icon === HiSparkles
                ? "sparkles"
                : sp.icon === HiHeart
                  ? "heart"
                  : sp.icon === HiUserGroup
                    ? "userGroup"
                    : sp.icon === HiAcademicCap
                      ? "academicCap"
                      : "star",
          gridSpan: sp.span,
          image: sp.image,
        }));

  return (
    <>
      {/* SECTION 1 — Hero */}
      <PageHeader
        label="How We Give Back"
        title={pageData?.title || "Our Outreach Mission"}
        description={pageData?.description || "Through the love of Christ, Enjiri Center Ministries International serves communities across East Africa with outreach, feeding programs, and the hope of the gospel."}
        backgroundImage={missionImage || undefined}
      />

      <SectionDivider accent />

      {/* SECTION 2 — Mission (Split Layout) */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-8 sm:gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Text Content */}
            <div className="lg:w-1/2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--gold-muted) ring-1 ring-gold/20">
                <HiHeart className="text-gold" size={28} />
              </div>

              <h2 className="mt-6 font-(family-name:--font-playfair) text-2xl font-bold text-foreground sm:text-3xl">
                Preaching Christ, Restoring Hope
              </h2>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-(--gray-400)">
                Under the leadership of Evangelist Peter Kalagi, Enjiri Center
                Ministries International is committed to giving back to society.
                From feeding the hungry to planting churches in unreached areas,
                our charity work extends the love of Christ to communities across
                East Africa.
              </p>

              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-(--gray-400)">
                We believe that the gospel is not only preached with words but
                demonstrated through acts of love, compassion, and service to
                those in need. Reaching out to communities through meeting some
                of their needs in different locations of Uganda and beyond.
              </p>

              {/* Gold divider */}
              <div className="mt-8 flex items-center gap-2">
                <span className="h-px w-8 bg-gold/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="h-px w-16 bg-linear-to-r from-gold to-transparent" />
              </div>
            </div>

            {/* RIGHT — Image Panel */}
            <div className="lg:w-1/2">
              <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden rounded-2xl sm:rounded-3xl transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src={missionImage}
                  alt="Community outreach and charity programs in East Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/30 to-transparent" />
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
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32 lg:py-40">
        {/* Artistic Background Elements */}
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-navy/5 blur-3xl" />
        <div className="dot-grid-animated absolute inset-0 opacity-40" />

        <Container className="relative">
          <div className="mb-16 md:mb-24">
            <SectionHeading
              label="Our Impactful Programs"
              title="How We Serve Communities"
              subtitle="Through faith-driven initiatives, we bring practical help and spiritual hope to those who need it most."
              onCream
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:auto-rows-[300px] md:auto-rows-[340px]">
            {gridPrograms.map((program, index) => {
              const Icon = getIcon(program.icon);
              return (
                <Link
                  key={`${program.slug}-${index}`}
                  href={`/charity/${program.slug}`}
                  className={`group relative flex overflow-hidden rounded-[2.5rem] bg-navy transition-all duration-700 hover:-translate-y-4 ${program.gridSpan}`}
                >
                  {/* The 'Space' Frame — Inner padding for a nested look */}
                  <div className="absolute inset-2 overflow-hidden rounded-[2rem] border border-white/5">
                    {/* Background image with artistic treatment */}
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    {/* Artistic Light Leak Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-navy via-navy/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
                    <div className="absolute -top-1/2 -left-1/2 h-full w-full bg-gold/10 blur-3xl transition-transform duration-1000 group-hover:translate-x-1/2 group-hover:translate-y-1/2" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative flex h-full w-full flex-col p-8 sm:p-10 lg:p-12">
                    {/* Decorative Badge */}
                    <div className="mb-auto">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 animate-spin-slow rounded-full bg-linear-to-r from-gold/0 via-gold/40 to-gold/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gold backdrop-blur-xl ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                          <Icon size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Textual Core */}
                    <div className="mt-8 transform-gpu transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center gap-3">
                        <span className="h-px w-6 bg-gold/50" />
                        <span className="text-[10px] font-bold tracking-[0.3em] text-gold/80 uppercase">
                          Ministry
                        </span>
                      </div>
                      <h3 className="mt-3 font-(family-name:--font-playfair) text-2xl font-bold text-foreground leading-tight sm:text-3xl">
                        {program.title}
                      </h3>
                      
                      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-foreground/60 transition-colors duration-500 group-hover:text-foreground/90">
                        {program.description}
                      </p>
                    </div>

                    {/* Artistic Footer */}
                    <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                        Discover More
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold transition-colors duration-300 hover:bg-gold hover:text-navy">
                        <HiArrowRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Outer Ambient Glow */}
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gold/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-30" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionDivider accent />

      {/* SECTION 4 — #IAMASOULWINNER Campaign Spotlight */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <Container>
          <div className="flex flex-col-reverse gap-8 sm:gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* LEFT — Image Panel with Stats */}
            <div className="lg:w-1/2">
              <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden rounded-2xl sm:rounded-3xl">
                <Image
                  src={missionImage}
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
                        className="block font-(family-name:--font-playfair) text-3xl font-bold text-foreground"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Lives Touched
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={50}
                        suffix="+"
                        className="block font-(family-name:--font-playfair) text-3xl font-bold text-foreground"
                      />
                      <span className="mt-1 block text-xs font-medium tracking-wider text-gold/80">
                        Outreach Events
                      </span>
                    </div>
                    <div className="text-center">
                      <CountUp
                        end={3}
                        className="block font-(family-name:--font-playfair) text-3xl font-bold text-foreground"
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

              <div className="card-premium rounded-2xl border border-white/6 bg-(--gray-50) p-6">
                <h3 className="font-bold text-foreground">
                  What This Campaign Does
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-(--gray-400)">
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
            <div className="relative p-6 sm:p-10 md:p-14">
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

                <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-4">
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
                        className="block font-(family-name:--font-playfair) text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
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
                <p className="font-(family-name:--font-playfair) text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
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
                <p className="font-(family-name:--font-playfair) text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
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
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src={missionImage}
            alt="Community gathering and worship"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-navy" />
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

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
