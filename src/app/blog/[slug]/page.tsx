export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import Container from "@/components/ui/Container";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import { fetchSanity } from "@/sanity/lib/helpers";
import { blogPostBySlugQuery } from "@/sanity/queries";
import { heroImage, cardImage } from "@/sanity/image";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/sanity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });

  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.seoTitle || post.title;
  const description =
    post.seo?.seoDescription ||
    post.excerpt ||
    `Read "${post.title}" on the Enjiri Center blog.`;
  const ogImage = post.seo?.seoImage
    ? heroImage(post.seo.seoImage)
    : post.coverImage
      ? heroImage(post.coverImage)
      : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden className="hero-editorial-glow absolute inset-0" />
        <Container className="relative pt-40 pb-12 sm:pt-44 lg:pb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase transition-colors hover:text-gold-light"
          >
            <HiArrowLeft size={14} /> All stories
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-gold-light uppercase">
              {post.categories?.map((cat) => <span key={cat}>{cat}</span>)}
              {post.publishedAt && (
                <time dateTime={post.publishedAt} className="text-white/55">
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{post.excerpt}</p>}
          </div>
        </Container>
        {post.coverImage && (
          <div className="header-straddle-cream relative">
            <Container>
              <div className="relative aspect-16/9 overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,10,10,0.6)] sm:aspect-[21/9]">
                <Image src={heroImage(post.coverImage)} alt={post.title} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Article */}
      <section className="bg-cream pt-14 pb-24 sm:pt-16 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="min-w-0 lg:col-span-8">
            {post.body && post.body.length > 0 ? (
              <PortableTextRenderer value={post.body} tone="onLight" />
            ) : (
              <p className="font-display text-2xl text-cream-body">This article has no content yet.</p>
            )}
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-8 bg-white p-7 lg:sticky lg:top-32">
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.image && (
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden bg-navy">
                      <Image src={cardImage(post.author.image, 112)} alt={post.author.name} fill sizes="56px" className="object-cover object-top" />
                    </span>
                  )}
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-gold-dark uppercase">Written by</span>
                    <span className="mt-1 block font-display text-lg font-semibold text-cream-heading">{post.author.name}</span>
                  </span>
                </div>
              )}
              {post.publishedAt && (
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold-dark uppercase">Published</p>
                  <p className="mt-1 text-sm text-cream-heading">{formatDate(post.publishedAt)}</p>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold-dark uppercase">Topics</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li key={tag} className="bg-cream px-3 py-1.5 font-mono text-[11px] text-cream-body">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href="/blog"
                className="flex items-center justify-between bg-royal px-5 py-4 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-royal-light"
              >
                More stories <HiArrowLeft className="rotate-180" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
