export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { fetchSanity } from "@/sanity/lib/helpers";
import { galleryBySlugQuery } from "@/sanity/queries";
import { cardImage, heroImage } from "@/sanity/image";

interface GalleryImage {
  image?: { asset: { _id: string; url: string } };
  alt?: string;
  caption?: string;
}

interface GalleryData {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: { asset: { _id: string; url: string } };
  images?: GalleryImage[];
  category?: string;
  date?: string;
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: { asset: { _id: string; url: string } };
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await fetchSanity<GalleryData>(galleryBySlugQuery, { slug });

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
  const gallery = await fetchSanity<GalleryData>(galleryBySlugQuery, { slug });

  if (!gallery) notFound();

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8 sm:pt-40 sm:pb-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {gallery.category && (
              <span className="mb-3 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                {gallery.category}
              </span>
            )}
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl">
              {gallery.title}
            </h1>
            {gallery.description && (
              <p className="mt-4 text-[var(--gray-400)]">
                {gallery.description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Image Grid */}
      <section className="pb-16 sm:pb-24">
        <Container>
          {gallery.images && gallery.images.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {gallery.images.map((img, index) => (
                <div
                  key={index}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
                >
                  {img.image && (
                    <Image
                      src={cardImage(img.image, 800)}
                      alt={img.alt || gallery.title}
                      width={800}
                      height={600}
                      className="w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {img.caption && (
                    <p className="mt-2 text-sm text-[var(--gray-400)]">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[var(--gray-400)]">No images in this gallery yet.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
