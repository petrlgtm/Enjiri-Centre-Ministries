export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSanity } from "@/sanity/lib/helpers";
import { charityProgramBySlugQuery } from "@/sanity/queries";
import { heroImage as heroImageBuilder, cardImage, heroImage } from "@/sanity/image";
import { getProgramBySlug, getAllSlugs } from "@/data/charityPrograms";
import SectionDivider from "@/components/ui/SectionDivider";
import ProgramHero from "@/components/charity/ProgramHero";
import ProgramAbout from "@/components/charity/ProgramAbout";
import ProgramHighlights from "@/components/charity/ProgramHighlights";
import ProgramGallery from "@/components/charity/ProgramGallery";
import ProgramScripture from "@/components/charity/ProgramScripture";
import ProgramCTA from "@/components/charity/ProgramCTA";

interface SanityImage {
  asset: { _ref: string };
}

interface SanityCharityProgram {
  _id: string;
  title: string;
  slug: string;
  description: string;
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
  longDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  gallery?: SanityImage[];
  highlights?: { title: string; description: string }[];
  scripture?: { text: string; reference: string };
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: SanityImage;
  };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sanityProgram = await fetchSanity<SanityCharityProgram>(
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
  const sanityProgram = await fetchSanity<SanityCharityProgram>(
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
  const paragraphs = sanityProgram?.longDescription
    ? sanityProgram.longDescription.split("\n\n").filter(Boolean)
    : staticProgram?.longDescription || [];
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

  return (
    <>
      <ProgramHero title={title} heroImage={heroImg} />

      <SectionDivider accent />

      <ProgramAbout
        title={title}
        paragraphs={paragraphs}
        aboutImage={aboutImg}
        body={body}
      />

      <SectionDivider accent />

      <ProgramHighlights highlights={highlights} />

      <SectionDivider accent />

      <ProgramGallery gallery={gallery} title={title} />

      <SectionDivider accent />

      <ProgramScripture text={scripture.text} reference={scripture.reference} />

      <SectionDivider accent />

      <ProgramCTA
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        heroImage={heroImg}
      />
    </>
  );
}
