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

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  author?: {
    _id: string;
    name: string;
    role?: string;
    image?: { asset: { _id: string; url: string } };
  };
  coverImage?: { asset: { _id: string; url: string } };
  categories?: string[];
  tags?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
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
  const post = await fetchSanity<BlogPostData>(blogPostBySlugQuery, { slug });

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
  const post = await fetchSanity<BlogPostData>(blogPostBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        {post.coverImage && (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImage(post.coverImage)}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-navy/80" />
          </>
        )}
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4 flex justify-center gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-foreground/60">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <div className="relative h-7 w-7 overflow-hidden rounded-full">
                      <Image
                        src={cardImage(post.author.image, 56)}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gold/30" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.body && post.body.length > 0 ? (
              <PortableTextRenderer value={post.body} />
            ) : post.excerpt ? (
              <p className="text-lg leading-relaxed text-[var(--gray-400)]">
                {post.excerpt}
              </p>
            ) : (
              <p className="text-[var(--gray-400)]">
                This article has no content yet.
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-white/[0.06] pt-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-[var(--gray-50)] px-3 py-1 text-xs text-[var(--gray-400)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-light"
              >
                <HiArrowLeft size={14} />
                Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
