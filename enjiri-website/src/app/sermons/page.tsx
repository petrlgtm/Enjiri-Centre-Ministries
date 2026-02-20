import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";
import VideoPlayer from "@/components/VideoPlayer";
import { getSermons, formatViews, type Sermon } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons — Enjiri Center",
  description: "Watch and listen to powerful sermons from Enjiri Center. Grow in faith through Bible-based teaching.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export default async function SermonsPage() {
  const sermons = await getSermons();

  const featured: Sermon | null = sermons.length > 0 ? sermons[0] : null;
  const remaining = sermons.length > 1 ? sermons.slice(1) : [];
  const totalCount = sermons.length;

  return (
    <main>
      <PageHero
        title="Sermons"
        subtitle="The Word of God"
        description="Be encouraged, challenged, and transformed by powerful messages rooted in Scripture. Watch, listen, and grow in your faith through our weekly teachings."
        image="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
      />

      {/* ── Featured Sermon ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-maroon/15 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Latest Message</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Featured Sermon</h2>
            </div>
          </SectionReveal>

          {featured ? (
            <SectionReveal delay={100}>
              <div className="card-premium glass-gold overflow-hidden rounded-3xl">
                <div className="grid lg:grid-cols-2">
                  <div className="relative lg:min-h-[500px]">
                    <VideoPlayer videoId={featured.id} title={featured.title} thumbnail={featured.thumbnail} />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-14">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">Latest</span>
                      <span className="text-xs text-white/30">{featured.duration}</span>
                      <span className="text-xs text-white/30">&middot;</span>
                      <span className="text-xs text-white/30">{formatViews(featured.viewCount)}</span>
                    </div>
                    <h3 className="mb-3 font-heading text-3xl font-bold text-white">{featured.title}</h3>
                    <p className="mb-2 text-sm text-gold/60">{featured.channelTitle} &middot; {formatDate(featured.date)}</p>
                    <p className="mb-8 leading-[1.9] text-white/45 line-clamp-4">{featured.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <a href={featured.url} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_25px_rgba(255,199,44,0.3)]">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" /><path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" /></svg>
                        <span className="relative z-10">Watch on YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <SectionReveal delay={100}>
              <p className="text-center text-white/45">No sermons available right now. Check back soon or visit our <a href="https://www.youtube.com/@EnjiriCenter" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline">YouTube channel</a>.</p>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* ── All Sermons ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Full Archive</p>
                <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">All Sermons</h2>
              </div>
              {totalCount > 0 && (
                <p className="text-sm text-white/40">{totalCount} messages from {featured?.channelTitle ?? "Enjiri Center"}</p>
              )}
            </div>
          </SectionReveal>

          {remaining.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remaining.map((sermon, i) => (
                <SectionReveal key={sermon.id} delay={Math.min(i, 8) * 80}>
                  <TiltCard><div className="card-premium glass-card group flex h-full flex-col overflow-hidden rounded-3xl">
                    {/* Video/Audio Player Thumbnail */}
                    <div className="relative">
                      <VideoPlayer videoId={sermon.id} title={sermon.title} thumbnail={sermon.thumbnail} />
                      <div className="absolute right-3 top-3 z-20 rounded-full bg-dark/80 px-3 py-1 text-[10px] font-bold text-white/80 backdrop-blur-md">{sermon.duration}</div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-white line-clamp-2">{sermon.title}</h3>
                      <p className="mb-1 text-xs font-medium text-gold/60">{sermon.channelTitle}</p>
                      <div className="mb-3 flex items-center gap-2 text-[11px] text-white/30">
                        <span>{formatViews(sermon.viewCount)}</span>
                        <span>&middot;</span>
                        <span>{timeAgo(sermon.date)}</span>
                      </div>
                      <p className="mb-5 text-xs leading-relaxed text-white/40 line-clamp-2">{sermon.description}</p>

                      {/* Actions */}
                      <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-4">
                        <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-light">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" /><path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" /></svg>
                          YouTube
                        </a>
                        <span className="h-4 w-[1px] bg-white/10" />
                        <span className="text-[11px] text-white/25">{formatDate(sermon.date)}</span>
                      </div>
                    </div>
                  </div></TiltCard>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/45">No additional sermons found. Visit our <a href="https://www.youtube.com/@EnjiriCenter" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline">YouTube channel</a> for more.</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <h2 className="mb-4 font-heading text-3xl font-bold text-white">Never Miss a Sermon</h2>
            <p className="mb-8 text-white/45">Subscribe to our newsletter or follow us on YouTube to stay updated with every new message.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">Subscribe</Link>
              <a href="https://www.youtube.com/@EnjiriCenter" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-gold/40 hover:text-white">YouTube Channel</a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
