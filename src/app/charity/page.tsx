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
} from "react-icons/hi";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import EditorialLink from "@/components/home/editorial/EditorialLink";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allCharityProgramsQuery, siteSettingsQuery, charityPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageBuilder } from "@/sanity/image";
import { charityPrograms as staticPrograms } from "@/data/charityPrograms";
import { CharityProgram, SiteSettings, CharityPageData } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<CharityPageData>(charityPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Charity";
  const description = pageData?.seo?.seoDescription || pageData?.description || "How We Give Back to Society — Enjiri Center Ministries International's community outreach, feeding programs, and the I Am A Soul Winner campaign.";
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
        : "https://cdn.sanity.io/images/shcw5txc/production/0eb438e79a3d8db672b409d7761b4477df23d549-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop";

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

  const [featured, ...otherPrograms] = gridPrograms;
  const campaignImage = pageData?.campaignImage ? cardImage(pageData.campaignImage, 900) : missionImage;

  const impact = [
    { end: 15, suffix: "+", label: "Communities Reached" },
    { end: 5000, suffix: "+", label: "Meals Served" },
    { end: 2000, suffix: "+", label: "Lives Touched" },
    { end: 30, suffix: "+", label: "Crusades Held" },
  ];

  const campaign = [
    { label: "Gospel Crusades", detail: "Organizing large-scale evangelism crusades in communities across Uganda and East Africa." },
    { label: "Hospital & School Outreach", detail: "Visiting the sick, orphans, the elderly, and students — sharing practical love and the gospel." },
    { label: "House Fellowships", detail: "Establishing house-to-house fellowships and Enjiri Center Fellowships in cities." },
    { label: "Annual Prayer March", detail: "Leading prayer walks on the streets of Kampala and other cities, interceding for the nation." },
  ];

  return (
    <>
      <PageHeader
        label="How We Give Back"
        title={pageData?.title || "Our Outreach Mission"}
        description={pageData?.description || "Through the love of Christ, Enjiri Center Ministries International serves communities across East Africa with outreach, feeding programs, and the hope of the gospel."}
        backgroundImage={missionImage || undefined}
      />

      {/* Mission */}
      <section className="bg-cream pt-14 pb-36 text-cream-heading sm:pt-16 sm:pb-44">
        <Container>
          <SectionMasthead label="Giving Back" index="01" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <h2 className="font-display text-3xl leading-[1.1] font-semibold sm:text-4xl">
                Preaching Christ, <em className="not-italic text-gold-dark">restoring hope</em>
              </h2>
              <div className="mt-8 space-y-4 text-base leading-[1.85] text-cream-body">
                <p>
                  Under the leadership of Evangelist Peter Kalagi, Enjiri Center Ministries International is committed to
                  giving back to society. From feeding the hungry to planting churches in unreached areas, our charity work
                  extends the love of Christ to communities across East Africa.
                </p>
                <p>
                  We believe that the gospel is not only preached with words but demonstrated through acts of love,
                  compassion, and service to those in need.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pt-4">
              <blockquote className="bg-white px-6 py-6 sm:px-8 sm:py-8">
                <p className="font-display text-xl leading-snug italic sm:text-[1.7rem]">
                  &ldquo;Now that you have purified yourselves by obeying the truth so that you have sincere love for each
                  other, love one another deeply, from the heart.&rdquo;
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-gold-dark uppercase">1 Peter 1:22</p>
              </blockquote>
            </Reveal>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {impact.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    className="block font-display text-4xl font-semibold text-gold-dark sm:text-6xl"
                  />
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-muted">
                    {stat.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Programs — the featured programme rises into the cream above */}
      {featured && (
        <section className="flow-root bg-navy-light pb-16 sm:pb-20">
          <Container className="relative z-10 -mt-24 sm:-mt-32">
            <Link
              href={`/charity/${featured.slug}`}
              className="group grid bg-navy shadow-[0_30px_80px_-30px_rgba(10,10,10,0.6)] lg:grid-cols-12"
            >
              <span className="relative block aspect-16/10 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-gold-light uppercase">Programme 01 · Featured</span>
                <span className="mt-4 block font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
                  {featured.title}
                </span>
                <span className="mt-4 block text-[15px] leading-relaxed text-white/65">{featured.description}</span>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Read more <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </Container>

          <Container className="pt-16">
            <SectionMasthead label="How We Serve" index="02" tone="dark" />
            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
              {otherPrograms.map((program, i) => (
                <Reveal as="li" key={`${program.slug}-${i}`} delay={(i % 3) * 0.06}>
                  <Link href={`/charity/${program.slug}`} className="group grid grid-cols-[7.5rem_1fr] gap-4 sm:block">
                    <span className="relative block aspect-square overflow-hidden sm:aspect-4/3">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span className="block sm:mt-5">
                      <span className="flex items-baseline gap-3 sm:gap-4">
                        <span className="font-display text-xl font-semibold text-gold sm:text-3xl">{String(i + 2).padStart(2, "0")}</span>
                        <span className="font-display text-lg leading-tight text-white transition-colors duration-300 group-hover:text-gold-light sm:text-2xl">
                          {program.title}
                        </span>
                      </span>
                      <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-white/60 sm:mt-3 sm:line-clamp-none">
                        {program.description}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Campaign — gold band; the photo rises into the programmes and drops into the partner band */}
      <section className="relative z-10 flow-root bg-gold py-16 text-navy sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-navy" />
              Featured Campaign
              <span className="font-mono tracking-normal opacity-50">/ 03</span>
            </p>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl leading-[1.02] font-bold sm:mt-8 sm:text-6xl lg:text-7xl">I Am A Soul Winner</h2>
              <p className="mt-4 font-mono text-xs tracking-[0.25em] uppercase opacity-70">#IAmASoulWinner</p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy/80">
                The season is now to take the gospel of our Lord Jesus Christ to nations and cities of the world.
              </p>
            </Reveal>

            <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {campaign.map((item, i) => (
                <Reveal as="li" key={item.label} delay={i * 0.06}>
                  <span className="block font-display text-3xl font-bold text-navy/35 sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-3 block font-display text-xl font-semibold">{item.label}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-navy/75">{item.detail}</span>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="group inline-flex items-center justify-center gap-3 bg-navy px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-navy-surface"
              >
                Support the mission
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 border border-navy/40 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-navy hover:bg-navy/5"
              >
                Join a crusade team
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden shadow-[0_40px_90px_-30px_rgba(10,10,10,0.55)] lg:absolute lg:inset-x-0 lg:-top-36 lg:-bottom-36 lg:aspect-auto">
              <Image
                src={campaignImage}
                alt="I Am A Soul Winner campaign — crusade outreach"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <dl className="absolute right-0 bottom-0 left-0 grid grid-cols-3 gap-3 bg-navy/90 px-4 py-4 text-white backdrop-blur-sm sm:px-6 sm:py-5">
                {[
                  { end: 1000, suffix: "+", label: "Lives touched" },
                  { end: 50, suffix: "+", label: "Outreach events" },
                  { end: 3, suffix: "", label: "Nations" },
                ].map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <CountUp end={s.end} suffix={s.suffix} className="block font-display text-2xl font-bold text-gold sm:text-3xl" />
                      <span className="mt-1 block font-mono text-[9px] leading-tight tracking-[0.1em] text-white/60 uppercase sm:text-[10px] sm:tracking-[0.14em]">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Partner */}
      <section className="bg-navy py-16 sm:py-20 lg:pt-44">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
              Get Involved
            </p>
            <p className="mt-6 font-display text-2xl leading-[1.25] text-white sm:text-4xl">
              &ldquo;Go ye into all the world and preach the gospel to every creature.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">Mark 16:15</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-white/70">
              Whether through giving, volunteering, or prayer, your support helps us continue to serve communities and
              share the love of Christ.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EditorialLink href="/donate">Give today</EditorialLink>
              <EditorialLink href="/contact" variant="outline-light">
                Contact us
              </EditorialLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
