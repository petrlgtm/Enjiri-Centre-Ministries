export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allBlogPostsQuery, siteSettingsQuery } from "@/sanity/queries";
import { cardImage } from "@/sanity/image";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, devotionals, and stories from Enjiri Center Ministries International.",
  openGraph: {
    title: "Blog — Enjiri Center Ministries International",
    description:
      "News, devotionals, and stories from our ministry.",
  },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  author?: { _id: string; name: string };
  coverImage?: { asset: { _id: string; url: string } };
  categories?: string[];
  featured?: boolean;
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    fetchSanity<BlogPost[]>(allBlogPostsQuery),
    fetchSanity<{ heroImage?: { asset: { _ref: string } } }>(siteSettingsQuery),
  ]);

  const heroImg = settings?.heroImage ? cardImage(settings.heroImage, 1200) : undefined;

  return (
    <>
      <PageHeader
        label="Our Blog"
        title="News & Stories"
        description="Stay updated with the latest news, devotionals, testimonies, and announcements from our ministry."
        backgroundImage={heroImg}
      />

      <section className="py-16 sm:py-20 md:py-28">
        <Container>
          {posts && posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--gray-50)] transition-all duration-500 hover:border-gold/20"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={cardImage(post.coverImage)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-2 flex gap-2">
                        {post.categories.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-[var(--gray-400)] line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-xs text-[var(--gray-400)]">
                      {post.author && <span>{post.author.name}</span>}
                      {post.author && post.publishedAt && (
                        <span className="h-1 w-1 rounded-full bg-gold/30" />
                      )}
                      {post.publishedAt && (
                        <span>{formatDate(post.publishedAt)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-[var(--gray-400)]">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
