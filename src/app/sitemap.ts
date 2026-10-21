import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

interface SlugDoc {
  slug: string;
  _updatedAt: string;
}

const sitemapQuery = groq`{
  "pages": *[_type in ["homePage","aboutPage","servicesPage","sermonsPage","blogPage","charityPage","galleryPage","donatePage","contactPage"]]{ _type, _updatedAt },
  "blog": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "charity": *[_type == "charityProgram" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "gallery": *[_type == "gallery" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "events": *[_type == "event" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client
    .fetch<{
      pages: Array<{ _type: string; _updatedAt: string }>;
      blog: SlugDoc[];
      charity: SlugDoc[];
      gallery: SlugDoc[];
      events: SlugDoc[];
    }>(sitemapQuery)
    .catch(() => null);

  // Last edit of each page's Studio document, so crawlers see real change dates
  const edited = (type: string) => {
    const doc = data?.pages.find((p) => p._type === type);
    return doc ? new Date(doc._updatedAt) : undefined;
  };

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: edited("homePage"), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: edited("aboutPage"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: edited("servicesPage"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/sermons`, lastModified: edited("sermonsPage"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/charity`, lastModified: edited("charityPage"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: edited("blogPage"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gallery`, lastModified: edited("galleryPage"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/donate`, lastModified: edited("donatePage"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: edited("contactPage"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const toEntries = (docs: SlugDoc[] | undefined, base: string, priority: number): MetadataRoute.Sitemap =>
    (docs ?? []).map((d) => ({
      url: `${SITE_URL}/${base}/${d.slug}`,
      lastModified: new Date(d._updatedAt),
      changeFrequency: "monthly",
      priority,
    }));

  return [
    ...staticPages,
    ...toEntries(data?.charity, "charity", 0.6),
    ...toEntries(data?.events, "services", 0.6),
    ...toEntries(data?.blog, "blog", 0.6),
    ...toEntries(data?.gallery, "gallery", 0.5),
  ];
}
