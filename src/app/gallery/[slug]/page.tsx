export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { fetchSanity } from "@/sanity/lib/helpers";
import { galleryBySlugQuery } from "@/sanity/queries";
import { heroImage, urlFor } from "@/sanity/image";
import AlbumGrid, { type AlbumPhoto } from "@/components/gallery/AlbumGrid";
import { formatDate } from "@/lib/utils";
import { Gallery } from "@/types/sanity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await fetchSanity<Gallery>(galleryBySlugQuery, { slug });

  if (!gallery) return { title: "Gallery Not Found" };

  const title = gallery.seo?.seoTitle || gallery.title;
  const description =
    gallery.seo?.seoDescription ||
    gallery.description ||
    `View photos from "${gallery.title}".`;
  const ogImage = gallery.seo?.seoImage
    ? heroImage(gallery.seo.seoImage)
    : gallery.coverImage
      ? heroImage(gallery.coverImage)
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

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await fetchSanity<Gallery>(galleryBySlugQuery, { slug });

  if (!gallery) notFound();

  const photos: AlbumPhoto[] = (gallery.images ?? [])
    .filter((img) => img.image?.asset)
    .map((img) => {
      const dims = img.image.asset?.metadata?.dimensions;
      return {
        thumb: urlFor(img.image).width(900).auto("format").quality(80).url(),
        full: urlFor(img.image).width(2000).auto("format").quality(85).url(),
        width: dims?.width ?? 1200,
        height: dims?.height ?? 800,
        alt: img.alt || gallery.title,
        caption: img.caption,
      };
    });

  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden className="hero-editorial-glow absolute inset-0" />
        <Container className="relative pt-40 pb-14 sm:pt-44">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase transition-colors hover:text-gold-light"
          >
            <HiArrowLeft size={14} /> All albums
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex flex-wrap gap-x-4 font-mono text-[11px] tracking-[0.18em] text-gold-light uppercase">
                {gallery.category && <span>{gallery.category}</span>}
                {gallery.date && <span className="text-white/55">{formatDate(gallery.date)}</span>}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">{gallery.title}</h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="font-display text-6xl leading-none font-semibold text-gold">{photos.length}</p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase">Photos in this album</p>
            </div>
          </div>
          {gallery.description && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">{gallery.description}</p>}
        </Container>
      </section>

      <section className="bg-cream pt-12 pb-24 sm:pt-14 sm:pb-28">
        <Container>
          {photos.length > 0 ? (
            <AlbumGrid photos={photos} />
          ) : (
            <p className="font-display text-2xl text-cream-body">No photos in this album yet.</p>
          )}
        </Container>
      </section>
    </>
  );
}
