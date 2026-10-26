export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import { HiArrowRight } from "react-icons/hi";
import { cn, formatDate } from "@/lib/utils";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allGalleriesQuery, siteSettingsQuery, galleryPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageUrl } from "@/sanity/image";
import { Gallery, SiteSettings, GalleryPageData } from "@/types/sanity";
import FitImage from "@/components/ui/FitImage";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<GalleryPageData>(galleryPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Gallery";
  const description = pageData?.seo?.seoDescription || pageData?.description || "Photos and memories from Enjiri Center Ministries International worship services, events, and outreach.";
  const image = pageData?.seo?.seoImage ? heroImageUrl(pageData.seo.seoImage) : "";

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

export default async function GalleryPage() {
  const [galleries, settings, pageData] = await Promise.all([
    fetchSanity<Gallery[]>(allGalleriesQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<GalleryPageData>(galleryPageQuery),
  ]);

  const headerImg = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.defaultHeaderImage 
      ? heroImageUrl(settings.defaultHeaderImage) 
      : undefined;

  return (
    <>
      <PageHeader
        label="Our Gallery"
        title={pageData?.title || "Photos & Memories"}
        description={pageData?.description || "Browse photos from our worship services, events, outreach programs, and community gatherings."}
        backgroundImage={headerImg}
      />

      <section className="bg-cream pt-14 pb-24 text-cream-heading sm:pt-16 sm:pb-28">
        <Container>
          <SectionMasthead label="Albums" index={String(galleries?.length ?? 0).padStart(2, "0")} />

          {galleries && galleries.length > 0 ? (
            <ol className="mt-10 space-y-16 sm:space-y-20">
              {galleries.map((gallery, i) => {
                const flip = i % 2 === 1;
                return (
                  <Reveal as="li" key={gallery._id}>
                    <Link href={`/gallery/${gallery.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                      {gallery.coverImage && (
                        <span className={cn("relative block aspect-4/3 overflow-hidden bg-navy lg:col-span-7", flip && "lg:order-2")}>
                          <FitImage src={cardImage(gallery.coverImage, 1200)} alt={gallery.coverImage.alt || gallery.title} sizes="(min-width: 1024px) 58vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                          <span className="absolute bottom-0 left-0 bg-royal px-5 py-3 font-mono text-xs tracking-[0.18em] text-white uppercase">
                            {gallery.imageCount ?? 0} photos
                          </span>
                        </span>
                      )}
                      <span className="lg:col-span-5">
                        <span className="flex flex-wrap gap-x-4 font-mono text-xs tracking-[0.18em] text-gold-dark uppercase">
                          <span>Album {String(i + 1).padStart(2, "0")}</span>
                          {gallery.category && <span className="text-cream-muted">{gallery.category}</span>}
                          {gallery.date && <span className="text-cream-muted">{formatDate(gallery.date)}</span>}
                        </span>
                        <span className="mt-4 block font-display text-3xl leading-[1.1] font-semibold transition-colors duration-300 group-hover:text-royal sm:text-4xl">
                          {gallery.title}
                        </span>
                        {gallery.description && (
                          <span className="mt-4 block text-base leading-relaxed text-cream-body">{gallery.description}</span>
                        )}
                        {gallery.previews && gallery.previews.length > 0 && (
                          <span className="mt-8 grid grid-cols-3 gap-2">
                            {gallery.previews.map((p, j) => (
                              <span key={j} className="relative block aspect-square overflow-hidden bg-navy">
                                <FitImage src={cardImage(p.image, 300)} alt={p.alt || ""} sizes="140px" />
                              </span>
                            ))}
                          </span>
                        )}
                        <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
                          Open album <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          ) : (
            <p className="mt-10 max-w-xl font-display text-3xl leading-snug text-cream-body">
              No albums yet — photos from services and outreach will appear here soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
