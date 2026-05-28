import { Suspense } from "react";
import { fetchSanity } from "@/sanity/lib/helpers";
import { siteSettingsQuery } from "@/sanity/queries";
import { heroImage as heroImageUrl } from "@/sanity/image";
import { SiteSettings } from "@/types/sanity";
import SermonsContent from "@/components/sermons/SermonsContent";

export default async function SermonsPage() {
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const headerImage = settings?.sermonsHeaderImage 
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
      <SermonsContent headerImage={headerImage} />
    </Suspense>
  );
}
