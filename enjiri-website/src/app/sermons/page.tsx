import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";
import { getSermons, type Sermon } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons — Enjiri Center",
  description: "Watch and listen to powerful sermons from Enjiri Center. Grow in faith through Bible-based teaching.",
};

const series = [
  {
    name: "Foundations of Faith",
    count: 8,
    description: "A deep dive into the core doctrines of the Christian faith — from salvation and sanctification to the power of the Holy Spirit and the hope of eternal life.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80",
  },
  {
    name: "Hope Restored",
    count: 6,
    description: "A series exploring God's promises of restoration, healing, and renewal. No matter what you've been through, God is able to restore what the enemy has stolen.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",
  },
  {
    name: "Walking in the Spirit",
    count: 5,
    description: "Understanding the person and work of the Holy Spirit. Learn how to be led, empowered, and transformed by the Spirit in every area of your daily life.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80",
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function SermonsPage() {
  const sermons = await getSermons(12);

  const featured: Sermon | null = sermons.length > 0 ? sermons[0] : null;
  const remaining = sermons.length > 1 ? sermons.slice(1) : [];

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
                  <a href={featured.url} target="_blank" rel="noopener noreferrer" className="img-zoom relative h-80 lg:h-auto lg:min-h-[500px] block">
                    <Image src={featured.thumbnail} alt={featured.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-card/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent lg:hidden" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-dark/50 text-white backdrop-blur-md transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_40px_rgba(255,199,44,0.2)]">
                        <svg className="ml-1.5 h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-maroon-dark">Latest Sermon</div>
                  </a>
                  <div className="flex flex-col justify-center p-8 lg:p-14">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-white/30">{featured.duration}</span>
                    </div>
                    <h3 className="mb-3 font-heading text-3xl font-bold text-white">{featured.title}</h3>
                    <p className="mb-2 text-sm text-gold/60">{formatDate(featured.date)}</p>
                    <p className="mb-8 leading-[1.9] text-white/45 line-clamp-4">{featured.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <a href={featured.url} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_25px_rgba(255,199,44,0.3)]">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        <span className="relative z-10">Watch Now</span>
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

      {/* ── Sermon Series ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Browse by Series</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Sermon Series</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {series.map((s, i) => (
              <SectionReveal key={s.name} delay={i * 120}>
                <TiltCard><div className="card-premium glass-card group h-full overflow-hidden rounded-3xl">
                  <div className="img-zoom relative h-52 overflow-hidden">
                    <Image src={s.image} alt={s.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <h3 className="font-heading text-lg font-bold text-white">{s.name}</h3>
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold text-gold">{s.count} Messages</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-[1.8] text-white/45">{s.description}</p>
                  </div>
                </div></TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Sermons ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Archive</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">All Sermons</h2>
            </div>
          </SectionReveal>

          {remaining.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remaining.map((sermon, i) => (
                <SectionReveal key={sermon.id} delay={i * 80}>
                  <TiltCard><div className="card-premium glass-card group flex h-full flex-col overflow-hidden rounded-3xl">
                    <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="img-zoom relative h-48 overflow-hidden block">
                      <Image src={sermon.thumbnail} alt={sermon.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-dark/60 text-white backdrop-blur-md"><svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
                      </div>
                      <div className="absolute right-3 top-3 rounded-full bg-dark/70 px-3 py-1 text-[10px] font-bold text-white/70 backdrop-blur-md">{sermon.duration}</div>
                    </a>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-heading text-lg font-bold text-white">{sermon.title}</h3>
                      <p className="mb-1 text-xs text-gold/60">{formatDate(sermon.date)}</p>
                      <p className="mb-5 text-xs text-white/45 line-clamp-2">{sermon.description}</p>
                      <div className="mt-auto flex items-center gap-4">
                        <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          Watch
                        </a>
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
      <section className="relative overflow-hidden bg-dark-surface py-20">
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
