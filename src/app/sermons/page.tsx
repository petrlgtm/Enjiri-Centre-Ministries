import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchSanity } from "@/sanity/lib/helpers";
import { siteSettingsQuery, sermonsPageQuery } from "@/sanity/queries";
import { heroImage as heroImageUrl } from "@/sanity/image";
import { SiteSettings, SermonsPageData } from "@/types/sanity";
import SermonsContent from "@/components/sermons/SermonsContent";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<SermonsPageData>(sermonsPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Sermons & Teachings";
  const description = pageData?.seo?.seoDescription || pageData?.description || "Watch or listen to our sermons and be encouraged by the teaching of God's Word.";
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

export default async function SermonsPage() {
  const [settings, pageData] = await Promise.all([
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<SermonsPageData>(sermonsPageQuery),
  ]);

  const headerImage = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.sermonsHeaderImage 
      ? heroImageUrl(settings.sermonsHeaderImage) 
      : settings?.defaultHeaderImage
        ? heroImageUrl(settings.defaultHeaderImage)
        : "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&fm=webp&fit=crop";

  return (
    <Suspense
      fallback={
        <div className="py-40 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      }
    >
      <SermonsContent 
        headerImage={headerImage} 
        title={pageData?.title}
        description={pageData?.description}
        featuredLabel={pageData?.featuredLabel}
      />
    </Suspense>
  );
}
