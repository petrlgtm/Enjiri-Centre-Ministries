export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allGalleriesQuery, siteSettingsQuery } from "@/sanity/queries";
import { cardImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and memories from Enjiri Center Ministries International worship services, events, and outreach.",
  openGraph: {
    title: "Gallery — Enjiri Center Ministries International",
    description:
      "Photos and memories from our worship services, events, and outreach.",
  },
};

interface GalleryData {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: { asset: { _id: string; url: string } };
  imageCount: number;
  category?: string;
  date?: string;
}

export default async function GalleryPage() {
  const [galleries, settings] = await Promise.all([
    fetchSanity<GalleryData[]>(allGalleriesQuery),
    fetchSanity<{ heroImage?: { asset: { _ref: string } } }>(siteSettingsQuery),
  ]);

  const heroImg = settings?.heroImage ? cardImage(settings.heroImage, 1200) : undefined;

  return (
    <>
      <PageHeader
        label="Our Gallery"
        title="Photos & Memories"
        description="Browse photos from our worship services, events, outreach programs, and community gatherings."
        backgroundImage={heroImg}
      />

      <section className="py-16 sm:py-20 md:py-28">
        <Container>
          {galleries && galleries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleries.map((gallery) => (
                <Link
                  key={gallery._id}
                  href={`/gallery/${gallery.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--gray-50)] transition-all duration-500 hover:border-gold/20"
                >
                  {gallery.coverImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={cardImage(gallery.coverImage)}
                        alt={gallery.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute bottom-3 right-3 rounded-full bg-navy/70 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                        {gallery.imageCount} photos
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    {gallery.category && (
                      <span className="mb-2 inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                        {gallery.category}
                      </span>
                    )}
                    <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                      {gallery.title}
                    </h2>
                    {gallery.description && (
                      <p className="mt-2 text-sm leading-relaxed text-[var(--gray-400)] line-clamp-2">
                        {gallery.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-[var(--gray-400)]">
                No galleries yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
