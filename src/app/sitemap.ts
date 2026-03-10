import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://enjiriministries.org";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/sermons`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/charity`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic pages from Sanity
  const [blogSlugs, charitySlugs, gallerySlugs] = await Promise.all([
    client.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    client.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "charityProgram" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    client.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "gallery" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
  ]);

  const blogPages: MetadataRoute.Sitemap = (blogSlugs || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const charityPages: MetadataRoute.Sitemap = (charitySlugs || []).map((program) => ({
    url: `${baseUrl}/charity/${program.slug}`,
    lastModified: new Date(program._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const galleryPages: MetadataRoute.Sitemap = (gallerySlugs || []).map((gallery) => ({
    url: `${baseUrl}/gallery/${gallery.slug}`,
    lastModified: new Date(gallery._updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...charityPages, ...galleryPages];
}
