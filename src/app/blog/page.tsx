export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import { HiArrowRight } from "react-icons/hi";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allBlogPostsQuery, siteSettingsQuery, blogPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageUrl } from "@/sanity/image";
import { formatDate } from "@/lib/utils";
import { BlogPost, SiteSettings, BlogPageData } from "@/types/sanity";
import FitImage from "@/components/ui/FitImage";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<BlogPageData>(blogPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Blog";
  const description = pageData?.seo?.seoDescription || pageData?.description || "News, devotionals, and stories from Enjiri Center Ministries International.";
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

export default async function BlogPage() {
  const [posts, settings, pageData] = await Promise.all([
    fetchSanity<BlogPost[]>(allBlogPostsQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<BlogPageData>(blogPageQuery),
  ]);

  const headerImg = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.defaultHeaderImage 
      ? heroImageUrl(settings.defaultHeaderImage) 
      : undefined;

  const [lead, ...rest] = posts ?? [];

  return (
    <>
      <PageHeader
        label="Our Blog"
        title={pageData?.title || "News & Stories"}
        description={pageData?.description || "Stay updated with the latest news, devotionals, testimonies, and announcements from our ministry."}
        backgroundImage={headerImg}
      />

      <section className="bg-cream pt-14 pb-24 text-cream-heading sm:pt-16 sm:pb-28">
        <Container>
          {lead ? (
            <>
              <SectionMasthead label="Latest Story" index="01" />

              {/* Lead story */}
              <Link href={`/blog/${lead.slug}`} className="group mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                {lead.coverImage && (
                  <span className="relative block aspect-16/10 overflow-hidden bg-navy lg:col-span-7">
                    <FitImage src={cardImage(lead.coverImage, 1200)} alt={lead.title} sizes="(min-width: 1024px) 58vw, 100vw" priority className="transition-transform duration-700 group-hover:scale-[1.03]" />
                  </span>
                )}
                <span className="lg:col-span-5">
                  <span className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tracking-[0.16em] text-gold-dark uppercase">
                    {lead.categories?.[0] && <span>{lead.categories[0]}</span>}
                    {lead.publishedAt && <span className="text-cream-muted">{formatDate(lead.publishedAt)}</span>}
                  </span>
                  <span className="mt-4 block font-display text-3xl leading-[1.12] font-semibold transition-colors duration-300 group-hover:text-royal sm:text-4xl">
                    {lead.title}
                  </span>
                  {lead.excerpt && <span className="mt-5 block text-base leading-relaxed text-cream-body">{lead.excerpt}</span>}
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
                    Read the story <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>

              {rest.length > 0 && (
                <div className="mt-20">
                  <SectionMasthead label="More Stories" index="02" />
                  <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, i) => (
                      <Reveal as="li" key={post._id} delay={(i % 3) * 0.06}>
                        <Link href={`/blog/${post.slug}`} className="group block">
                          {post.coverImage && (
                            <span className="relative block aspect-16/10 overflow-hidden bg-navy">
                              <FitImage src={cardImage(post.coverImage)} alt={post.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                            </span>
                          )}
                          <span className="mt-5 flex flex-wrap gap-x-4 font-mono text-xs tracking-[0.16em] text-gold-dark uppercase">
                            {post.categories?.[0] && <span>{post.categories[0]}</span>}
                            {post.publishedAt && <span className="text-cream-muted">{formatDate(post.publishedAt)}</span>}
                          </span>
                          <span className="mt-2 block font-display text-2xl leading-snug font-semibold transition-colors duration-300 group-hover:text-royal">
                            {post.title}
                          </span>
                          {post.excerpt && (
                            <span className="mt-3 line-clamp-3 block text-sm leading-relaxed text-cream-body">{post.excerpt}</span>
                          )}
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="max-w-xl font-display text-3xl leading-snug text-cream-body">
              No stories yet — new devotionals and ministry updates will appear here soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
