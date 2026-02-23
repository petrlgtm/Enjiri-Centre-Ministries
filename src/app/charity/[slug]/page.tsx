import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgramBySlug, getAllSlugs } from "@/data/charityPrograms";
import SectionDivider from "@/components/ui/SectionDivider";
import ProgramHero from "@/components/charity/ProgramHero";
import ProgramAbout from "@/components/charity/ProgramAbout";
import ProgramHighlights from "@/components/charity/ProgramHighlights";
import ProgramGallery from "@/components/charity/ProgramGallery";
import ProgramScripture from "@/components/charity/ProgramScripture";
import ProgramCTA from "@/components/charity/ProgramCTA";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };

  return {
    title: program.title,
    description: program.description,
  };
}

export default async function CharityProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) notFound();

  return (
    <>
      <ProgramHero title={program.title} heroImage={program.heroImage} />

      <SectionDivider accent />

      <ProgramAbout
        title={program.title}
        paragraphs={program.longDescription}
        aboutImage={program.aboutImage}
      />

      <SectionDivider accent />

      <ProgramHighlights highlights={program.highlights} />

      <SectionDivider accent />

      <ProgramGallery gallery={program.gallery} title={program.title} />

      <SectionDivider accent />

      <ProgramScripture
        text={program.scripture.text}
        reference={program.scripture.reference}
      />

      <SectionDivider accent />

      <ProgramCTA
        ctaTitle={program.ctaTitle}
        ctaDescription={program.ctaDescription}
        heroImage={program.heroImage}
      />
    </>
  );
}
