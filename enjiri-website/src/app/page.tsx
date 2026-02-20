import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";

/* ── Mini data for homepage previews ── */
const pillars = [
  {
    title: "Our Vision",
    text: "Preaching Christ and Restoring Hope through the power of the Holy Spirit.",
    scripture: "Colossians 1:27",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80",
  },
  {
    title: "Our Mission",
    text: "Ministering the Gospel of Jesus Christ through repentance and remission of sins to all nations.",
    scripture: "Luke 24:47",
    image: "https://images.unsplash.com/photo-1529070538774-1f4e532a9b4f?w=600&q=80",
  },
  {
    title: "Our Commission",
    text: "Proclaiming to all the Nations that God made Jesus both Lord and Christ — the only way, the truth and the Life.",
    scripture: "Acts 2:36",
    image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=600&q=80",
  },
];

const services = [
  { title: "Sunday Worship", icon: "sun", image: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=400&q=80" },
  { title: "Youth Programs", icon: "users", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80" },
  { title: "Counseling", icon: "heart", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80" },
  { title: "Outreach", icon: "globe", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80" },
];

const stats = [
  { target: 500, suffix: "+", label: "Lives Touched" },
  { target: 12, suffix: "", label: "Nations Reached" },
  { target: 50, suffix: "+", label: "Outreach Programs" },
  { target: 1000, suffix: "+", label: "Meals Provided" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* ── About Preview ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gold/3 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Who We Are</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">About Enjiri Center</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
              <div className="img-zoom overflow-hidden rounded-3xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80"
                  alt="Congregation worship"
                  width={700}
                  height={500}
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div>
                <h3 className="mb-6 font-heading text-3xl font-bold leading-snug text-white">
                  A Ministry Born from <span className="gold-gradient-text">Divine Purpose</span>
                </h3>
                <p className="mb-5 leading-[1.8] text-white/50">
                  Enjiri Center was established with a divine mandate to spread the Gospel of Jesus Christ to every corner of the earth. Rooted in the Great Commission, our ministry has grown into a vibrant community transforming lives through the Word of God.
                </p>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 hover:gap-3"
                >
                  Read Our Full Story
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Pillars with TiltCard */}
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 150}>
                <TiltCard>
                  <div className="card-premium glass-card group overflow-hidden rounded-3xl">
                    <div className="img-zoom relative h-48 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
                      <div className="absolute bottom-4 left-6">
                        <h3 className="font-heading text-xl font-bold text-gold">{p.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="mb-3 text-sm leading-[1.8] text-white/55">{p.text}</p>
                      <p className="text-xs italic text-red-accent/70">{p.scripture}</p>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scripture Marquee Divider ── */}
      <div className="relative overflow-hidden bg-dark-surface py-5 border-y border-white/5">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 items-center gap-12 px-6">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-accent text-sm italic text-white/15">&ldquo;For God so loved the world that He gave His only begotten Son&rdquo; — John 3:16</span>
                <span className="text-gold/20">✦</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;Go into all the world and preach the gospel to all creation&rdquo; — Mark 16:15</span>
                <span className="text-gold/20">✦</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;I can do all things through Christ who strengthens me&rdquo; — Philippians 4:13</span>
                <span className="text-gold/20">✦</span>
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-12 px-6" aria-hidden>
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-accent text-sm italic text-white/15">&ldquo;For God so loved the world that He gave His only begotten Son&rdquo; — John 3:16</span>
                <span className="text-gold/20">✦</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;Go into all the world and preach the gospel to all creation&rdquo; — Mark 16:15</span>
                <span className="text-gold/20">✦</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;I can do all things through Christ who strengthens me&rdquo; — Philippians 4:13</span>
                <span className="text-gold/20">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Preview ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">What We Do</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Our Services</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 100}>
                <TiltCard>
                  <Link href="/services" className="card-premium glass-card group block overflow-hidden rounded-3xl">
                    <div className="img-zoom relative h-48 overflow-hidden">
                      <Image src={s.image} alt={s.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-heading text-lg font-bold text-white">{s.title}</h3>
                      <p className="mt-2 text-xs font-semibold text-gold transition-all group-hover:tracking-wider">Explore &rarr;</p>
                    </div>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={400}>
            <div className="mt-12 text-center">
              <Link href="/services" className="group inline-flex items-center gap-3 rounded-full border border-gold/20 bg-gold/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-gold transition-all hover:border-gold/40 hover:bg-gold/10">
                View All Services
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Latest Sermon Preview ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-maroon/15 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">The Word</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Latest Sermon</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="border-glow card-premium glass-gold overflow-hidden rounded-3xl">
              <div className="grid lg:grid-cols-2">
                <div className="img-zoom relative h-72 lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80"
                    alt="Open Bible"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-card/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent lg:hidden" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-dark/50 text-white backdrop-blur-md transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_30px_rgba(255,199,44,0.2)]">
                      <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-maroon-dark">Latest</div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="mb-3 inline-block w-fit rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold/80">Foundations of Faith</span>
                  <h3 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">The Power of the Resurrection</h3>
                  <p className="mb-1 text-sm text-gold/60">Pastor James Okello &middot; February 16, 2026</p>
                  <p className="mb-4 text-xs italic text-red-accent/70">Romans 6:4–11</p>
                  <p className="mb-8 leading-[1.8] text-white/45">
                    Discover how the resurrection of Jesus Christ is not just a historical event but a living power that transforms every believer&apos;s daily life.
                  </p>
                  <Link href="/sermons" className="group inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_25px_rgba(255,199,44,0.3)]">
                    Watch All Sermons
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Impact / Stats ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80" alt="Mountains" fill className="object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-dark-surface/95 to-dark-surface" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Our Impact</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Making a Difference</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={100}>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {stats.map((s) => (
                <TiltCard key={s.label}>
                  <div className="card-premium glass-card rounded-2xl p-7 text-center">
                    <p className="gold-gradient-text font-heading text-4xl font-bold">
                      <AnimatedCounter target={s.target} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/60">{s.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>
          <SectionReveal delay={200}>
            <div className="mt-14 text-center">
              <Link href="/donate" className="btn-ripple group relative inline-block overflow-hidden rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_40px_rgba(255,199,44,0.35)]">
                <span className="relative z-10">Support Our Mission</span>
                <div className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80" alt="Worship" fill className="object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-dark" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="mb-4 font-accent text-lg tracking-[0.3em] text-gold/60">JOIN US</p>
            <h2 className="mb-6 font-heading text-4xl font-bold text-white sm:text-5xl">
              Be Part of What God <br /><span className="gold-gradient-text">Is Doing</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-white/45">
              Whether you&apos;re looking for a church home, seeking spiritual guidance, or wanting to serve — there&apos;s a place for you at Enjiri Center.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-ripple rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                Get Connected
              </Link>
              <Link href="/events" className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-gold/40 hover:text-white">
                Upcoming Events
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
