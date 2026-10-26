export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSanity } from "@/sanity/lib/helpers";
import { charityProgramBySlugQuery } from "@/sanity/queries";
import { heroImage as heroImageBuilder, cardImage, heroImage, urlFor } from "@/sanity/image";
import { getProgramBySlug, getAllSlugs } from "@/data/charityPrograms";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import AlbumGrid, { type AlbumPhoto } from "@/components/gallery/AlbumGrid";
import { CharityProgram } from "@/types/sanity";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sanityProgram = await fetchSanity<CharityProgram>(
    charityProgramBySlugQuery,
    { slug }
  );
  const staticProgram = getProgramBySlug(slug);
  const title =
    sanityProgram?.seo?.seoTitle ||
    sanityProgram?.title ||
    staticProgram?.title ||
    "Program Not Found";
  const description =
    sanityProgram?.seo?.seoDescription ||
    sanityProgram?.description ||
    staticProgram?.description ||
    "";
  const ogImage = sanityProgram?.seo?.seoImage
    ? heroImage(sanityProgram.seo.seoImage)
    : sanityProgram?.heroImage
      ? heroImageBuilder(sanityProgram.heroImage)
      : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1920, height: 1080 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function CharityProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanityProgram = await fetchSanity<CharityProgram>(
    charityProgramBySlugQuery,
    { slug }
  );
  const staticProgram = getProgramBySlug(slug);

  if (!sanityProgram && !staticProgram) notFound();

  // Merge Sanity data with static fallbacks
  const title = sanityProgram?.title || staticProgram?.title || "";
  const heroImg = sanityProgram?.heroImage
    ? heroImageBuilder(sanityProgram.heroImage)
    : staticProgram?.heroImage || "";
  const aboutImg = sanityProgram?.aboutImage
    ? cardImage(sanityProgram.aboutImage)
    : staticProgram?.aboutImage || "";
  const body = sanityProgram?.body;
  const paragraphs = staticProgram?.longDescription || [];
  const gallery = sanityProgram?.gallery?.length
    ? sanityProgram.gallery.map((img) => cardImage(img, 600))
    : staticProgram?.gallery || [];
  const highlights =
    sanityProgram?.highlights?.length
      ? sanityProgram.highlights
      : staticProgram?.highlights || [];
  const scripture = sanityProgram?.scripture?.text
    ? sanityProgram.scripture
    : staticProgram?.scripture || { text: "", reference: "" };
  const ctaTitle =
    sanityProgram?.ctaTitle || staticProgram?.ctaTitle || "Support This Program";
  const ctaDescription =
    sanityProgram?.ctaDescription ||
    staticProgram?.ctaDescription ||
    "Your support makes a difference.";

  const description = sanityProgram?.description || staticProgram?.description || "";
  const photos: AlbumPhoto[] = sanityProgram?.gallery?.length
    ? sanityProgram.gallery.map((img, i) => ({
        thumb: urlFor(img).width(900).auto("format").quality(80).url(),
        full: urlFor(img).width(2000).auto("format").quality(85).url(),
        width: img.asset?.metadata?.dimensions?.width ?? 1200,
        height: img.asset?.metadata?.dimensions?.height ?? 800,
        alt: img.alt || `${title} — photo ${i + 1}`,
      }))
    : gallery.map((src, i) => ({ thumb: src, full: src, width: 1200, height: 800, alt: `${title} — photo ${i + 1}` }));

  return (
    <>
      {/* Header — the programme photo straddles into the cream story below */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden className="hero-editorial-glow absolute inset-0" />
        <Container className="relative pt-40 pb-12 sm:pt-44 lg:pb-14">
          <Link
            href="/charity"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-white/60 uppercase transition-colors hover:text-gold-light"
          >
            <HiArrowLeft size={14} /> All programmes
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-light uppercase">
                <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
                Outreach programme
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">{title}</h1>
            </div>
            {description && (
              <p className="max-w-md border-l-2 border-gold/60 pl-5 text-base leading-relaxed text-white/70 lg:col-span-4 lg:pb-2">
                {description}
              </p>
            )}
          </div>
        </Container>
        {heroImg && (
          <div className="header-straddle-cream relative">
            <Container>
              <div className="relative aspect-16/9 overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,10,10,0.6)] sm:aspect-[21/9]">
                <Image src={heroImg} alt={title} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Story — the second photo drops into the highlights band */}
      <section className="relative z-10 bg-cream pt-14 pb-14 text-cream-heading sm:pt-16 sm:pb-16">
        <Container>
          <SectionMasthead label="About this programme" index="01" />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {body && body.length > 0 ? (
                <PortableTextRenderer value={body} tone="onLight" />
              ) : (
                <div className="space-y-5 text-[1.02rem] leading-[1.85] text-cream-body">
                  {paragraphs.map((p, i) => (
                    <p key={i} className={i === 0 ? "font-display text-xl leading-snug text-cream-heading sm:text-2xl" : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {aboutImg && (
              <div className="relative lg:col-span-5">
                <div className="relative aspect-4/5 overflow-hidden shadow-[0_40px_90px_-40px_rgba(11,31,69,0.6)] lg:absolute lg:inset-x-0 lg:top-0 lg:-bottom-40 lg:aspect-auto">
                  <Image src={aboutImg} alt={`${title} in action`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="bg-royal-deep pt-16 pb-16 text-white sm:pt-20 sm:pb-20 lg:pt-52">
          <Container>
            <SectionMasthead label="What we do" index="02" tone="dark" />
            <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={(i % 3) * 0.06}>
                  <span className="block font-display text-4xl font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-3 block font-display text-xl font-semibold">{h.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/65">{h.description}</span>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="bg-cream py-14 text-cream-heading sm:py-16">
          <Container>
            <SectionMasthead label="Moments that matter" index="03" />
            <div className="mt-10">
              <AlbumGrid photos={photos} />
            </div>
          </Container>
        </section>
      )}

      {/* Scripture + call to action */}
      <section className="bg-gold py-16 text-navy sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          {scripture.text && (
            <div className="lg:col-span-7">
              <p className="font-display text-3xl leading-[1.2] font-semibold sm:text-4xl">&ldquo;{scripture.text}&rdquo;</p>
              {scripture.reference && (
                <p className="mt-4 font-mono text-xs tracking-[0.18em] uppercase opacity-70">{scripture.reference}</p>
              )}
            </div>
          )}
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-semibold">{ctaTitle}</p>
            <p className="mt-3 text-base leading-relaxed text-navy/80">{ctaDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="group inline-flex items-center justify-center gap-3 bg-navy px-7 py-4 text-[12px] font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:bg-royal-deep"
              >
                Give today <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-navy/40 px-7 py-4 text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-navy hover:bg-navy/5"
              >
                Get involved
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
